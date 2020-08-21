<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
         if (Auth::user() &&  Auth::user()->admin == 1) {
                return $next($request);
         }
    
        return response()->json(["success" => false, "msg" => "you are not an admin from middleware"], 505);
    }
}
