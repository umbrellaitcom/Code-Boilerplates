<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use OpenApi\Annotations as OA;

/**
 *  @OA\Schema(
 *     schema="MenuItemRequest",
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         example=357
 *     ),
 *     @OA\Property(
 *         property="price",
 *         type="number",
 *         example=60
 *     ),
 *     @OA\Property(
 *         property="category",
 *         type="string",
 *         example="Soups"
 *     ),
 *     @OA\Property(
 *         property="weight",
 *         type="number",
 *         example=150
 *     )
 * )
 */

/**
 * Class MenuItem
 * @package App\Http\Requests
 */
class MenuItem extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'max:255', Rule::unique(\App\MenuItem::class)->ignore($this->id)],
            'price' => ['required', 'numeric'],
            'category' => ['string'],
            'weight' => ['required', 'numeric'],
        ];
    }
}
