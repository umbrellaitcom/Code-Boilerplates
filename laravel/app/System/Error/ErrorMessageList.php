<?php

namespace App\System\Error;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\MessageBag;
use OpenApi\Annotations as OA;

/**
 * Class ErrorMessageList
 * @package App\System\Error
 *
 * @OA\Schema(schema="ErrorMessageList")
 */
class ErrorMessageList implements Jsonable, Arrayable, \JsonSerializable
{
    const ERRORS_MESSAGES_KEY = 'errors';

    /**
     * @OA\Property(
     *     property="errors",
     *     type="array",
     *     @OA\Items(ref="#/components/schemas/ErrorMessage"),
     * )
     *
     * @var MessageBag
     */
    protected $errors;

    /**
     * ErrorMessageList constructor.
     */
    public function __construct()
    {
        $this->errors = new MessageBag();
    }

    public function add($message): void {
        if (! $message instanceof ErrorMessage) {
            $this->errors->add(ErrorMessageList::ERRORS_MESSAGES_KEY, $message);
        } else {
            $this->errors->add(ErrorMessageList::ERRORS_MESSAGES_KEY, new ErrorMessage($message));
        }
    }

    public function count(): int {
        return $this->errors->count();
    }

    public function isEmpty(): bool {
        return $this->errors->isEmpty();
    }

    /**
     * @inheritDoc
     */
    public function toArray()
    {
        $errors = [];
        $errorMessages = $this->errors->getMessages()[ErrorMessageList::ERRORS_MESSAGES_KEY] ?? [];
        foreach ($errorMessages as $errorMessage) {
            $errors[] = $errorMessage->getMessage();
        }

        return [
            'errors' => $errors
        ];
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
    public function jsonSerialize()
    {
        return $this->toArray();
    }
}
