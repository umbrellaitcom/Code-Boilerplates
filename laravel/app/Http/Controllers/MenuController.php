<?php

namespace App\Http\Controllers;

use App\Menu;
use App\MenuItem;
use App\Repositories\MenuRepository;
use App\System\AppHelper;
use Illuminate\Http\Request;
use App\Http\Resources\Menu as MenuResource;
use App\Http\Requests\Menu as MenuRequest;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(name = "Menu")
 *
 * Class MenuController
 * @package App\Http\Controllers
 */
class MenuController extends Controller
{
    protected $model;

    public function __construct()
    {
        $this->model = new MenuRepository();
    }

    /**
     * Get daily menu
     *
     * @OA\Get(
     *     path="/api/menu",
     *     description="Returns the menu items for date provided or for current date if this hasn't set",
     *     tags={"Menu"},
     *     @OA\Parameter(
     *         name="date",
     *         description="Date string, f.e 2019-11-30",
     *         required=true,
     *         in="query",
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Parameter(
     *         name="page",
     *         description="Page number",
     *         required=false,
     *         in="query",
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                  property="data",
     *                  type="array",
     *                  @OA\Items(ref="#/components/schemas/MenuResource")
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
    public function getByDate(Request $request)
    {
        $date = AppHelper::toDate($request->query->get('date'));
        $menus = Menu::where('date', $date)->paginate(15);

        return MenuResource::collection($menus);
    }

    /**
     * Create menu
     *
     * @OA\Post(
     *     path="/api/menu",
     *     description="Returns the menu created",
     *     tags={"Menu"},
     *     @OA\RequestBody(
     *         description="Menu to add",
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/MenuRequest"),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/MenuResource")
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
     * @param MenuRequest $request
     * @return MenuResource[]
     * @throws \Throwable
     */
    public function create(MenuRequest $request)
    {
        $menuItemIds = $request->get('menu_item_ids');
        $menus = $this->model->create($request, $menuItemIds);

        return response()->success($menus);
    }

    /**
     * Update menu
     *
     * @OA\Put(
     *     path="/api/menu",
     *     description="Returns the menu created",
     *     tags={"Menu"},
     *     @OA\RequestBody(
     *         description="Menu to add",
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/MenuRequest"),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/MenuResource")
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
     * @param MenuRequest $request
     * @return MenuResource[]
     * @throws \Throwable
     */
    public function update(MenuRequest $request)
    {
        $menuItemIds = $request->get('menu_item_ids');
        $menus = $this->model
            ->withClean($request)
            ->create($request, $menuItemIds);

        return response()->success($menus);
    }
}
