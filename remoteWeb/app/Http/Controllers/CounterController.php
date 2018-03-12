<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Counter;

class CounterController extends Controller
{
    public function add()
    {
        $tes = Counter::create([
            'tester' => 4848
        ]);
        if($tes){
            return ['msg'=>'success'];
        }return ['msg'=>'error'];
        
    }

}
