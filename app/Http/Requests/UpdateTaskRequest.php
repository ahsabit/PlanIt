<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
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
        return [
            'image' => ['nullable','image'],
            'name' => ['required','max:255'],
            'status' => ['required', Rule::in(['pending', 'in_progress', 'completed'])],
            'description' => ['string', 'nullable'],
            'due_date' => ['date', 'required', 'after_or_equal:today'],
            'priority' => ['required', Rule::in(['low', 'medium', 'high'])],
            'assigned_user_id' => ['required', 'numeric', 'exists:users,id'],
            'project_id' => ['required', 'numeric', 'exists:projects,id'],
            'is_project' => ['required', 'boolean']
        ];
    }
}
