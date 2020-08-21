<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
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
        // Make some unexpected exceptions more readable for the front end.
        if ($exception instanceof ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'error' => 'Entry for ' . str_replace('App\\Models\\', '', $exception->getModel()) . ' not found',
                'msg' => $exception->getMessage()
            ], 404);
        }

        if ($exception instanceof QueryException) {
            return response()->json([
                'success' => false,
                'msg' => $exception->getMessage(),
                'error' => 'Caused a queryException'
            ], 500);
        }

        return parent::render($request, $exception);
    }
}
