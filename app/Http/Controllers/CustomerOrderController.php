<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\ProductVariant;
use App\Support\OrderPricingCalculator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerOrderController extends Controller
{
    public function dashboard(Request $request): Response|RedirectResponse
    {
        if ($request->user()->isAdmin()) {
            return redirect()->route('admin.orders.index');
        }

        return Inertia::render('customer/dashboard', [
            'orders' => $request->user()->orders()
                ->with(['items.productVariant', 'invoice', 'latestReceipt'])
                ->latest()
                ->get(),
        ]);
    }

    public function show(Request $request, Order $order): Response
    {
        $this->ensureOwnership($request, $order);

        $order->load(['items.productVariant', 'invoice', 'latestReceipt']);

        return Inertia::render('customer/order-detail', [
            'order' => $order,
        ]);
    }

    public function payment(Request $request, Order $order): Response
    {
        $this->ensureOwnership($request, $order);

        $order->load(['items.productVariant', 'latestReceipt']);

        return Inertia::render('customer/payment', [
            'order' => $order,
            'bankDetails' => [
                'bank_name' => 'MAYBANK',
                'account_number' => '155015073618',
                'account_holder' => 'MOHAMAD SHUKRI BIN SENAWI',
                'whatsapp' => '019-5168839',
            ],
            'pricing' => [
                'single_bottle_price' => OrderPricingCalculator::SINGLE_BOTTLE_PRICE,
                'five_bottle_price' => OrderPricingCalculator::FIVE_BOTTLE_PRICE,
                'ten_bottle_price' => OrderPricingCalculator::TEN_BOTTLE_PRICE,
                'shipping_fee' => OrderPricingCalculator::SHIPPING_FEE,
            ],
        ]);
    }

    public function invoice(Request $request, Order $order): Response
    {
        $this->ensureOwnership($request, $order);

        $order->load(['items.productVariant', 'invoice']);

        return Inertia::render('customer/invoice', [
            'order' => $order,
        ]);
    }

    public function home(): Response
    {
        return Inertia::render('welcome', [
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

    private function ensureOwnership(Request $request, Order $order): void
    {
        abort_unless($request->user()->id === $order->user_id || $request->user()->isAdmin(), 403);
    }
}
