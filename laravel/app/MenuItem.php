<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class MenuItem
 * @package App
 *
 * @property integer $id
 * @property string $name
 * @property float $price
 * @property string $category
 * @property integer $weight
 * @property \DateTime $updated_at
 * @property \DateTime $created_at
 */
class MenuItem extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'price', 'category', 'weight'
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'category' => 'Other',
    ];
}
