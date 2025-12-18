<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateResumeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('update', $this->route('resume'));
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'template_id' => 'nullable|integer|exists:templates,id',
            'personal_info' => 'nullable|array',
            'personal_info.full_name' => 'nullable|string|max:255',
            'personal_info.email' => 'nullable|email|max:255',
            'personal_info.phone' => 'nullable|string|max:50',
            'personal_info.address' => 'nullable|string|max:500',
            'personal_info.summary' => 'nullable|string|max:2000',
            'personal_info.photo' => 'nullable|string|max:5000',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Please provide a title for your resume.',
            'title.max' => 'The title cannot exceed 255 characters.',
            'template_id.exists' => 'The selected template does not exist.',
            'personal_info.email.email' => 'Please provide a valid email address.',
        ];
    }
}
