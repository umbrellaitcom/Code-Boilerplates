<?php

    namespace App\Validator;

    use Symfony\Component\Validator\Validator\ValidatorInterface;
    use Symfony\Component\Validator\ConstraintViolationList;

    abstract class AbstractValidator
    {
        /**
         * @var ValidatorInterface
         */
        private $validator;

        /**
         * @var ConstraintViolationList
         */
        private $errors;

        /**
         * AbstractBuilder constructor.
         * @param ValidatorInterface $validator
         */
        public function __construct(ValidatorInterface $validator)
        {
            $this->validator = $validator;
            $this->clearErrors();
        }

        /**
         * @return ConstraintViolationList
         */
        public function getErrors(): ConstraintViolationList
        {
            return $this->errors;
        }

        /**
         * @return ConstraintViolationList
         */
        protected function clearErrors(): ConstraintViolationList
        {
            $this->errors = new ConstraintViolationList();

            return $this->getErrors();
        }

        /**
         * @return ValidatorInterface
         */
        protected function getValidator(): ValidatorInterface
        {
            return $this->validator;
        }
    }
