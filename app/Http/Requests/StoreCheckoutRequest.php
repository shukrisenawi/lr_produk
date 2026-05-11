<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'password' => [$this->user() ? 'nullable' : 'required', 'confirmed'],
            'shipping_address' => ['required', 'string'],
            'notes' => ['nullable', 'string'],
            'items' => ['required', 'array'],
            'items.*.variant_id' => ['required', Rule::exists('product_variants', 'id')],
            'items.*.quantity' => ['required', 'integer', 'min:0'],
        ];
    }

    public function after(): array
    {
        return [
            function ($validator): void {
                $items = collect($this->input('items', []));

                if ($items->sum('quantity') < 1) {
                    $validator->errors()->add('items', 'Pilih sekurang-kurangnya satu botol.');
                }
            },
        ];
    }
}
