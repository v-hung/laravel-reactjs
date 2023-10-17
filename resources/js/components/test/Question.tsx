import React, { useState } from 'react'
import MathContent from "./MathContent";
import InlineMath from './InlineMath';

const Question = ({question, index}: any) => {
  const [answer, setAnswer] = useState<'a' | 'b' | 'c' | 'd' | null>(null)

  const handelSelectAnswer = (answer : 'a' | 'b' | 'c' | 'd') => {
    setAnswer(answer)
  }

  return (
    <div id='' className='w-full rounded-md bg-white shadow'>
      <p className='p-4'>
        <span className="font-semibold">Câu {index}. </span>
        <MathContent mathString={question.title} />
      </p>

      <div className="flex flex-wrap -mx-2 p-4">
        <div className="w-1/2 sm:w-1/4 px-2 mb-4">
          <span className="font-semibold">A. </span><MathContent mathString={question.a} />
        </div>
        <div className="w-1/2 sm:w-1/4 px-2 mb-4">
          <span className="font-semibold">B. </span><MathContent mathString={question.b} />
        </div>
        <div className="w-1/2 sm:w-1/4 px-2 mb-4">
          <span className="font-semibold">C. </span><MathContent mathString={question.c} />
        </div>
        <div className="w-1/2 sm:w-1/4 px-2 mb-4">
          <span className="font-semibold">D. </span><MathContent mathString={question.d} />
        </div>
      </div>
      
      <div className="px-4 py-1 bg-blue-600 rounded-b-md text-white flex items-center space-x-2">
        <span className='font-semibold mr-2'>Đáp án của bạn:</span>
        <p className={`inline-flex w-10 h-10 rounded-full bg-white text-gray-800 hover:bg-blue-200 cursor-pointer items-center justify-center
          ${answer == 'a' ? '!bg-orange-600 !text-white' : ''}
          `}
          onClick={() => handelSelectAnswer('a')}
        >
          <span className="font-semibold">A</span>
        </p>
        <p className={`inline-flex w-10 h-10 rounded-full bg-white text-gray-800 hover:bg-blue-200 cursor-pointer items-center justify-center
          ${answer == 'b' ? '!bg-orange-600 !text-white' : ''}
          `}
          onClick={() => handelSelectAnswer('b')}
        >
          <span className="font-semibold">B</span>
        </p>
        <p className={`inline-flex w-10 h-10 rounded-full bg-white text-gray-800 hover:bg-blue-200 cursor-pointer items-center justify-center
          ${answer == 'c' ? '!bg-orange-600 !text-white' : ''}
          `}
          onClick={() => handelSelectAnswer('c')}
        >
          <span className="font-semibold">C</span>
        </p>
        <p className={`inline-flex w-10 h-10 rounded-full bg-white text-gray-800 hover:bg-blue-200 cursor-pointer items-center justify-center
          ${answer == 'd' ? '!bg-orange-600 !text-white' : ''}
          `}
          onClick={() => handelSelectAnswer('d')}
        >
          <span className="font-semibold">D</span>
        </p>
      </div>
    </div>
  )
}

export default Question