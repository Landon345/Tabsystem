<?php

namespace App\Http\Controllers;

use App\models\Category;
use App\models\Items;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {

        $name = "";
        $categories = Category::where('name', 'like', '%%');


        if ($request->has('name')) {
            $name = $request->input('name');
            $categories = $categories->where('name', 'like', '%' . $name . '%');
        }

        return response()->json($categories->get()->all());
        //return $categories->get()->all();
    }

    public function show($id)
    {
        try {
            return Category::findOrFail($id);
        } catch (Exception $e) {
            return response()->json(['msg' => $e->getMessage()]);
        }
    }

    public function storeCategory(Request $request)
    {
        try {
            $category = $request->isMethod('put') ? Category::where('id', $request->input('id'))
                ->firstorfail() : new Category;
            $category->name = $request->name;
            if ($category->save()) {
                return response()->json([
                    "data" => ['category' => $category],
                    "success" => true
                ], 201);
            } else {
                return $this->somethingWentWrong();
            }
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => "make sure you have a name."], 505);
        }
    }

    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();
            return response()->json([
                "data" => ['category_deleted' => $category],
                "success" => true
            ], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => $e->getMessage()]);
        }
    }
    public function totalPriceOfCategory($id){

    $items = "";
        if($id == 0){
            $items = Items::all();
        }else{
            $items = Items::where('category_id', $id)->get();
        }

        $total = 0;
        foreach ($items as $i) {
            $total += $i->price;
        }
        return response()->json(["total" => $total]);
    }
}
