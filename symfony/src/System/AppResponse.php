<?php

    namespace App\System;

    use Symfony\Component\Validator\ConstraintViolationList;
    use Doctrine\Common\Collections\ArrayCollection;

    /**
     * Class AppResponse
     *
     * @package App\System
     */
    class AppResponse
    {
        private const META_ERRORS = 'errors';
        private const META_TIME = 'time';

        /**
         * @var mixed
         */
        private $response;

        /**
         * @var \Doctrine\Common\Collections\ArrayCollection
         */
        private $meta;

        /**
         * @param mixed $response
         * @param null|array $meta
         * @param null|\Symfony\Component\Validator\ConstraintViolationList $errors
         */
        public function __construct($response = null, ?array $meta = null, ?ConstraintViolationList $errors = null)
        {
            $this->response = $response;
            $this->meta = new ArrayCollection($meta ?: []);
            $this->setMeta(self::META_ERRORS, $errors ?: new ConstraintViolationList);
            $this->setMeta(self::META_TIME, time());
        }

        /**
         * @param mixed $response
         * @return $this
         */
        public function setResponse($response)
        {
            $this->response = $response;

            return $this;
        }

        /**
         * @return mixed
         */
        public function getResponse()
        {
            return $this->response;
        }

        /**
         * @param string $key
         * @param mixed $value
         * @return $this
         */
        public function setMeta(string $key, $value)
        {
            $this->meta->set($key, $value);

            return $this;
        }

        /**
         * @return \Doctrine\Common\Collections\ArrayCollection
         */
        public function getMeta(): ArrayCollection
        {
            return $this->meta;
        }

        /**
         * @return \Symfony\Component\Validator\ConstraintViolationList
         */
        public function getErrors(): ConstraintViolationList
        {
            return $this->getMeta()->get(self::META_ERRORS);
        }
    }
