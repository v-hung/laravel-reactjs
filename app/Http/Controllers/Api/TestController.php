<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Test;
use App\Models\TestHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
    $test = Test::where('code', $code)->with('testHistories', function ($q) {
      return $q->orderBy('created_at', 'desc');
    })->first();

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

    $saveAnswers = [];

    foreach($answers as $answer) {
      $question = $this->findObjectById($questions, $answer['questionId']);

      $saveTemp = [
        "questionId" => $question->id,
        "answer" => $answer['value'] ?? null,
        "correct" => false
      ];

      if ($question != null && $answer['value'] == $question->answer) {
        $correct += 1;
        $saveTemp['correct'] = true;
      }
      else {
        $wrong += 1;
      }

      $saveAnswers[] = $saveTemp;
    }

    $test->number = $test->number + 1;
    $test->save();

    $testHistory = TestHistory::create([
      'user_id' => Auth::guard('api')->user()->id,
      'test_id' => $test->id,
      'correct' => $correct,
      'wrong'   => $wrong,
      'time'    => $time,
      'answers' => json_encode($saveAnswers),
      'point'   => round($correct / ($correct + $wrong) * 40) / 4
    ]);

    return response()->json([
      'testHistory' => $testHistory
    ], 200);
  }

  function findObjectById($array, $id){
    foreach ( $array as $element ) {
      if ( $id == $element->id ) {
        return $element;
      }
    }

    return null;
  }

  function questionsOfTestHistory(Request $request, $id) {
    $testHistory = TestHistory::find($id);

    if ($testHistory == null) return response()->json(["message" => "Test history not found"], 400);

    $answers = json_decode($testHistory->answers);
    
    $idArray = array_map(function($item) {
      return $item->questionId;
    }, $answers);
  
    $questions = Question::where('test_id', $testHistory->test_id)
      ->orderByRaw(DB::raw("FIELD(id, " . implode(',', $idArray) . ")"))
      ->whereIn('id', $idArray)->get();

    return response()->json([
      'questions' => $questions
    ], 200);
  }
}
