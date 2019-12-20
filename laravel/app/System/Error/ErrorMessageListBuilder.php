<?php

namespace App\System\Error;

use Illuminate\Support\MessageBag;

class ErrorMessageListBuilder
{
    public static function build($message, $path = null): ErrorMessageList {
        $errorMessageList = new ErrorMessageList();
        if (is_string($message)) {
            $msg = new ErrorMessage();
            $msg->setMessage($message);
            $msg->setPath($path);
            $errorMessageList->add($msg);
        } else if (is_array($message)) {
            foreach ($message as $validatorKey=>$msg) {
                $errorMessageList->add(new ErrorMessage($msg[0], $path ?? $validatorKey));
            }
        } else if ($message instanceof MessageBag || is_array($message)) {
            foreach ($message->getMessages() as $validatorKey=>$msg) {
                $errorMessageList->add(new ErrorMessage($msg[0], $path ?? $validatorKey));
            }
        }

        return $errorMessageList;
    }
}
