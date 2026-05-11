<?php

namespace Database\Seeders;

use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->admin()->create([
            'name' => 'Admin Aurora',
            'phone' => '01110000000',
            'email' => 'admin@auroraterapi.test',
        ]);

        ProductVariant::query()->create([
            'name' => 'Aurora Terapi Serai Wangi',
            'slug' => 'serai-wangi',
            'sort_order' => 1,
        ]);

        ProductVariant::query()->create([
            'name' => 'Aurora Terapi Kayu Putih',
            'slug' => 'kayu-putih',
            'sort_order' => 2,
        ]);

        ProductVariant::query()->create([
            'name' => 'Aurora Terapi Lemon',
            'slug' => 'lemon',
            'sort_order' => 3,
        ]);

        ProductVariant::query()->create([
            'name' => 'Aurora Terapi Bidara',
            'slug' => 'bidara',
            'is_best_seller' => true,
            'sort_order' => 4,
        ]);
    }
}
