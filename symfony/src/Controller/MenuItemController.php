<?php

namespace App\Controller;

use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\ConstraintViolationList;
use FOS\RestBundle\View\View;
use Nelmio\ApiDocBundle\Annotation\Model;
use Swagger\Annotations as SWG;
use App\Entity\MenuItem;
use App\Repository\MenuItemRepository;
use App\System\AppResponseBuilder;
use App\System\ErrorBuilder;
use App\Builders\MenuItemBuilder;

/**
 * @Route("/menu/item")
 */
class MenuItemController extends AbstractController
{
    /**
     * @Route("/list", methods={"GET"})
     *
     * @SWG\Tag(name = "Menu Item")
     * @SWG\Response(
     *     response=200,
     *     description="Returns the menu items",
     *     @SWG\Schema(
     *         type="array",
     *         @SWG\Items(
     *             @Model(type=MenuItem::class)
     *         )
     *     )
     * )
     *
     * @SWG\Response(
     *     response=403,
     *     description="Forbidden",
     *     @SWG\Schema(ref="#definitions/forbidden")
     * )
     *
     * @param \App\Repository\MenuItemRepository $menuItemRepository
     * @return \FOS\RestBundle\View\View
     */
    public function getList(MenuItemRepository $menuItemRepository): View
    {
        $errors = new ConstraintViolationList;
        $menuItems = [];

        try {
            $menuItems = $menuItemRepository->findAll();
        } catch(Exception $e) {
            $errors->add(ErrorBuilder::build($e->getMessage(), 'db_error'));
        }

        return View::create(
            AppResponseBuilder::build($menuItems, null, $errors),
            $errors->count() ? Response::HTTP_BAD_REQUEST : Response::HTTP_OK
        );
    }

    /**
     * @Route("/{id}", methods={"GET"})
     *
     * @SWG\Tag(name = "Menu Item")
     * @SWG\Response(
     *     response=200,
     *     description="Returns the menu item",
     *     @Model(type=MenuItem::class)
     * )
     *
     * @SWG\Response(
     *     response=403,
     *     description="Forbidden",
     *     @SWG\Schema(ref="#definitions/forbidden")
     * )
     *
     * @param int $id
     * @return \FOS\RestBundle\View\View
     */
    public function getOneById(int $id): View
    {
        $errors = new ConstraintViolationList;
        $menuItem = NULL;

        try {
            $em = $this->getDoctrine()->getManager();
            $menuItem = $this->json($em->find(MenuItem::class, $id));
        } catch(Exception $e) {
            $errors->add(ErrorBuilder::build($e->getMessage(), 'db_error'));
        }

        return View::create(
            AppResponseBuilder::build($menuItem, null, $errors),
            $errors->count() ? Response::HTTP_BAD_REQUEST : Response::HTTP_OK
        );
    }

    /**
     * @Route("/{id}", methods={"DELETE"})
     *
     * @SWG\Tag(name = "Menu Item")
     * @SWG\Response(
     *     response=200,
     *     description="Delete the menu item",
     *     @Model(type=MenuItem::class)
     * )
     *
     * @SWG\Response(
     *     response=403,
     *     description="Forbidden",
     *     @SWG\Schema(ref="#definitions/forbidden")
     * )
     *
     * @param int $id
     * @return \FOS\RestBundle\View\View
     */
    public function deleteOneById(int $id): View
    {
        $menuItem = NULL;
        $errors = new ConstraintViolationList;
        $em = $this->getDoctrine()->getManager();

        try {
            $menuItem = $em->find(MenuItem::class, $id);
            $em->remove($menuItem);
            $em->flush();
        } catch (Exception $e) {
            $errors->add(ErrorBuilder::build($e->getMessage(), 'db_error'));
        }

        return View::create(
            AppResponseBuilder::build($menuItem, null, $errors),
            $errors->count() ? Response::HTTP_BAD_REQUEST : Response::HTTP_OK
        );
    }

