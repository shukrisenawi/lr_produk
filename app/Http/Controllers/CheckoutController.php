<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCheckoutRequest;
use App\Models\Order;
use App\Models\ProductVariant;
use App\Models\User;
use App\Support\OrderPricingCalculator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('checkout', [
            'variants' => ProductVariant::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->get(),
            'pricing' => [
                'single_bottle_price' => OrderPricingCalculator::SINGLE_BOTTLE_PRICE,
                'five_bottle_price' => OrderPricingCalculator::FIVE_BOTTLE_PRICE,
                'ten_bottle_price' => OrderPricingCalculator::TEN_BOTTLE_PRICE,
                'shipping_fee' => OrderPricingCalculator::SHIPPING_FEE,
            ],
        ]);
    }

    public function store(StoreCheckoutRequest $request, OrderPricingCalculator $calculator): RedirectResponse
    {
        $validated = $request->validated();
        $items = collect($validated['items'])->filter(fn (array $item) => $item['quantity'] > 0)->values();
        $quantity = $items->sum('quantity');
        $pricing = $calculator->calculate($quantity);

        $order = DB::transaction(function () use ($request, $validated, $items, $pricing) {
            $user = $request->user() ?? $this->resolveCustomer($validated);

            if (! $request->user()) {
                Auth::login($user);
            }

            $order = $user->orders()->create([
                'status' => Order::STATUS_AWAITING_PAYMENT,
                'subtotal' => $pricing['subtotal'],
                'shipping_fee' => $pricing['shipping_fee'],
                'grand_total' => $pricing['grand_total'],
                'customer_name' => $validated['name'],
                'customer_phone' => $validated['phone'],
                'shipping_address' => $validated['shipping_address'],
                'notes' => $validated['notes'] ?? null,
                'placed_at' => now(),
            ]);

            foreach ($items as $item) {
                $order->items()->create([
                    'product_variant_id' => $item['variant_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => OrderPricingCalculator::SINGLE_BOTTLE_PRICE,
                ]);
            }

            return $order;
        });

        return redirect()->route('orders.payment.show', $order);
    }

    /**
     * @param  array{name:string,phone:string,password?:string}  $validated
     */
    private function resolveCustomer(array $validated): User
    {
        $existingUser = User::query()->where('phone', $validated['phone'])->first();

        if (! $existingUser) {
            return User::query()->create([
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'role' => 'customer',
                'password' => $validated['password'],
            ]);
        }

        if (! Hash::check((string) $validated['password'], $existingUser->password)) {
            throw ValidationException::withMessages([
                'phone' => 'Nombor WhatsApp sudah berdaftar. Gunakan kata laluan yang betul.',
            ]);
        }

        $existingUser->update([
            'name' => $validated['name'],
        ]);

        return $existingUser;
    }
}
