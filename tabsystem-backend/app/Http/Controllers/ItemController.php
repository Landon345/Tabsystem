<?php

namespace App\Http\Controllers;

use App\models\Items;
use App\models\Tabs;
use Exception;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $category_id = "";
        $tab_id = "";
        $name = "";
        $price = "";
        $common_items = Items::where('name', 'like', '%%');


        if ($request->has('name')) {
            $name = $request->input('name');
            $common_items = $common_items->where('name', 'like', '%' . $name . '%');
        }
        if ($request->has('category_id')) {
            $category_id = $request->input('category_id');
            if ($category_id + 0 !== 0) {
                $common_items = $common_items->where('category_id', $category_id + 0);
            }
        }
        if ($request->has('tab_id')) {
            $tab_id = $request->input('tab_id');
            $common_items = $common_items->where('tab_id', $tab_id + 0);
        }
        if ($request->has('price')) {
            $price = $request->input('price');
            $common_items = $common_items->where('price', '>', $price + 0);
        }
        $common_items = $common_items->get()->all();
        foreach ($common_items as $c) {
            $c->category;
        }
        return response()->json($common_items);
    }

    public function show($id)
    {
        try {
            Items::findOrFail($id);
        } catch (Exception $e) {
            return response()->json(['msg' => $e->getMessage()]);
        }
    }

    public function storeItem(Request $request)
    {
        try {


            $item = $request->isMethod('put') ? Items::where('id', $request->input('id'))
                ->firstorfail() : new Items;
            $tab = Tabs::where('id', $request->tab_id)->firstorfail();
            $tab->balance = $tab->balance - $request->price;


            $item->tab_id = $request->tab_id;
            $item->category_id = $request->category_id;
            $item->name = $request->name;
            $item->price = $request->price;


            if ($item->save() and $tab->save()) {
                return response()->json([
                    "data" => ['item' => $item, 'tab' => $tab],
                    "success" => true
                ], 201);
            } else {
                return $this->somethingWentWrong();
            }
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => "make sure you have a tab_id, name, category_id, and price"], 505);
        }
    }

    public function destroy($id)
    {
        try {
            $item = Items::findOrFail($id);
            $item->delete();
            return response()->json([
                "data" => ['item_deleted' => $item],
                "success" => true
            ], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => $e->getMessage()]);
        }
    }

    public function destroyRefund($id)
    {
        try {
            $item = Items::findOrFail($id);
            $tab = Tabs::findOrFail($item->tab_id);

            $tab->balance = $tab->balance + $item->price;
            $item->delete();

            if ($tab->save()) {
                return response()->json([
                    "data" => ['item_deleted' => $item, 'tab' => $tab],
                    "success" => true
                ], 200);
            }
        } catch (Exception $e) {
            return response()->json(["msg" => $e->getMessage()]);
        }
    }
    public function totalPrices()
    {
        $items = Items::all();
        $total = 0;
        foreach ($items as $i) {
            $total += $i->price;
        }
        return response()->json(["total" => $total]);
    }

   
}
