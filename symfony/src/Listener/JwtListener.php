<?php

namespace App\Listener;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\ConstraintViolationList;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\Serializer;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTInvalidEvent;
use App\System\AppResponseBuilder;
use App\System\ErrorBuilder;

class JwtListener
{
    private const ERROR_PATH = 'authentication';
    private const ON_AUTHENTICATION_FAILURE_ERROR_MESSAGE = 'Bad credentials, please verify that your username/password are correctly set';
    private const ON_JWT_NOT_FOUND_ERROR_MESSAGE = 'Token was not provided';
    private const ON_JWT_EXPIRED_ERROR_MESSAGE = 'Provided token was expired';
    private const ON_JWT_INVALID_ERROR_MESSAGE = 'Provided token is invalid';

    /**
     * @var \JMS\Serializer\Serializer
     */
    private $serializer;

    /**
     * JwtListener constructor.
     *
     * @param \JMS\Serializer\Serializer $serializer
     */
    public function __construct(Serializer $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * @param AuthenticationSuccessEvent $event
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $appResponse = AppResponseBuilder::build($data, null, null);
        $serializer = SerializerBuilder::create()->build();

        $event->setData($serializer->toArray($appResponse));
    }

    /**
     * @param AuthenticationFailureEvent $event
     */
    public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
    {
        $response = $this->getErrorResponse(self::ON_AUTHENTICATION_FAILURE_ERROR_MESSAGE, Response::HTTP_UNAUTHORIZED);

        $event->setResponse($response);
    }

    /**
     * @param \Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent $event
     */
    public function onJWTNotFound(JWTNotFoundEvent $event)
    {
        $response = $this->getErrorResponse(self::ON_JWT_NOT_FOUND_ERROR_MESSAGE);

        $event->setResponse($response);
    }

    /**
     * @param \Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent $event
     */
    public function onJWTExpired(JWTExpiredEvent $event)
    {
        $response = $this->getErrorResponse(self::ON_JWT_EXPIRED_ERROR_MESSAGE);

        $event->setResponse($response);
    }

    /**
     * @param \Lexik\Bundle\JWTAuthenticationBundle\Event\JWTInvalidEvent $event
     */
    public function onJWTInvalid(JWTInvalidEvent $event)
    {
        $response = $this->getErrorResponse(self::ON_JWT_INVALID_ERROR_MESSAGE);

        $event->setResponse($response);
    }

    /**
     * @param string $error
     * @param int $statusCode
     * @return \Symfony\Component\HttpFoundation\Response
     */
    private function getErrorResponse(string $error, ?int $statusCode = Response::HTTP_FORBIDDEN): Response
    {
        $error = ErrorBuilder::build($error, self::ERROR_PATH);
        $appResponse = AppResponseBuilder::build(null, null, new ConstraintViolationList([$error]));
        $data = $this->serializer->serialize($appResponse, 'json');

        return new Response($data, $statusCode);
    }
}
