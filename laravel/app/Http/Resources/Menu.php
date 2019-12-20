<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="MenuResource",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         example=124
 *     ),
 *     @OA\Property(
 *         property="date",
 *         type="string",
 *         example="2019-11-30"
 *     ),
 *     @OA\Property(
 *         property="menu_item",
 *         ref="#/components/schemas/MenuItemResource"
 *     )
 * )
 */

/**
 * Class Menu
 * @package App\Http\Resources
 *
 * @property int id
 * @property string date
 * @property array menuItem
 */
class Menu extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'menu_item' => new MenuItem($this->menuItem),
        ];
    }
}