    /**
     * @Route("/", name="menu_item_post", methods={"POST"})
     *
     * @SWG\Tag(name = "Menu Item")
     * @SWG\Parameter(
     *     name="body",
     *     in="body",
     *     description="Menu item data",
     *     @SWG\Schema(
     *         type="object",
     *         @SWG\Property(
     *             property="name",
     *             type="string",
     *             example="Solianka"
     *         ),
     *         @SWG\Property(
     *             property="price",
     *             type="number",
     *             example=60
     *         ),
     *         @SWG\Property(
     *             property="category",
     *             type="string",
     *             example="Soups"
     *         ),
     *         @SWG\Property(
     *             property="weight",
     *             type="number",
     *             example=150
     *         )
     *     )
     * )
     * @SWG\Response(
     *     response=200,
     *     description="Create the menu item",
     *     @Model(type=MenuItem::class)
     * )
     *
     * @SWG\Response(
     *     response=403,
     *     description="Forbidden",
     *     @SWG\Schema(ref="#definitions/forbidden")
     * )
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \App\Builders\MenuItemBuilder $menuItemBuilder
     * @return \FOS\RestBundle\View\View
     */
    public function create(Request $request, MenuItemBuilder $menuItemBuilder): View
    {
        $entityManager = $this->getDoctrine()->getManager();
        $menuItem = $menuItemBuilder->build(null, $request->request->all());
        $errors = $menuItemBuilder->getErrors();

        if (!$errors->count()) {
            try {
                $entityManager->persist($menuItem);
                $entityManager->flush($menuItem);
            } catch(Exception $e) {
                $errors->add(ErrorBuilder::build($e->getMessage(), 'db_error'));
            }
        }

        return View::create(
            AppResponseBuilder::build($menuItem, null, $errors),
            $errors->count() ? Response::HTTP_BAD_REQUEST : Response::HTTP_OK
        );
    }

    /**
     * @Route("/{id}", methods={"PATCH"})
     *
     * @SWG\Tag(name = "Menu Item")
     *
     * @SWG\Parameter(
     *     name="body",
     *     in="body",
     *     description="Menu item data",
     *     @SWG\Schema(
     *         type="object",
     *         @SWG\Property(
     *             property="name",
     *             type="string",
     *             example="Solianka"
     *         ),
     *         @SWG\Property(
     *             property="price",
     *             type="number",
     *             example=60
     *         ),
     *         @SWG\Property(
     *             property="category",
     *             type="string",
     *             example="Soups"
     *         ),
     *         @SWG\Property(
     *             property="weight",
     *             type="number",
     *             example=150
     *         )
     *     )
     * )
     * @SWG\Response(
     *     response=200,
     *     description="Update the menu item",
     *     @Model(type=MenuItem::class)
     * )
     *
     * @SWG\Response(
     *     response=403,
     *     description="Forbidden",
     *     @SWG\Schema(ref="#definitions/forbidden")
     * )
     *
     * @param int $id
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \App\Builders\MenuItemBuilder $menuItemBuilder
     * @return \FOS\RestBundle\View\View
     */
    public function update(int $id, Request $request, MenuItemBuilder $menuItemBuilder): View
    {

        $entityManager = $this->getDoctrine()->getManager();
        $menuItem = $menuItemBuilder->build($entityManager->find(MenuItem::class, $id), $request->request->all());
        $errors = $menuItemBuilder->getErrors();

        if (!$errors->count()) {
            try {
                $entityManager->persist($menuItem);
                $entityManager->flush($menuItem);
            } catch(Exception $e) {
                $errors->add(ErrorBuilder::build($e->getMessage(), 'db_error'));
            }
        }

        return View::create(
            AppResponseBuilder::build($menuItem, null, $errors),
            $errors->count() ? Response::HTTP_BAD_REQUEST : Response::HTTP_OK
        );
    }
}
