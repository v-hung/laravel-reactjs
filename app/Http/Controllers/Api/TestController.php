<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Test;
use App\Models\TestHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestController extends Controller
{
  public function listTest()
  {
    $tests = Test::get();

    return response()->json([
      'tests' => $tests
    ], 200);
  }

  public function testDetails($code)
  {
    $test = Test::where('code', $code)->with('testHistories')->first();

    return response()->json([
      'test' => $test
    ], 200);
  }

  public function testDetailsWidthQuestion($code)
  {
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

  public function submitTest(Request $request)
  {
    $data = $request->json()->all();
    $code = $data['code'];
    $time = $data['time'];
    $answers = $data['answers'];

    $test = Test::where('code', $code)->first();

    if ($test == null) return response()->json(['message' => 'Test not found'],400);

    $idArray = array_map(function($item) {
      return $item['questionId'];
    }, $answers);
  
    $questions = Question::where('test_id', $test->id)->whereIn('id', $idArray)->get();

    $correct = 0;
    $wrong = 0;

    foreach($questions as $question) {
      $answer = $this->findObjectById($answers, $question->id);

      if ($answer != null && $answer['value'] == $question->answer) {
        $correct += 1;
      }
      else {
        $wrong += 1;
      }
    }

    $test->number = $test->number + 1;
    $test->save();

    $testHistory = TestHistory::create([
      'user_id' => Auth::guard('api')->user()->id,
      'test_id' => $test->id,
      'correct' => $correct,
      'wrong'   => $wrong,
      'time'    => $time,
      'answers' => json_encode($answers),
      'point'   => round($correct / ($correct + $wrong) * 4) / 4
    ]);

    return response()->json([
      'testHistory' => $testHistory
    ], 200);
  }

  function findObjectById($array, $id){
    foreach ( $array as $element ) {
      if ( $id == $element['questionId'] ) {
        return $element;
      }
    }

    return null;
  }
}
