<?php

    namespace App\Builders;

    use App\Entity\MenuItem;
    use App\Validator\AbstractValidator;
    use App\System\AppHelper;

    class MenuItemBuilder extends AbstractValidator
    {
        public const FIELD_NAME = 'name';
        public const FIELD_PRICE = 'price';
        public const FIELD_CATEGORY = 'category';
        public const FIELD_WEIGHT = 'weight';

        /**
         * @param \App\Entity\MenuItem|null $menuItem
         * @param array $parameters
         * @return \App\Entity\MenuItem
         */
        public function build(?MenuItem $menuItem, array $parameters): MenuItem
        {
            $menuItem = $menuItem ?? new MenuItem();

            $this->clearErrors();

            if (array_key_exists(self::FIELD_NAME, $parameters)) {
                $menuItem->setName(AppHelper::toString($parameters[self::FIELD_NAME]));
            }

            if (array_key_exists(self::FIELD_PRICE, $parameters)) {
                $menuItem->setPrice(AppHelper::toFloat($parameters[self::FIELD_PRICE]));
            }

            if (array_key_exists(self::FIELD_CATEGORY, $parameters)) {
                $menuItem->setCategory(AppHelper::toString($parameters[self::FIELD_CATEGORY]));
            }

            if (array_key_exists(self::FIELD_WEIGHT, $parameters)) {
                $menuItem->setWeight(AppHelper::toInt($parameters[self::FIELD_WEIGHT]));
            }

            $this->getErrors()->addAll($this->getValidator()->validate($menuItem));

            return $menuItem;
        }
    }
