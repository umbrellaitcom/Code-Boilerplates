<?php


namespace App\Providers;

use App\System\Error\ErrorMessageList;
use App\System\Error\ErrorMessageListBuilder;
use Illuminate\Http\Response;
use Illuminate\Support\ServiceProvider;
use Illuminate\Routing\ResponseFactory;

class ResponseServiceProvider extends ServiceProvider
{
    /**
     * Register the application's response macros.
     *
     * @param ResponseFactory $factory
     * @return void
     */
    public function boot(ResponseFactory $factory)
    {
        $factory->macro('success', function (
            $data = null,
            $status = Response::HTTP_OK,
            array $headers = []
        ) use ($factory) {
            return $factory->make($data, $status, $headers);
        });

        $factory->macro('error', function (
            $errors = null,
            $status = Response::HTTP_INTERNAL_SERVER_ERROR,
            array $headers = []
        ) use ($factory) {
            $format = ($errors != null && !$errors instanceof ErrorMessageList) ?
                ErrorMessageListBuilder::build($errors) : $errors;

            return $factory->make($format, $status, $headers);
        });
    }
}
