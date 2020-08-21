<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\models\User;
use App\models\Tabs;
use Auth;
use Exception;

class UserController extends Controller
{
    public function index()
    {
        return User::where('admin', '=', 0)->get()->all();
    }

    public function userOfTab($id)
    {
        return Tabs::findOrFail($id)->user;
    }

    public function login(LoginRequest $request)
    {
        $status = 401;
        $response = ['Error' => 'Unauthorized', 'success' => false];
        if (Auth::attempt($request->only('name', 'password'), true)) {
            $token = Str::random(60);
            Auth::user()->api_token = $token;
            Auth::user()->save();
            $status = 200;
            $response = [
                "data" => ['user' => Auth::user(), 'api_token' => Auth::user()->api_token],
                "success" => true
            ];
        }
        return response()->json($response, $status);
    }

    public function register(RegisterRequest $request)
    {
        try {
            $user = new User;
            $user->name = $request->name;
            $user->site_number = $request->site_number;
            $user->password = Hash::make($request->password);
            if ($user->save()) {
                return response()->json([
                    "data" => ['user' => $user],
                    "success" => true
                ], 201);
            } else {
                return response()->json(["success" => false], 505);
            }
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => "make sure you have a name, site_number, and password"], 505);
        }
    }
    public function registeradmin(RegisterRequest $request)
    {
        try {

            $user = new User;
            $user->name = $request->name;
            $user->site_number = null;
            $user->password = Hash::make($request->password);
            $user->api_token = Str::random(60);
            $user->admin = true;
            if ($user->save()) {
                return response()->json([
                    "data" => ['user' => $user],
                    "success" => true
                ], 201);
            } else {
                return response()->json(["success" => false], 505);
            }
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => "make sure you have a name and password"], 505);
        }
    }


    public function logout()
    {
        Auth::user()->api_token = null;
        Auth::user()->remember_token = null;
        Auth::user()->save();
        return response()->json(["success" => true], 205);
    }
}
