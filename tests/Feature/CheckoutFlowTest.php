<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CheckoutFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_checkout_and_an_account_is_created(): void
    {
        $variant = ProductVariant::factory()->create([
            'name' => 'Aurora Terapi Bidara',
            'slug' => 'bidara',
        ]);

        $response = $this->post(route('checkout.store'), [
            'name' => 'Aisyah',
            'phone' => '0195168839',
            'password' => 'password',
            'password_confirmation' => 'password',
            'shipping_address' => 'No 10, Jalan Melur, Shah Alam',
            'items' => [
                [
                    'variant_id' => $variant->id,
                    'quantity' => 1,
                ],
            ],
        ]);

        $customer = User::where('phone', '0195168839')->first();

        $this->assertNotNull($customer);
        $this->assertAuthenticatedAs($customer);
        $this->assertDatabaseHas('orders', [
            'user_id' => $customer->id,
            'status' => 'awaiting_payment',
            'customer_phone' => '0195168839',
            'subtotal' => 10_00,
            'shipping_fee' => 8_00,
            'grand_total' => 18_00,
        ]);
        $response->assertRedirect();
    }

    public function test_checkout_requires_at_least_one_product_selection(): void
    {
        $response = $this->post(route('checkout.store'), [
            'name' => 'Aisyah',
            'phone' => '0195168839',
            'password' => 'password',
            'password_confirmation' => 'password',
            'shipping_address' => 'No 10, Jalan Melur, Shah Alam',
            'items' => [],
        ]);

        $response->assertSessionHasErrors(['items']);
        $this->assertGuest();
    }

    public function test_customer_can_upload_payment_receipt_for_their_order(): void
    {
        Storage::fake('public');

        $customer = User::factory()->customer()->create([
            'phone' => '0195168839',
        ]);
        $order = Order::factory()->for($customer)->awaitingPayment()->create();

        $response = $this
            ->actingAs($customer)
            ->post(route('orders.receipts.store', $order), [
                'receipt' => UploadedFile::fake()->create('receipt.jpg', 100, 'image/jpeg'),
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('payment_receipts', [
            'order_id' => $order->id,
            'original_name' => 'receipt.jpg',
        ]);
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'payment_submitted',
        ]);
    }

    public function test_customer_cannot_upload_invalid_receipt_files(): void
    {
        Storage::fake('public');

        $customer = User::factory()->customer()->create();
        $order = Order::factory()->for($customer)->awaitingPayment()->create();

        $response = $this
            ->actingAs($customer)
            ->post(route('orders.receipts.store', $order), [
                'receipt' => UploadedFile::fake()->create('receipt.zip', 100),
            ]);

        $response->assertSessionHasErrors(['receipt']);
    }
}
