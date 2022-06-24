<?php

    namespace App\DataFixtures;

    use Doctrine\Bundle\FixturesBundle\Fixture;
    use Doctrine\Common\Persistence\ObjectManager;
    use App\Entity\MenuItem;

    class MenuItemFixtures extends Fixture
    {
        public const SOLIANKA_REFERENCE = 'solianka';
        public const BORSCHT_REFERENCE = 'borscht';
        public const CHICKEN_PILAF_REFERENCE = 'chicken_pilaf';
        public const PORK_CHOP_REFERENCE = 'pork_chop';
        public const RICE_REFERENCE = 'rice';
        public const BUCKWHEAT_REFERENCE = 'buckwheat';
        public const VEGETABLE_SALAD_REFERENCE = 'vegetable_salad';

        /**
         * @param \Doctrine\Common\Persistence\ObjectManager $manager
         */
        public function load(ObjectManager $manager)
        {
            $menuItem = new MenuItem();
            $menuItem->setName('Solianka')
                ->setPrice(60.0)
                ->setCategory('Soups')
                ->setWeight(250);
            $manager->persist($menuItem);
            $this->addReference(self::SOLIANKA_REFERENCE, $menuItem);

            $menuItem = new MenuItem();
            $menuItem->setName('Borscht')
                ->setPrice(45.0)
                ->setCategory('Soups')
                ->setWeight(250);
            $manager->persist($menuItem);
            $this->addReference( self::BORSCHT_REFERENCE, $menuItem);

            $menuItem = new MenuItem();
            $menuItem->setName('Сhicken pilaf')
                ->setPrice(140.0)
                ->setCategory('Main dishes')
                ->setWeight(300);
            $manager->persist($menuItem);
            $this->addReference(self::CHICKEN_PILAF_REFERENCE, $menuItem);

            $menuItem = new MenuItem();
            $menuItem->setName('Pork chop')
                ->setPrice(110.0)
                ->setCategory('Main dishes')
                ->setWeight(130);
            $manager->persist($menuItem);
            $this->addReference(self::PORK_CHOP_REFERENCE, $menuItem);

            $menuItem = new MenuItem();
            $menuItem->setName('Rice')
                ->setPrice(40.0)
                ->setCategory('Side dishes')
                ->setWeight(200);
            $manager->persist($menuItem);
            $this->addReference(self::RICE_REFERENCE, $menuItem);

            $menuItem = new MenuItem();
            $menuItem->setName('Buckwheat')
                ->setPrice(40.0)
                ->setCategory('Side dishes')
                ->setWeight(200);
            $manager->persist($menuItem);
            $this->addReference(self::BUCKWHEAT_REFERENCE, $menuItem);

            $menuItem = new MenuItem();
            $menuItem->setName('Vegetable')
                ->setPrice(40.0)
                ->setCategory('Salads')
                ->setWeight(120);
            $manager->persist($menuItem);
            $this->addReference(self::VEGETABLE_SALAD_REFERENCE, $menuItem);

            $manager->flush();
        }
    }
