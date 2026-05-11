<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'status' => Order::STATUS_AWAITING_PAYMENT,
            'subtotal' => 10_00,
            'shipping_fee' => 8_00,
            'grand_total' => 18_00,
            'customer_name' => fake()->name(),
            'customer_phone' => '01'.fake()->numerify('#########'),
            'shipping_address' => fake()->address(),
            'notes' => null,
            'placed_at' => now(),
            'paid_at' => null,
        ];
    }

    public function awaitingPayment(): static
    {
        return $this->state(fn () => [
            'status' => Order::STATUS_AWAITING_PAYMENT,
            'paid_at' => null,
        ]);
    }

    public function paymentSubmitted(): static
    {
        return $this->state(fn () => [
            'status' => Order::STATUS_PAYMENT_SUBMITTED,
            'paid_at' => null,
        ]);
    }

    public function paid(): static
    {
        return $this->state(fn () => [
            'status' => Order::STATUS_PAID,
            'paid_at' => now(),
        ]);
    }
}
