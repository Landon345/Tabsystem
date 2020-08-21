<?php

namespace App\Http\Controllers;

use App\models\Common_Item;
use App\models\Category;
use Exception;
use Illuminate\Http\Request;

class CommonItemController extends Controller
{
    public function index(Request $request)
    {
        $category_id = "";
        $name = "";
        $price = "";
        $common_items = Common_Item::where('name', 'like', '%%');


        if ($request->has('name')) {
            $name = $request->input('name');
            $common_items = $common_items->where('name', 'like', '%' . $name . '%');
        }
        if ($request->has('category_id')) {
            $category_id = $request->input('category_id');
            $common_items = $common_items->where('category_id', $category_id + 0);
        }
        if ($request->has('price')) {
            $price = $request->input('price');
            $common_items = $common_items->where('price', '>', $price + 0);
        }



        return response()->json($common_items->get()->all());
    }

    public function show($id)
    {
        try {
            return Common_Item::findOrFail($id);
        } catch (Exception $e) {
            return response()->json(['msg' => $e->getMessage()]);
        }
    }

    public function storeCommonItem(Request $request)
    {
        try {

            $item = $request->isMethod('put') ? Common_Item::where('id', $request->input('id'))
                ->firstorfail() : new Common_Item;
            $item->category_id = $request->category_id;
            $item->name = $request->name;
            $item->price = $request->price;
            if ($item->save()) {
                return response()->json([
                    "data" => ['item' => $item],
                    "success" => true
                ], 201);
            } else {
                return $this->somethingWentWrong();
            }
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => "make sure you have a name and price"], 505);
        }
    }

    public function destroy($id)
    {
        try {
            $commonitem = Common_Item::findOrFail($id);
            $commonitem->delete();
            return response()->json([
                "data" => ['commonitem_deleted' => $commonitem],
                "success" => true
            ], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => $e->getMessage()]);
        }
    }
}
