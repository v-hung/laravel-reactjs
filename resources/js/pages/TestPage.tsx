import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import TestHeader from '../components/test/TestHeader'
import Question from "../components/test/Question";
import { motion } from "framer-motion";
import CustomBar from "../components/CustomBar";
import { Skeleton } from '@mui/material';
import useTestStore, { AnswerType, QuestionType, TestType } from '../stores/test';
import { useParams } from 'react-router-dom';
import { Global, css } from '@emotion/react'
import SimpleBar from 'simplebar';

const TestPage = () => {
  const [test, setTest] = useState<TestType | null>(null)
  const [questions, setQuestions] = useState<QuestionType[]>([])

  const [isScroll, setIsScroll] = useState(false)
  const barEl = useRef<SimpleBar>(null)
  
  const onScroll = (e: Event) => {
    const scrollY = (e.target as HTMLElement)?.scrollTop || 0
    setIsScroll(scrollY >= 40)
  }

  const scrollTo = (e: MouseEvent, id: number) => {
    e.preventDefault()

    var targetElement = document.getElementById(`question-${id}`)
    var offset = 76

    if (targetElement && barEl.current) {
      var offsetTop = targetElement.offsetTop - offset;
      barEl.current.getScrollElement()?.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const [loading, setLoading] = useState(true)
  const { code } = useParams()
  const { findQuestion } = useTestStore()

  useEffect(() => {
    const load = async () => {
      const { test, questions } = await findQuestion(code || '')
      setTest(test)
      setQuestions(questions)
      setAnswers(questions.map(v => ({ questionId: v.id, value: null })))

      setLoading(false)
    }

    load()
  }, [])

  const [answers, setAnswers] = useState<AnswerType[]>([])

  const handelSetAnswer = (answer: AnswerType) => {
    setAnswers(state => state.map(v => ({ ...v, value: v.questionId == answer.questionId ? answer.value : v.value })))
  }

  const findAnswer = (id: number) => answers.find(v => v.questionId == id)

  return (
    <>
      { loading
        ? <TestLoading />
        : test == null ? <p className='text-center'>Không tìm thấy đề</p>
        : <CustomBar ref={barEl} className='relative w-full h-full bg-slate-100' onScroll={onScroll}>
          <div className="flex flex-col">
            <TestHeader className={`sticky top-0 z-10 ${isScroll ? 'bg-white' : ''}`} />
            <div className="flex px-4 py-8 space-x-4 items-start mt-2">
              <motion.div className="flex-grow min-w-0 flex flex-col space-y-6"
                initial={{ x: -50, opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                { questions.map((v,i) => {
                  const answer = findAnswer(v.id)

                  if (answer)
                    return <Question key={i} question={v} answer={answer} setAnswer={handelSetAnswer} index={i + 1} />
                })}
              </motion.div>
              <motion.div className="hidden md:block sticky top-[96px] w-96 p-4 rounded bg-white"
                initial={{ y: 50, opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <p className="font-semibold">Danh sách các câu hỏi</p>
                <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))' }}>
                  {questions.map((v,i) =>
                    <div key={i} onClick={(e) => scrollTo(e, v.id)} className={`p-1 rounded border border-gray-400 text-center cursor-pointer hover:!bg-blue-600 hover:!text-white hover:!border-blue-600 ${findAnswer(v.id)?.value ? '!bg-orange-600 !text-white !border-orange-600' : ''}`}>{i+1}</div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </CustomBar>
      }
    </>
  )
}

const TestLoading = () => {
  return (
    <div className='w-full h-full bg-slate-100 flex flex-col overflow-hidden'>
      <div className="h-14 border-b flex space-x-4 items-center justify-between p-4">
        <Skeleton variant='rounded' width={100} height={30} />
        <Skeleton variant='rounded' width={200} height={25} />
        <Skeleton variant='rounded' width={100} height={30} />
      </div>

      <div className="flex px-4 py-8 space-x-4 items-start mt-2">
        <div className="flex-grow min-w-0 flex flex-col space-y-6">
          { new Array(6).fill(0).map((v,i) =>
            <div key={i} className='w-full rounded-md bg-white shadow'>
              <div className="p-4">
                <Skeleton variant='rounded' width={500} height={20} />
              </div>

              <div className="flex flex-wrap -mx-2 p-4">
                <div className="w-1/2 sm:w-1/4 px-2 mb-4">
                  <Skeleton variant='rounded' width={100} height={30} />
                </div>
                <div className="w-1/2 sm:w-1/4 px-2 mb-4">
                  <Skeleton variant='rounded' width={100} height={30} />
                </div>
                <div className="w-1/2 sm:w-1/4 px-2 mb-4">
                  <Skeleton variant='rounded' width={100} height={30} />
                </div>
                <div className="w-1/2 sm:w-1/4 px-2 mb-4">
                  <Skeleton variant='rounded' width={100} height={30} />
                </div>
              </div>
              
              <div className="rounded-b-md">
                <Skeleton variant='rectangular' width={'100%'} height={40} />
              </div>
            </div>
          )}
        </div>

        <div className="sticky top-[96px] w-96 p-4 rounded bg-white">
          <Skeleton variant='rounded' width={200} height={20} />

          <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))' }}>
            {new Array(30).fill(0).map((v,i) =>
              <Skeleton key={i} variant='rounded' width={'100%'} height={40} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestPage