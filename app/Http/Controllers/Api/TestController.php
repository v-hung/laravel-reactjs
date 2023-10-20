<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Test;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function listTest() {
        $tests = Test::get();

        return response()->json([
            'tests' => $tests
        ], 200);
    }

    public function testDetails($code) {
        $test = Test::where('code', $code)->first();

        return response()->json([
            'test' => $test
        ], 200);
    }

    public function testDetailsWidthQuestion($code) {
        $test = Test::where('code', $code)->first();
        $questions = [];

        if ($test) {
            $questions = Question::where('test_id', $test->id)->inRandomOrder()->limit($test->question_number)->get();
        }

        return response()->json([
            'test' => $test,
            'questions' => $questions
        ], 200);
    }
}
