import React, { useEffect, useState } from 'react'
import MathContent from "./MathContent";
import InlineMath from './InlineMath';
import { AnswerType, QuestionType } from '../../stores/test';

const Question = ({ 
  question, index, answer, setAnswer
} : { 
  question: QuestionType, index: number,
  answer: AnswerType, setAnswer: (answer: AnswerType) => void
}) => {
  const handelSelectAnswer = (value : 'a' | 'b' | 'c' | 'd') => {
    setAnswer({ questionId: answer.questionId, value: value })
  }

  return (
    <div id={`question-${question.id}`} className='w-full rounded-md bg-white shadow'>
      <div className='p-4'>
        <span className="font-semibold">Câu {index}. </span>
        <div className='content mt-2' dangerouslySetInnerHTML={{ __html: question.content }}></div>
      </div>

      <div className="flex flex-wrap -mx-2 p-4">
        <div className="w-1/2 sm:w-1/4 px-2 mb-4">
          <span className="font-semibold">A. </span>
          <span className='break-words'>{question.a}</span>
        </div>
        <div className="w-1/2 sm:w-1/4 px-2 mb-4">
          <span className="font-semibold">B. </span>
          <span className='break-words'>{question.b}</span>
        </div>
        <div className="w-1/2 sm:w-1/4 px-2 mb-4">
          <span className="font-semibold">C. </span>
          <span className='break-words'>{question.c}</span>
        </div>
        <div className="w-1/2 sm:w-1/4 px-2 mb-4">
          <span className="font-semibold">D. </span>
          <span className='break-words'>{question.d}</span>
        </div>
      </div>
      
      <div className="px-4 py-1.5 bg-blue-600 rounded-b-md text-white flex items-center space-x-2">
        <span className='font-semibold mr-2 text-sm'>Đáp án của bạn:</span>
        <p className={`inline-flex w-8 h-8 rounded-full bg-white text-gray-800 hover:bg-blue-200 cursor-pointer items-center justify-center
          ${answer.value == 'a' ? '!bg-orange-600 !text-white' : ''}
          `}
          onClick={() => handelSelectAnswer('a')}
        >
          <span className="font-semibold">A</span>
        </p>
        <p className={`inline-flex w-8 h-8 rounded-full bg-white text-gray-800 hover:bg-blue-200 cursor-pointer items-center justify-center
          ${answer.value == 'b' ? '!bg-orange-600 !text-white' : ''}
          `}
          onClick={() => handelSelectAnswer('b')}
        >
          <span className="font-semibold">B</span>
        </p>
        <p className={`inline-flex w-8 h-8 rounded-full bg-white text-gray-800 hover:bg-blue-200 cursor-pointer items-center justify-center
          ${answer.value == 'c' ? '!bg-orange-600 !text-white' : ''}
          `}
          onClick={() => handelSelectAnswer('c')}
        >
          <span className="font-semibold">C</span>
        </p>
        <p className={`inline-flex w-8 h-8 rounded-full bg-white text-gray-800 hover:bg-blue-200 cursor-pointer items-center justify-center
          ${answer.value == 'd' ? '!bg-orange-600 !text-white' : ''}
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