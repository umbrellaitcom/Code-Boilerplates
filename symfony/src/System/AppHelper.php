<?php

    namespace App\System;

    use App\System\Exception\AppHelperException;

    class AppHelper
    {
        public const DATE_FORMAT = 'Y-m-d';

        /**
         * @param mixed $value
         * @param bool $trim
         * @return null|string
         */
        public static function toString($value, bool $trim = true): ?string
        {
            if (is_null($value)) {

                return null;
            }

            $value = filter_var($value, FILTER_UNSAFE_RAW, FILTER_NULL_ON_FAILURE);

            if ($trim && is_string($value)) {
                $value = trim($value);
            }

            return $value;
        }

        /**
         * @param mixed $value
         * @return float|null
         */
        public static function toFloat($value): ?float
        {
            return filter_var($value, FILTER_VALIDATE_FLOAT, FILTER_NULL_ON_FAILURE);
        }

        /**
         * @param mixed $value
         * @return int|null
         */
        public static function toInt($value): ?int
        {
            return filter_var($value, FILTER_VALIDATE_INT, FILTER_NULL_ON_FAILURE);
        }

        /**
         * @param string $date
         * @param string $format
         * @return \DateTime|null
         */
        public static function toDate(string $date, string $format = self::DATE_FORMAT): ?\DateTime
        {
            $dateTime = \DateTime::createFromFormat($format, $date);

            if (!($dateTime instanceof \DateTime)) {
                return null;
            }
            $dateTime->setTime(0, 0, 0);

            return $dateTime;
        }

        /**
         * @param mixed $arr
         * @return array
         */
        public static function parseArrayString($arr): array
        {
            if (!is_array($arr)) {
                return [];
            }

            foreach ($arr as $key => $value) {
                $arr[$key] = self::toString($value);
            }

            return array_filter($arr);
        }
    }
