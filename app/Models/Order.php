<?php

namespace App\Models;

use Database\Factories\OrderFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable([
    'user_id',
    'status',
    'subtotal',
    'shipping_fee',
    'grand_total',
    'customer_name',
    'customer_phone',
    'shipping_address',
    'notes',
    'placed_at',
    'paid_at',
])]
class Order extends Model
{
    public const STATUS_AWAITING_PAYMENT = 'awaiting_payment';

    public const STATUS_PAYMENT_SUBMITTED = 'payment_submitted';

    public const STATUS_PAID = 'paid';

    public const STATUS_PAYMENT_REJECTED = 'payment_rejected';

    public const STATUS_CANCELLED = 'cancelled';

    /** @use HasFactory<OrderFactory> */
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function receipts(): HasMany
    {
        return $this->hasMany(PaymentReceipt::class);
    }

    public function latestReceipt(): HasOne
    {
        return $this->hasOne(PaymentReceipt::class)->latestOfMany();
    }

    public function invoice(): HasOne
    {
        return $this->hasOne(Invoice::class);
    }

    protected function casts(): array
    {
        return [
            'placed_at' => 'datetime',
            'paid_at' => 'datetime',
        ];
    }
}
