<?php

use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CustomerOrderController;
use App\Http\Controllers\PaymentReceiptController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', [CustomerOrderController::class, 'home'])->name('home');
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

Route::middleware('auth')->group(function (): void {
    Route::get('/dashboard', [CustomerOrderController::class, 'dashboard'])->name('dashboard');
    Route::get('/pesanan/{order}', [CustomerOrderController::class, 'show'])->name('orders.show');
    Route::get('/pesanan/{order}/bayaran', [CustomerOrderController::class, 'payment'])->name('orders.payment.show');
    Route::post('/pesanan/{order}/resit', [PaymentReceiptController::class, 'store'])->name('orders.receipts.store');
    Route::get('/pesanan/{order}/invoice', [CustomerOrderController::class, 'invoice'])->name('orders.invoice.show');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function (): void {
    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::patch('/orders/{order}/approve', [AdminOrderController::class, 'approve'])->name('orders.approve');
    Route::patch('/orders/{order}/reject', [AdminOrderController::class, 'reject'])->name('orders.reject');
});

Route::middleware('auth')->group(function (): void {
    if (Features::enabled(Features::registration())) {
        Route::redirect('/daftar', '/register');
    }
});

require __DIR__.'/settings.php';
