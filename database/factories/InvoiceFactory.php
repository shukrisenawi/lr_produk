<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Invoice>
 */
class InvoiceFactory extends Factory
{
    protected $model = Invoice::class;

    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'invoice_number' => 'AT-'.now()->format('Ym').'-0001',
            'issued_at' => now(),
        ];
    }
}
