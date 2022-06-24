<?php

    namespace App\Controller;

    use Symfony\Component\Config\Definition\Exception\Exception;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\Validator\ConstraintViolationList;
    use FOS\RestBundle\Controller\AbstractFOSRestController;
    use FOS\RestBundle\View\View;
    use Nelmio\ApiDocBundle\Annotation\Model;
    use Swagger\Annotations as SWG;
    use App\Builders\MenuBuilder;
    use App\Entity\Menu;
    use App\Entity\MenuItem;
    use App\Repository\MenuRepository;
    use App\System\AppHelper;
    use App\System\AppResponseBuilder;
    use App\System\ErrorBuilder;

    /**
     * @Route("/menu")
     */
    class MenuController extends AbstractFOSRestController
    {
        /**
         * @Route("", methods={"GET"})
         *
         * @SWG\Tag(name = "Menu")
         * @SWG\Parameter(
         *     name="date",
         *     in="query",
         *     type="string",
         *     description="Date string, f.e 2019-11-30"
         * )
         * @SWG\Response(
         *     response=200,
         *     description="Returns the menu items for date provided or for current date if this hasn't set",
         *     @SWG\Schema(
         *         type="array",
         *         @SWG\Items(
         *             @Model(type=Menu::class)
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
         * @param \Symfony\Component\HttpFoundation\Request $request
         * @param \App\Repository\MenuRepository $menuRepository
         * @return \FOS\RestBundle\View\View
         */
        public function getByDate(Request $request, MenuRepository $menuRepository): View
        {
            $errors = new ConstraintViolationList;
            $menuItems = [];
            $date = AppHelper::toDate($request->query->get('date'));

            try {
                $menuItems = $menuRepository->findBy(array('date' => $date));
            } catch(Exception $e) {
                $errors->add(ErrorBuilder::build($e->getMessage(), 'db_error'));
            }

            return View::create(
                AppResponseBuilder::build($menuItems, null, $errors),
                $errors->count() ? Response::HTTP_BAD_REQUEST : Response::HTTP_OK
            );
        }

        /**
         * @Route("", methods={"POST"})
         *
         * @SWG\Tag(name = "Menu")
         * @SWG\Parameter(
         *     name="body",
         *     in="body",
         *     description="Menu fields",
         *     @SWG\Schema(
         *         type="object",
         *         @SWG\Property(
         *             property="date",
         *             type="string",
         *             example="2019-11-30"
         *         ),
         *         @SWG\Property(
         *             property="menu_item_ids",
         *             type="number",
         *             example=1
         *         ),
         *     )
         * )
         * @SWG\Response(
         *     response=200,
         *     description="Returns the menu created",
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
         * @param \Symfony\Component\HttpFoundation\Request $request
         * @param \App\Builders\MenuBuilder $menuBuilder
         * @return \FOS\RestBundle\View\View
         */
        public function create(Request $request, MenuBuilder $menuBuilder): View {
            $entityManager = $this->getDoctrine()->getManager();
            $menuItemRepository = $this->getDoctrine()->getRepository(MenuItem::class);
            $menuItemIds = $request->get('menu_item_ids');
            $errors = new ConstraintViolationList;

            foreach ($menuItemIds as $menuItemId) {
                $parameters = array(
                    'date' => $request->get('date'),
                    'menu_item_id' => $menuItemRepository->find($menuItemId),
                );

                $menu = $menuBuilder->build(null, $parameters);
                $errors = $menuBuilder->getErrors();

                if (!$errors->count()) {
                    try {
                        $entityManager->persist($menu);
                    } catch(Exception $e) {
                        $errors->add(ErrorBuilder::build($e->getMessage(), 'db_error'));
                    }
                }
            }

            $entityManager->flush();

            return View::create(
                AppResponseBuilder::build(null, null, $errors),
                $errors->count() ? Response::HTTP_BAD_REQUEST : Response::HTTP_OK
            );
        }

        /**
         * @Route("", methods={"PUT"})
         *
         * @SWG\Tag(name = "Menu")
         * @SWG\Parameter(
         *     name="body",
         *     in="body",
         *     description="Menu fields",
         *     @SWG\Schema(
         *         type="object",
         *         @SWG\Property(
         *             property="date",
         *             type="string",
         *             example="2019-11-30"
         *         ),
         *         @SWG\Property(
         *             property="menu_item_ids",
         *             type="array",
         *             @SWG\Items(
         *                 type="number",
         *                 example=1
         *             ),
         *         ),
         *     )
         * )
         * @SWG\Response(
         *     response=200,
         *     description="Returns the menu updated",
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
         * @param \Symfony\Component\HttpFoundation\Request $request
         * @param \App\Repository\MenuRepository $menuRepository
         * @param \App\Builders\MenuBuilder $menuBuilder
         * @return \FOS\RestBundle\View\View
         */
        public function update(Request $request, MenuRepository $menuRepository, MenuBuilder $menuBuilder): View {
            $entityManager = $this->getDoctrine()->getManager();
            $menuItemRepository = $this->getDoctrine()->getRepository(MenuItem::class);
            $menuItemIds = $request->get('menu_item_ids');
            $errors = new ConstraintViolationList;

             $currentMenuItems = $menuRepository
                    ->findBy(array('date' => AppHelper::toDate($request->request->get('date'))));
                if ($currentMenuItems) {
                    foreach ($currentMenuItems as $currentMenuItem) {
                        $entityManager->remove($currentMenuItem);
                    }
                }

            foreach ($menuItemIds as $menuItemId) {
                $parameters = array(
                    'date' => $request->get('date'),
                    'menu_item_id' => $menuItemRepository->find($menuItemId),
                );

                $menu = $menuBuilder->build(null, $parameters);
                $errors = $menuBuilder->getErrors();

                if (!$errors->count()) {
                    try {
                        $entityManager->persist($menu);
                        $entityManager->flush($menu);
                    } catch(Exception $e) {
                        $errors->add(ErrorBuilder::build($e->getMessage(), 'db_error'));
                    }
                }
            }

            return View::create(
                AppResponseBuilder::build(null, null, $errors),
                $errors->count() ? Response::HTTP_BAD_REQUEST : Response::HTTP_OK
            );
        }
    }
