<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\User as UserResource;
use App\Http\Requests\Auth\Register as RegisterRequest;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(name = "Auth")
 *
 * @OA\Schema(
 *     schema="AuthToken",
 *     @OA\Property(
 *         property="access_token",
 *         type="string",
 *         example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaG9tZXN0ZWFkLnRlc3RcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1ODgyNTk0ODEsImV4cCI6MTU4ODI2MzA4MSwibmJmIjoxNTg4MjU5NDgxLCJqdGkiOiJuUGp6Yk56OHJrd2wzdGt6Iiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.Ma_TTUQPW7ue9mZpxop7CPRIkLi_VASbYE96zxbj1Uc"
 *     ),
 *     @OA\Property(
 *         property="token_type",
 *         type="string",
 *         example="bearer"
 *     ),
 *     @OA\Property(
 *         property="expires_in",
 *         type="integer",
 *         example=3600
 *     )
 * )
 */

/**
 * Class AuthController
 * @package App\Http\Controllers
 */
class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['register', 'login']]);
    }

    /**
     * Registers a new user
     *
     * @OA\Post(
     *     path="/api/auth/register",
     *     description="Registers a new user",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         description="User credentials",
     *         required=true,
     *         @OA\JsonContent(
     *            @OA\Property(
     *                property="name",
     *                type="string",
     *                example="John Doe"
     *            ),
     *            @OA\Property(
     *                property="email",
     *                type="string",
     *                example="example@mail.com"
     *            ),
     *            @OA\Property(
     *                property="password",
     *                type="string",
     *                example="password"
     *            )
     *         ),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/AuthToken")
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
     * )
     *
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $token = auth()->login($user);

        return $this->respondWithToken($token);
    }

    /**
     * Get a JWT via given credentials
     *
     * @OA\Post(
     *     path="/api/auth/login",
     *     description="Get a JWT via given credentials",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         description="User credentials",
     *         required=true,
     *         @OA\JsonContent(
     *            @OA\Property(
     *                property="email",
     *                type="string",
     *                example="example@mail.com"
     *            ),
     *            @OA\Property(
     *                property="password",
     *                type="string",
     *                example="password"
     *            )
     *         ),
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/AuthToken")
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
     * )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (! $token = Auth::attempt($credentials)) {
            return response()->error('Unauthorized', Response::HTTP_UNAUTHORIZED);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User
     *
     * @OA\Post(
     *     path="/api/auth/me",
     *     description="Get the authenticated User",
     *     tags={"Auth"},
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/UserResource")
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
     * @return UserResource
     */
    public function me()
    {
        return response()->success(new UserResource(auth()->user()));
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @OA\Post(
     *     path="/api/auth/logout",
     *     description="Log the user out (Invalidate the token)",
     *     tags={"Auth"},
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                  property="message",
     *                  type="string",
     *                  example="Successfully logged out"
     *             )
     *         )
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
     * @return JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token
     *
     * @OA\Post(
     *     path="/api/auth/refresh",
     *     description="Refresh a token",
     *     tags={"Auth"},
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/AuthToken")
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
     * @return JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @param int $status
     * @return JsonResponse
     */
    protected function respondWithToken($token, $status = Response::HTTP_OK)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ], $status);
    }
}
