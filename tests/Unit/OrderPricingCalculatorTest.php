<?php

namespace Tests\Unit;

use App\Support\OrderPricingCalculator;
use PHPUnit\Framework\TestCase;

class OrderPricingCalculatorTest extends TestCase
{
    public function test_it_calculates_single_bottle_pricing(): void
    {
        $pricing = (new OrderPricingCalculator)->calculate(1);

        $this->assertSame(10_00, $pricing['subtotal']);
        $this->assertSame(8_00, $pricing['shipping_fee']);
        $this->assertSame(18_00, $pricing['grand_total']);
        $this->assertSame([
            'ten_bottle_sets' => 0,
            'five_bottle_sets' => 0,
            'single_bottles' => 1,
        ], $pricing['breakdown']);
    }

    public function test_it_calculates_five_bottle_bundle_pricing(): void
    {
        $pricing = (new OrderPricingCalculator)->calculate(5);

        $this->assertSame(45_00, $pricing['subtotal']);
        $this->assertSame(53_00, $pricing['grand_total']);
    }

    public function test_it_calculates_ten_bottle_bundle_pricing(): void
    {
        $pricing = (new OrderPricingCalculator)->calculate(10);

        $this->assertSame(80_00, $pricing['subtotal']);
        $this->assertSame(88_00, $pricing['grand_total']);
    }

    public function test_it_combines_bundles_for_best_price(): void
    {
        $pricing = (new OrderPricingCalculator)->calculate(16);

        $this->assertSame(135_00, $pricing['subtotal']);
        $this->assertSame(143_00, $pricing['grand_total']);
        $this->assertSame([
            'ten_bottle_sets' => 1,
            'five_bottle_sets' => 1,
            'single_bottles' => 1,
        ], $pricing['breakdown']);
    }
}
