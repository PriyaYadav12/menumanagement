<?php
namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; // Ensure this is included
use Illuminate\Support\Facades\Log;

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
    //delete Items
    public function deleteItem($id)
    {
        Log::info("Attempting to delete item with ID: {$id}");
        // Find the item with the requested ID
        $item = Menu::find($id);

        // If the item does not exist, return an error response
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        // Call the recursive delete function
        $this->deleteNestedItems($id);

        return response()->json(['message' => 'Item and its children deleted successfully']);
    }

    private function deleteNestedItems($id)
    {
        // Find all child items
        $children = Menu::where('parent_id', $id)->get();

        // Loop through each child and delete recursively
        foreach ($children as $child) {
            $this->deleteNestedItems($child->id);
        }

        // Finally, delete the item itself
        Menu::destroy($id);
    }
    public function updateItem(Request $request, $id)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255', // Adjust validation rules as necessary
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422); // Return validation errors
        }

        // Find the menu item by ID
        $menuItem = Menu::find($id);

        if (!$menuItem) {
            return response()->json(['message' => 'Menu item not found'], 404); // Item not found
        }

        // Update the item name
        $menuItem->name = $request->name;
        $menuItem->save(); // Save the changes

        return response()->json(['message' => 'Menu item updated successfully', 'item' => $menuItem], 200);
    }
}
