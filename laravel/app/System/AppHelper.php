<?php

namespace App\System;

class AppHelper
{
    public const DATE_FORMAT = 'Y-m-d';

    /**
     * @param string $date
     * @param string $format
     * @return \DateTime|null
     */
    public static function toDate(?string $date, string $format = self::DATE_FORMAT): ?\DateTime
    {
        $dateTime = \DateTime::createFromFormat($format, $date);

        if (!($dateTime instanceof \DateTime)) {
            return null;
        }

        $dateTime->setTime(0, 0, 0);

        return $dateTime;
    }
}
