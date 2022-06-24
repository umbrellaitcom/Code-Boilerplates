<?php

    namespace App\System;

    use Symfony\Component\Validator\ConstraintViolationList;

    /**
     * Class AppResponseBuilder
     *
     * @package App\System
     */
    class AppResponseBuilder
    {
        /**
         * @param mixed $response
         * @param array|null $meta
         * @param \Symfony\Component\Validator\ConstraintViolationList|null $errors
         * @return \App\System\AppResponse
         */
        public static function build($response = null, ?array $meta = null, ?ConstraintViolationList $errors = null): AppResponse
        {
            return new AppResponse($response, $meta, $errors);
        }
    }
