<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\PaymentReceipt;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminOrderManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_users_cannot_access_admin_dashboard(): void
    {
        $customer = User::factory()->customer()->create();

        $response = $this->actingAs($customer)->get(route('admin.orders.index'));

        $response->assertForbidden();
    }

    public function test_admin_can_approve_uploaded_receipt_and_generate_invoice(): void
    {
        $admin = User::factory()->admin()->create();
        $customer = User::factory()->customer()->create();
        $order = Order::factory()
            ->for($customer)
            ->paymentSubmitted()
            ->create([
                'grand_total' => 88_00,
            ]);
        PaymentReceipt::factory()->for($order)->create();

        $response = $this
            ->actingAs($admin)
            ->patch(route('admin.orders.approve', $order), [
                'review_note' => 'Bayaran diterima.',
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'paid',
        ]);
        $this->assertDatabaseHas('invoices', [
            'order_id' => $order->id,
        ]);
    }

    public function test_admin_can_reject_uploaded_receipt_with_a_note(): void
    {
        $admin = User::factory()->admin()->create();
        $customer = User::factory()->customer()->create();
        $order = Order::factory()->for($customer)->paymentSubmitted()->create();
        PaymentReceipt::factory()->for($order)->create();

        $response = $this
            ->actingAs($admin)
            ->patch(route('admin.orders.reject', $order), [
                'review_note' => 'Jumlah pada resit tidak sama.',
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'payment_rejected',
        ]);
        $this->assertDatabaseHas('payment_receipts', [
            'order_id' => $order->id,
            'review_note' => 'Jumlah pada resit tidak sama.',
        ]);
    }

    public function test_admin_dashboard_shows_unpaid_orders_for_follow_up(): void
    {
        $admin = User::factory()->admin()->create();
        $customer = User::factory()->customer()->create([
            'name' => 'Aisyah',
            'phone' => '0195168839',
        ]);
        Order::factory()->for($customer)->awaitingPayment()->create([
            'customer_name' => 'Aisyah',
            'customer_phone' => '0195168839',
        ]);

        $response = $this->actingAs($admin)->get(route('admin.orders.index'));

        $response->assertOk();
        $response->assertSee('0195168839');
    }
}
