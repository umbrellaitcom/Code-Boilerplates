<?php

    namespace App\Builders;

    use App\Entity\Menu;
    use App\Validator\AbstractValidator;
    use App\System\AppHelper;

    class MenuBuilder extends AbstractValidator
    {
        public const FIELD_DATE = 'date';
        public const FIELD_MENU_ITEM_ID = 'menu_item_id';

        /**
         * @param \App\Entity\Menu|null $menu
         * @param array $parameters
         * @return \App\Entity\Menu
         */
        public function build(?Menu $menu, array $parameters): Menu
        {
            $menu = $menu ?? new Menu();

            $this->clearErrors();

            if (array_key_exists(self::FIELD_DATE, $parameters)) {
                $menu->setDate(AppHelper::toDate($parameters[self::FIELD_DATE]));
            }

            if (array_key_exists(self::FIELD_MENU_ITEM_ID, $parameters)) {
                $menu->setMenuItem($parameters[self::FIELD_MENU_ITEM_ID]);
            }

            $this->getErrors()->addAll($this->getValidator()->validate($menu));

            return $menu;
        }
    }
