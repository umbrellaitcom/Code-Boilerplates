<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuItem as MenuItemRequest;
use App\Http\Resources\MenuItem as MenuItemResource;
use App\MenuItem;
use \Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(name = "Menu Items")
 *
 * Class MenuItemController
 * @package App\Http\Controllers
 */
class MenuItemController extends Controller
{
    /**
     * Get the list of all available menu items
     *
     * @OA\Get(
     *     path="/api/menu/item",
     *     description="Returns the menu items",
     *     tags={"Menu Items"},
     *     @OA\Parameter(
     *         description="Page number",
     *         in="query",
     *         name="page",
     *         required=false,
     *         @OA\Schema(
     *             format="int64",
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                  property="data",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/MenuItemResource")
     *             ),
     *             @OA\Property(
     *                 property="links",
     *                 ref="#/components/schemas/PagedResponseLinks"
     *             ),
     *             @OA\Property(
     *                 property="meta",
     *                 ref="#/components/schemas/PagedResponseMeta"
     *             )
     *         ),
     *     ),
     *     @OA\Response(
     *         response="401",
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorMessageList")
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Bad Request",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorMessageList")
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function getList(Request $request)
    {
        return MenuItemResource::collection(MenuItem::paginate());
    }

    /**
     * Get current menu item by id
     *
     * @OA\Get(
     *     path="/api/menu/item/{id}",
     *     description="Returns the menu item by provided id",
     *     tags={"Menu Items"},
     *     @OA\Parameter(
     *         description="ID of menu item",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *             format="int64",
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/MenuItemResource")
     *     ),
     *     @OA\Response(
     *         response="401",
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorMessageList")
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Bad Request",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorMessageList")
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     *
     * @param MenuItem $menuItem
     * @return MenuItemResource
     * @throws ModelNotFoundException
     */
    public function getOneById(MenuItem $menuItem)
    {
        return response()->success(
            new MenuItemResource($menuItem)
        );
    }

    /**
     * Create new menu item
     *
     * @OA\Post(
     *     path="/api/menu/item",
     *     description="Create the menu item",
     *     tags={"Menu Items"},
     *     @OA\RequestBody(
     *         description="Menu item to add",
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/MenuItemRequest"),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/MenuItemResource")
     *     ),
     *     @OA\Response(
     *         response="401",
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorMessageList")
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Bad Request",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorMessageList")
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     *
     * @param MenuItemRequest $request
     * @return MenuItem
     */
    public function create(MenuItemRequest $request)
    {
        try {
            $menuItem = new MenuItem();
            $menuItem->fill($request->all());
            $menuItem->save();

            return response()->success(
                new MenuItemResource($menuItem)
            );
        } catch (\Throwable $e) {
            return response()->error(
                $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Update menu item
     *
     * @OA\Put(
     *     path="/api/menu/item/{id}",
     *     description="Update the menu item",
     *     tags={"Menu Items"},
     *     @OA\Parameter(
     *         description="ID of menu item",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *             format="int64",
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         description="Menu item to update",
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/MenuItemRequest"),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/MenuItemResource")
     *     ),
     *     @OA\Response(
     *         response="401",
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorMessageList")
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Bad Request",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorMessageList")
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     *
     * @param MenuItem $menuItem
     * @param MenuItemRequest $request
     * @return MenuItem
     */
    public function update(MenuItem $menuItem, MenuItemRequest $request)
    {
        try {
            $menuItem->fill($request->all());
            $menuItem->save();

            return response()->success(
                new MenuItemResource($menuItem)
            );
        } catch (\Throwable $e) {
            return response()->error(
                $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * Delete existing menu item
     *
     * @OA\Delete(
     *     path="/api/menu/item/{id}",
     *     description="Delete the menu item",
     *     tags={"Menu Items"},
     *     @OA\Parameter(
     *         description="ID of menu item",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(
     *             format="int64",
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation"
     *     ),
     *     @OA\Response(
     *         response="401",
     *         description="Unauthenticated",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorMessageList")
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Bad Request",
     *         @OA\JsonContent(ref="#/components/schemas/ErrorMessageList")
     *     ),
     *     security={
     *         {"bearerAuth": {}}
     *     }
     * )
     *
     * @param MenuItem $menuItem
     * @return void
     * @throws ModelNotFoundException
     * @throws \Exception
     */
    public function deleteOneById(MenuItem $menuItem)
    {
        $menuItem->delete();
        return;
    }
}
