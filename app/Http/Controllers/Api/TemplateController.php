<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    public function index()
    {
        $templates = Template::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'data' => $templates
        ]);
    }
}
