<?php

namespace App\Http\Requests;

use App\Models\User;
use Hash;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user')->id;
        $userToUpdate = User::findOrFail($userId);

        return [
            'name' => ['string', 'max:255', 'required'],
            'email' => ['string', 'email', 'max:255', 'required'],
            'password' => ['string', 'min:8', 'required', 'confirmed'],
            'current_password' => [ 'required', 
                function ($attribute, $value, $fail) use ($userToUpdate) {
                    if (!Hash::check($value, $userToUpdate->password)) {
                        $fail('The current password is incorrect.');
                    }
                }
            ],
        ];
    }
}
