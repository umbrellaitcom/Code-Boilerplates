<?php

    namespace App\Controller;

    use Symfony\Component\Config\Definition\Exception\Exception;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;
    use FOS\RestBundle\Controller\AbstractFOSRestController;
    use FOS\RestBundle\View\View;
    use Swagger\Annotations as SWG;
    use App\System\AppResponseBuilder;
    use App\System\ErrorBuilder;
    use App\Builders\UserBuilder;

    class AuthController extends AbstractFOSRestController
    {

        /**
         * @Route("/register", methods={"POST"})
         *
         * @SWG\Tag(name = "Auth")
         * @SWG\Parameter(
         *     name="body",
         *     in="body",
         *     description="Credentials",
         *     @SWG\Schema(
         *         type="object",
         *         @SWG\Property(
         *             property="username",
         *             type="string",
         *             example="johndoe"
         *         ),
         *         @SWG\Property(
         *             property="email",
         *             type="string",
         *             example="johndoe@test.com"
         *         ),
         *         @SWG\Property(
         *             property="password",
         *             type="string",
         *             example="testpassword"
         *         )
         *     )
         * )
         * @SWG\Response(
         *     response=200,
         *     description="User was created",
         * )
         *
         * @param \Symfony\Component\HttpFoundation\Request $request
         * @param \App\Builders\UserBuilder $userBuilder
         * @return \FOS\RestBundle\View\View
         */
        public function register(Request $request, UserBuilder $userBuilder): View
        {
            $em = $this->getDoctrine()->getManager();

            $user = $userBuilder->build(null, $request->request->all());
            $errors = $userBuilder->getErrors();

            if (!$errors->count()) {
                try {
                    $em->persist($user);
                    $em->flush($user);
                } catch (Exception $e) {
                    $errors->add(ErrorBuilder::build($e->getMessage(), 'db_error'));
                }
            }

            return View::create(
                AppResponseBuilder::build(null, null, $errors),
                $errors->count() ? Response::HTTP_BAD_REQUEST : Response::HTTP_OK
            );
        }
    }
