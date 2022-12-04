<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
       if(Auth::check()){

          // admin = 1, user = 2 
          if(Auth::user()->role == '1'){
              return $next($request);
          }
          else{
            return redirect('/')->with('message','You are not admin');  
          }
       }else{
           return redirect('/')->with('/login','Login to access the website info');  
       }

        return $next($request);
    }
}
