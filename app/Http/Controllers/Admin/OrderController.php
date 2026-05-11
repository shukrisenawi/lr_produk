<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewPaymentReceiptRequest;
use App\Models\Invoice;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/orders/index', [
            'orders' => Order::query()
                ->with(['items.productVariant', 'user', 'latestReceipt', 'invoice'])
                ->latest()
                ->get(),
            'stats' => [
                'awaiting_payment' => Order::query()->where('status', Order::STATUS_AWAITING_PAYMENT)->count(),
                'payment_submitted' => Order::query()->where('status', Order::STATUS_PAYMENT_SUBMITTED)->count(),
                'paid' => Order::query()->where('status', Order::STATUS_PAID)->count(),
                'payment_rejected' => Order::query()->where('status', Order::STATUS_PAYMENT_REJECTED)->count(),
            ],
        ]);
    }

    public function approve(ReviewPaymentReceiptRequest $request, Order $order): RedirectResponse
    {
        DB::transaction(function () use ($request, $order): void {
            $receipt = $order->latestReceipt;

            if ($receipt) {
                $receipt->update([
                    'review_note' => $request->validated('review_note'),
                    'reviewed_at' => now(),
                    'reviewed_by' => $request->user()->id,
                ]);
            }

            $order->update([
                'status' => Order::STATUS_PAID,
                'paid_at' => now(),
            ]);

            $order->invoice()->firstOrCreate(
                [],
                [
                    'invoice_number' => $this->nextInvoiceNumber(),
                    'issued_at' => now(),
                ],
            );
        });

        return redirect()->route('admin.orders.index');
    }

    public function reject(ReviewPaymentReceiptRequest $request, Order $order): RedirectResponse
    {
        $receipt = $order->latestReceipt;

        if ($receipt) {
            $receipt->update([
                'review_note' => $request->validated('review_note'),
                'reviewed_at' => now(),
                'reviewed_by' => $request->user()->id,
            ]);
        }

        $order->update([
            'status' => Order::STATUS_PAYMENT_REJECTED,
        ]);

        return redirect()->route('admin.orders.index');
    }

    private function nextInvoiceNumber(): string
    {
        $prefix = 'AT-'.now()->format('Ym').'-';
        $count = Invoice::query()
            ->where('invoice_number', 'like', $prefix.'%')
            ->count() + 1;

        return $prefix.str_pad((string) $count, 4, '0', STR_PAD_LEFT);
    }
}
