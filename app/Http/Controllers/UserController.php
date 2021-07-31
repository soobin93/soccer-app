<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\{Auth, Hash, Storage};

use Illuminate\Http\{
    Request,
    Response
};

use Illuminate\Validation\Rule;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'users' => User::all()
        ], Response::HTTP_OK);
    }

    public function view(User $user)
    {
        return response()->json([
            'user' => $user
        ], Response::HTTP_OK);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'admin' => ['required', 'boolean']
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'admin' => $request->admin
        ]);

        return response()->json([
            'message' => 'The user has been registered successfully!'
        ], Response::HTTP_OK);
    }

    public function update(User $user, Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'admin' => ['required', 'string', Rule::in(['true', 'false'])],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'avatar' => ['nullable', 'image']
        ]);

        $user->update([
            'name' => $request->name,
            'admin' => ($request->admin === 'true')
        ]);

        if ($request->password) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        if ($request->hasFile('avatar')) {

            // Delete existing file
            if ($user->avatar) {
                Storage::delete('/public/avatars/' . $user->avatar);
            }

            $avatar = $request->file('avatar');
            $filename = $user->id . '.' . $avatar->getClientOriginalExtension();

            $request->file('avatar')->storeAs(
                'public/avatars', $filename
            );

            $user->update([
                'avatar' => $filename
            ]);

            $user = Auth::user();
        }

        return response()->json([
            'message' => 'The user has been updated successfully!',
            'user' => $user
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
