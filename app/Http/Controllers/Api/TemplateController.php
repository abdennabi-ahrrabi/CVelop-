<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TemplateController extends Controller
{
    public function index()
    {
        $templates = Template::where(function ($query) {
            $query->where('is_active', true)
                  ->orWhere('created_by', Auth::id());
        })
        ->orderBy('sort_order')
        ->get();

        return response()->json([
            'data' => $templates
        ]);
    }
}
