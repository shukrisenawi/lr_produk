<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentReceiptRequest;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class PaymentReceiptController extends Controller
{
    public function store(StorePaymentReceiptRequest $request, Order $order): RedirectResponse
    {
        abort_unless($request->user()?->id === $order->user_id, 403);

        DB::transaction(function () use ($request, $order): void {
            $receipt = $request->file('receipt');
            $storedPath = $receipt->store('receipts', 'public');

            $order->receipts()->create([
                'file_path' => $storedPath,
                'original_name' => $receipt->getClientOriginalName(),
                'submitted_at' => now(),
            ]);

            $order->update([
                'status' => Order::STATUS_PAYMENT_SUBMITTED,
            ]);
        });

        return redirect()->route('orders.payment.show', $order);
    }
}
