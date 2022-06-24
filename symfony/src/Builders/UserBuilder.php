<?php

    namespace App\Builders;

    use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
    use Symfony\Component\Validator\Validator\ValidatorInterface;
    use App\Entity\User;
    use App\Validator\AbstractValidator;
    use App\System\AppHelper;
    use App\System\ErrorBuilder;

    class UserBuilder extends AbstractValidator
    {
        public const FIELD_USERNAME = 'username';
        public const FIELD_EMAIL = 'email';
        public const FIELD_ROLES = 'roles';
        public const FIELD_PASSWORD = 'password';

        private const PASSWORD_MIN_LENGTH = 6;
        private const PASSWORD_MAX_LENGTH = 128;
        private const PASSWORD_MIN_LENGTH_VALIDATION_ERROR_MESSAGE = 'Password must be at least ' . self::PASSWORD_MIN_LENGTH . ' characters long';
        private const PASSWORD_MAX_LENGTH_VALIDATION_ERROR_MESSAGE = 'Password cannot be longer than ' . self::PASSWORD_MAX_LENGTH . ' characters';


        /**
         * @var \Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface
         */
        private $encoder;

        /**
         * UserBuilder constructor.
         * @param \Symfony\Component\Validator\Validator\ValidatorInterface $validator
         * @param \Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface $encoder
         */
        public function __construct(ValidatorInterface $validator, UserPasswordEncoderInterface $encoder)
        {
            parent::__construct($validator);

            $this->encoder = $encoder;
        }

        /**
         * @param \App\Entity\User|null $user
         * @param array $parameters
         * @return \App\Entity\User
         */
        public function build(?User $user, array $parameters): User
        {
            $user = $user ?? new User();

            $this->clearErrors();

            if (array_key_exists(self::FIELD_USERNAME, $parameters)) {
                $user->setUsername(AppHelper::toString($parameters[self::FIELD_USERNAME]));
            }

            if (array_key_exists(self::FIELD_EMAIL, $parameters)) {
                $user->setEmail(AppHelper::toString($parameters[self::FIELD_EMAIL]));
            }

            if (array_key_exists(self::FIELD_ROLES, $parameters)) {
                $user->setRoles(AppHelper::parseArrayString($parameters[self::FIELD_ROLES]));
            }

            if (array_key_exists(self::FIELD_PASSWORD, $parameters)) {
                $password = AppHelper::toString($parameters[self::FIELD_PASSWORD]);

                if (strlen($password) < self::PASSWORD_MIN_LENGTH) {
                    $this->getErrors()->add(ErrorBuilder::build(self::PASSWORD_MIN_LENGTH_VALIDATION_ERROR_MESSAGE, 'password'));
                } else if (strlen($password) > self::PASSWORD_MAX_LENGTH) {
                    $this->getErrors()->add(ErrorBuilder::build(self::PASSWORD_MAX_LENGTH_VALIDATION_ERROR_MESSAGE, 'password'));
                } else {
                    $password = $this->encoder->encodePassword($user, AppHelper::toString($parameters[self::FIELD_PASSWORD]));
                    $user->setPassword($password);
                }
            }

            $this->getErrors()->addAll($this->getValidator()->validate($user));

            return $user;
        }
    }
