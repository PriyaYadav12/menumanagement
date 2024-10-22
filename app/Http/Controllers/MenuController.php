<?php
namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; // Ensure this is included

class MenuController extends Controller
{
    public function index(): JsonResponse
    {
        $menus = Menu::all(); // Retrieve all menus
        return response()->json($menus); // Return the data as JSON
    }

    public function store(Request $request): JsonResponse
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'depth' => 'required|integer',
            'parentData' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the parent menu item based on parentData
        $parentMenu = Menu::where('name', $request->parentData)->first();
        $parentArr =$parentMenu->toArray();
        $parentId = !empty($parentArr) ? $parentArr['id'] : null; // Get the parent ID or null if not found

        // Create a new menu item
        $menu = new Menu();
        $menu->depth = $request->depth;
        $menu->parent_id = $parentId;
        $menu->name = $request->name;

        // Save the menu item to the database
        if ($menu->save()) {
            return response()->json([
                'message' => 'Menu item saved successfully',
                'menu' => $menu,
            ], 201);
        }

        // Handle the case where save fails
        return response()->json(['message' => 'Failed to save menu item.'], 500);
    }
}
