<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\PaymentReceipt;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PaymentReceipt>
 */
class PaymentReceiptFactory extends Factory
{
    protected $model = PaymentReceipt::class;

    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'file_path' => 'receipts/sample.jpg',
            'original_name' => 'sample.jpg',
            'submitted_at' => now(),
            'reviewed_at' => null,
            'review_note' => null,
            'reviewed_by' => null,
        ];
    }
}
