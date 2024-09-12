<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    /**
     * Handle user registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // Validar os dados recebidos
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        // Se a validação falhar, retorne erros
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Criar o usuário
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        // Gerar um token de autenticação para o usuário
        $token = $user->createToken('Personal Access Token')->plainTextToken;

        // Retornar a resposta com dados do usuário e token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
}
