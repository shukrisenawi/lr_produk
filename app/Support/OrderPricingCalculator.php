<?php

namespace App\Support;

class OrderPricingCalculator
{
    public const SINGLE_BOTTLE_PRICE = 10_00;

    public const FIVE_BOTTLE_PRICE = 45_00;

    public const TEN_BOTTLE_PRICE = 80_00;

    public const SHIPPING_FEE = 8_00;

    /**
     * @return array{subtotal:int,shipping_fee:int,grand_total:int,breakdown:array{ten_bottle_sets:int,five_bottle_sets:int,single_bottles:int}}
     */
    public function calculate(int $quantity): array
    {
        $tenBottleSets = intdiv($quantity, 10);
        $remainingAfterTen = $quantity % 10;
        $fiveBottleSets = intdiv($remainingAfterTen, 5);
        $singleBottles = $remainingAfterTen % 5;

        $subtotal = ($tenBottleSets * self::TEN_BOTTLE_PRICE)
            + ($fiveBottleSets * self::FIVE_BOTTLE_PRICE)
            + ($singleBottles * self::SINGLE_BOTTLE_PRICE);

        return [
            'subtotal' => $subtotal,
            'shipping_fee' => self::SHIPPING_FEE,
            'grand_total' => $subtotal + self::SHIPPING_FEE,
            'breakdown' => [
                'ten_bottle_sets' => $tenBottleSets,
                'five_bottle_sets' => $fiveBottleSets,
                'single_bottles' => $singleBottles,
            ],
        ];
    }
}
