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
            'status' => Response::HTTP_OK,
            'users' => User::all()
        ]);
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
            'status' => Response::HTTP_OK,
            'message' => 'The user has been registered successfully!'
        ]);
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
                'status' => Response::HTTP_OK,
                'message' => 'You have logged in successfully!'
            ]);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'You have logged out successfully!'
        ]);
    }

    public function getCurrentUser(Request $request)
    {
        dd(Auth::user()->toArray());
    }
}
