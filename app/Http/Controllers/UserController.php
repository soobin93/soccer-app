<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\{
    Auth,
    Hash
};

use Illuminate\Http\{
    Request,
    Response
};

use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'users' => User::all()
        ], Response::HTTP_OK);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed']
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'The user has been registered successfully!'
        ], Response::HTTP_OK);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json([
                'user' => Auth::user(),
                'message' => 'You have logged in successfully!'
            ], Response::HTTP_OK);
        }

        return response()->json([
            'errors' => [
                'email' => 'Given credentials do not match with our records'
            ]
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'You have logged out successfully!'
        ], Response::HTTP_OK);
    }

    public function getCurrentUser(Request $request)
    {
        return response()->json([
            'user' => Auth::user()
        ], Response::HTTP_OK);
    }
}
