<?php

namespace App\Exceptions;

use App\System\Error\ErrorMessageListBuilder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\App;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

class Handler extends ExceptionHandler
{
    protected const DEFAULT_ERROR_MESSAGE = 'Internal server error';

    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        $data = null;
        $path = null;

        if ($exception instanceof AuthenticationException) {
            $status = Response::HTTP_UNAUTHORIZED;
            $path = 'auth';
            $message = $exception->getMessage();
        } else if ($exception instanceof ModelNotFoundException) {
            $modelClassName = explode('\\', $exception->getModel());
            $path = array_pop($modelClassName);
            $message = 'Not Found';
            $status = Response::HTTP_NOT_FOUND;
        } else if ($exception instanceof ValidationException) {
            $status = Response::HTTP_BAD_REQUEST;
            $message = $exception->errors();
        } else {
            $status = $exception instanceof HttpExceptionInterface ? $exception->getStatusCode()
                                                                        : Response::HTTP_INTERNAL_SERVER_ERROR;
            $message = App::environment(['local', 'dev']) ? $exception->getMessage() : Handler::DEFAULT_ERROR_MESSAGE;
        }

        return response()->json(ErrorMessageListBuilder::build($message, $path), $status);
    }
}
