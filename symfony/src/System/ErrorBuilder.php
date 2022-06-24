<?php

    namespace App\System;

    use Symfony\Component\Validator\ConstraintViolation;

    /**
     * Class ViolationBuilder
     *
     * @package App\System
     */
    class ErrorBuilder
    {
        /**
         * @param string|int $message
         * @param string|int $path
         * @return \Symfony\Component\Validator\ConstraintViolation
         */
        public static function build($message, $path): ConstraintViolation
        {
            return new ConstraintViolation($message, $message, [], '', $path, '');
        }
    }
