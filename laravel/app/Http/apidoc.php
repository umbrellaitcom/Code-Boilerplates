<?php

use OpenApi\Annotations as OA;

// ApiDoc Info

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="UIT Code Sample Laravel",
 *     description="UIT Code Sample Laravel OpenApi Doc"
 * )
 */

/**
 * @OA\SecurityScheme(
 *      securityScheme="bearerAuth",
 *      in="header",
 *      name="bearerAuth",
 *      type="http",
 *      scheme="bearer",
 *      bearerFormat="JWT",
 * )
 */

/**
 * @OA\Schema(
 *     schema="PagedResponseLinks",
 *     @OA\Property(
 *         property="first",
 *         type="string",
 *         example="https://api.host/api/menu?page=1"
 *     ),
 *     @OA\Property(
 *         property="last",
 *         type="string",
 *         example="https://api.host/api/menu?page=3"
 *     ),
 *     @OA\Property(
 *         property="prev",
 *         type="string",
 *         example=null
 *     ),
 *     @OA\Property(
 *         property="next",
 *         type="string",
 *         example="https://api.host/api/menu?page=2"
 *     )
 * )
 */

/**
 * @OA\Schema(
 *     schema="PagedResponseMeta",
 *     @OA\Property(
 *         property="current_page",
 *         type="integer",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="from",
 *         type="integer",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="last_page",
 *         type="integer",
 *         example=3
 *     ),
 *     @OA\Property(
 *         property="path",
 *         type="string",
 *         example="https://api.host/api/menu"
 *     ),
 *     @OA\Property(
 *         property="per_page",
 *         type="integer",
 *         example=15
 *     ),
 *     @OA\Property(
 *         property="to",
 *         type="integer",
 *         example=15
 *     ),
 *     @OA\Property(
 *         property="total",
 *         type="integer",
 *         example=21
 *     )
 * )
 */
