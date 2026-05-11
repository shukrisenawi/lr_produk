<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class StorePaymentReceiptRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'receipt' => [
                'required',
                File::types(['jpg', 'jpeg', 'png', 'webp', 'pdf'])->max(5 * 1024),
            ],
        ];
    }
}
