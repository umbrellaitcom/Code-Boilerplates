<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Menu
 * @package App
 *
 * @property integer $id
 * @property integer $menu_item_id
 * @property string $date
 * @property \DateTime $updated_at
 * @property \DateTime $created_at
 */
class Menu extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'menu_item_id', 'date'
    ];

    /**
     * Get the menu item that owns the menu.
     */
    public function menuItem()
    {
        return $this->belongsTo(MenuItem::class);
    }

}
