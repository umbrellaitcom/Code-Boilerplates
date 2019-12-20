<?php

namespace App\Repositories;


use App\Http\Requests\Menu as MenuRequest;
use App\Http\Resources\Menu as MenuResource;
use App\Menu;
use App\MenuItem;
use App\System\AppHelper;
use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;

class MenuRepository
{

    /**
     * Create Menu items
     *
     * @param MenuRequest $request
     * @param array $menuItemIds
     * @return array
     */
   public function create(MenuRequest $request, array $menuItemIds)
   {
       $menus = [];
       DB::beginTransaction();
       try {
           if (is_iterable($menuItemIds)) {
               foreach ($menuItemIds as $menuItemId) {
                   $menu = new Menu();
                   $menu->date = $request->get('date');
                   $menu->menuItem()->associate(MenuItem::findOrFail($menuItemId));
                   $menu->save();
                   $menus[] = new MenuResource($menu);
               }
           }
           DB::commit();
       } catch (Exception $e) {
           DB::rollBack();
       }
       return $menus;
   }

    /**
     *
     * @param MenuRequest $request
     * @return $this
     */
    public function withClean(MenuRequest $request)
    {
        $date = AppHelper::toDate($request->query->get('date'));
        Menu::where('date', $date)->delete();
        return $this;
    }
}