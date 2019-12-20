<?php

namespace App\System\Error;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use JsonSerializable;
use OpenApi\Annotations as OA;

/**
 * Class ErrorMessage
 * @package App\System\Error
 *
 * @OA\Schema(schema="ErrorMessage")
 */
class ErrorMessage implements Jsonable, Arrayable, JsonSerializable
{
    /**
     * @OA\Property()
     *
     * @var string
     */
    protected $message;

    /**
     * @OA\Property()
     *
     * @var string
     */
    protected $path;

    /**
     * ErrorMessage constructor.
     * @param $message
     * @param string|null $path
     */
    public function __construct($message = null, $path = null)
    {
        $this->message = $message;
        $this->path = $path;
    }

    /**
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @param string $message
     * @return self
     */
    public function setMessage($message): self
    {
        $this->message = $message;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getPath(): ?string
    {
        return $this->path;
    }

    /**
     * @param string|null $path
     */
    public function setPath(?string $path): void
    {
        $this->path = $path;
    }

    /**
     * @inheritDoc
     */
    public function toJson($options = 0)
    {
        return json_encode($this->toArray(), $options);
    }

    /**
     * @inheritDoc
     */
    public function toArray()
    {
        return [
            'message' => $this->getMessage(),
            'path' => $this->getPath(),
        ];
    }

    /**
     * @inheritDoc
     */
    public function jsonSerialize()
    {
        return $this->toArray();
    }
}
