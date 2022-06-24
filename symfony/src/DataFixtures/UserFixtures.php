<?php

    namespace App\DataFixtures;

    use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
    use Doctrine\Bundle\FixturesBundle\Fixture;
    use Doctrine\Common\Persistence\ObjectManager;
    use App\Builders\UserBuilder;

    class UserFixtures extends Fixture
    {
        /**
         * @var \Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface
         */
        private $encoder;

        /**
         * @var \App\Builders\UserBuilder
         */
        private $userBuilder;

        /**
         * UserFixtures constructor.
         *
         * @param \Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface $encoder
         * @param \App\Builders\UserBuilder $userBuilder
         */
        public function __construct(UserPasswordEncoderInterface $encoder, UserBuilder $userBuilder)
        {
            $this->encoder = $encoder;
            $this->userBuilder = $userBuilder;
        }

        /**
         * @param \Doctrine\Common\Persistence\ObjectManager $manager
         * @throws \Exception
         */
        public function load(ObjectManager $manager)
        {
            $parameters = [
                'username' => 'johndoe',
                'email' => 'johndoe@test.com',
                'password' => 'testpassword',
            ];
            $user = $this->userBuilder->build(null, $parameters);

            $manager->persist($user);
            $manager->flush($user);
        }
    }
