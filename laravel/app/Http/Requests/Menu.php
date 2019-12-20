<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Annotations as OA;


/**
 *  @OA\Schema(
 *     schema="MenuRequest",
 *     @OA\Property(
 *          property="date",
 *          type="string",
 *          example="2019-11-30"
 *     ),
 *     @OA\Property(
 *         property="menu_item_ids",
 *         type="array",
 *         @OA\Items(
 *             type="number",
 *             example=1
 *         ),
 *     )
 * )
 */

/**
 * Class Menu
 * @package App\Http\Requests
 */
class Menu extends FormRequest
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
            'date' => ['required', 'date_format:Y-m-d'],
            'menu_item_ids' => ['array'],
            'menu_item_ids.*' => ['integer'],
        ];
    }
}
