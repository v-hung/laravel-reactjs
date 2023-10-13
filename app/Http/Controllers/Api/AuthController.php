<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {

  public function login(Request $request)
  {
    $credentials = request(['email', 'password']);
    
    if (!Auth::attempt($credentials)) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }

    $user = User::find(Auth::user()->id);
    $tokenResult = $user->createToken(config('passport.token_name'));
    $token = $tokenResult->token;

    if (request('remember_me')) {
      $token->expires_at = now()->addWeeks(1);
    }

    $token->save();

    return response()->json([
      'access_token' => $tokenResult->accessToken,
      'token_type' => 'Bearer',
      'expires_at' => $token->expires_at->toDateTimeString(),
      'user' => $user
    ]);
  }

  public function register(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'name' => 'required',
      'email' => 'required|email',
      'password' => 'required',
      'c_password' => 'required|same:password',
    ]);

    if($validator->fails()){
      return $this->sendError('Validation Error.', $validator->errors());       
    }
    $input = $request->all();
    $input['password'] = bcrypt($input['password']);
    $user = User::create($input);
    $tokenResult = $user->createToken(config('passport.token_name'));

    return response()->json([
      'access_token' => $tokenResult->accessToken,
      'token_type' => 'Bearer',
      'expires_at' => $tokenResult->token->expires_at->toDateTimeString(),
      'user' => $user
    ]);
  }

  public function logout(Request $request)
  {
    if (Auth::user()) {
      $request->user()->token()->revoke();

      return response()->json([
        'success' => true,
        'message' => 'Logged out successfully',
      ], 200);
    }
  }
}