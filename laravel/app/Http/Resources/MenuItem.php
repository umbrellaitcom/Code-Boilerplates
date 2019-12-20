<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="MenuItemResource",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         example=23
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         example="Solianka"
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
 * @package App\Http\Resources
 *
 * @property int $id
 * @property string $name
 * @property float $price
 * @property string $category
 * @property float $weight
 */
class MenuItem extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'category' => $this->category,
            'weight' => $this->weight,
        ];
    }
}
