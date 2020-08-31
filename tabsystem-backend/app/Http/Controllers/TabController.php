<?php

namespace App\Http\Controllers;

//use App\models\Category;
//use App\models\Common_Item;
use Illuminate\Http\Request;
use App\models\Tabs;
//use App\models\User;
use Auth;
use Exception;

class TabController extends Controller
{
    public function index(Request $request)
    {
        $user_id = "";
        $name = "";
        $balance = "";
        $tabs = Tabs::where('name', 'like', '%%');


        if ($request->has('name')) {
            $name = $request->input('name');
            $tabs = $tabs->where('name', 'like', '%' . $name . '%');
        }
        if ($request->has('user_id')) {
            $user_id = $request->input('user_id');
            $tabs = $tabs->where('user_id', intval($user_id));
        }
        if ($request->has('balance')) {
            $balance = $request->input('balance');
            $tabs = $tabs->where('balance', '>', $balance);
        }
        $tabs = $tabs->get()->all();
        foreach ($tabs as $t) {
            $t->user;
        }

        return response()->json($tabs);
    }

    public function show($id)
    {

        try {
            $tab = Tabs::findOrFail($id);
            $items = $tab->items;
            foreach ($items as $i) {
                $i->category;
            }
            return response()->json(["tab" => $tab]);
        } catch (Exception $e) {
            return response()->json(["msg" => $e->getMessage()]);
        }
    }



    public function storeTab(Request $request)
    {
        try {

            $tab = $request->isMethod('put') ? Tabs::where('id', $request->input('id'))
                ->firstorfail() : new Tabs;
            $tab->user_id = $request->input('user_id');
            $tab->name = $request->input('name');
            $tab->balance = $request->input('balance');
            if ($tab->save()) {
                return response()->json([
                    "data" => ['tab' => $tab],
                    "success" => true
                ], 201);
            } else {
            }
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "msg" => "make sure you have a user_id, name, and balance.
                            Also make sure to send a raw json body",
                "e" => $e->getMessage()
            ], 505);
        }
    }

    public function destroy($id)
    {
        try {
            $tab = Tabs::findOrFail($id);
            $tab->delete();
            return response()->json([
                "data" => ['tab_deleted' => $tab],
                "success" => true
            ], 200);
        } catch (Exception $e) {
            return response()->json(["msg" => $e->getMessage()]);
        }
    }

    public function totalBalances()
    {
        $tabs = Tabs::all();
        $total = 0;
        foreach ($tabs as $t) {
            $total += $t->balance;
        };

        return response()->json(["total" => $total]);
    }
    public function userTabs()
    {
        $tabs = Auth::user()->tabs;

        foreach ($tabs as $t) {
            $t->user;
            $items = $t->items;
            foreach($items as $i){
                $i->category;
            }
        }
        return $tabs;
    }

    public function showUserTab($id)
    {
        try {
            $tab = Auth::user()->tabs->where('id', $id);
            if (count($tab) == 0) {
                throw new Exception(Auth::user()->name . ' doesn\'t own a tab with an id of ' . $id);
            }
            return $tab;
        } catch (Exception $e) {
            return response()->json(["msg" => $e->getMessage()]);
        }
    }
    public function showUserTabItems($id)
    {
        try {
            $tab = Auth::user()->tabs->where('id', $id);
            if (count($tab) == 0) {
                throw new Exception(Auth::user()->name . ' doesn\'t own a tab with an id of ' . $id);
            }
            $items = Tabs::findOrFail($tab[0]->id)->items;
            return $items;
        } catch (Exception $e) {
            return response()->json(["msg" => $e->getMessage()]);
        }
    }
}
