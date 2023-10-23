import { useEffect, useState } from 'react'
import useUserStore from '../stores/user'
import useTestStore, { QuestionType, TestHistoryType, TestType } from '../stores/test'
import { useParams } from 'react-router-dom'
import { Fetch, promiseFunction } from '../lib/helper'
import Prism from "prismjs";
import "prismjs/themes/prism.min.css";

const AnswerTestPage = () => {
  const { code, id }: any  = useParams()

  const [loading, setLoading] = useState(true)
  const { findHistory } = useTestStore()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [answers, setAnswers] = useState<{
    questionId: number;
    answer: string | null;
    correct: boolean;
  }[]>([])

  const [test, setTest] = useState<TestType | null>(null)
  const [history, setHistory] = useState<TestHistoryType | null>(null)
  const { user } = useUserStore()

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (typeof window === "undefined" ) return
    await promiseFunction({
      successTitle: 'Đã sao chép',
      callback: async () => {
        navigator.clipboard.writeText(window.location.href)
      }
    })
  }

  useEffect(() => {
    const load = async () => {
      if (!code || !id) return
      const { test, history } = await findHistory(code, id)
      setTest(test)
      setHistory(history)

      if (history) {
        const { questions } = await Fetch(`/api/test-history/${history.id}/questions`).catch(e => ({ questions: [] }))
        const answers = JSON.parse(history.answers)

        setQuestions(questions)
        setAnswers(answers)
      }

      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <p className="text-center p-2">Đang tải...</p>
  )

  if (!test || !history || !user) return (
    <p className="text-center p-2">Không tải được</p>
  )

  return (
    <div className='flex space-x-4'>
      <div className="flex-none w-96">
        <div className="rounded-lg bg-white shadow sticky top-0">
          <p className="text-xl font-semibold p-3 border-b">Điểm: &nbsp;&nbsp;&nbsp;{history.point}/10</p>
          <div className="p-3">
            <div className="rounded border">
              <p className="p-2 bg-gray-200">Thông tin chi tiết</p>
              <div className="px-2 py-3 flex flex-col space-y-2">
                <p>Trắc nghiệm: {history.correct} ({answers.filter(v => v.answer).length}/{history.correct + history.wrong} câu)</p>
                <a href="#" className="text-blue-600" onClick={copy}>copy link gửi giáo viên</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <div className="sticky -top-4 rounded-lg bg-white p-3 shadow text-center font-semibold">
          {test.title}
        </div>

        <div className="rounded-lg bg-white p-3 shadow mt-4">
          <RenderQuestion answers={answers} questions={questions} />
        </div>
      </div>
    </div>
  )
}

const RenderQuestion = ({ answers, questions }: {
  answers: {
    questionId: number;
    answer: string | null;
    correct: boolean;
  }[],
  questions: QuestionType[]
}) => {

  useEffect(() => {
    Prism.highlightAll()
  })

  return (
    <div className="flex flex-col space-y-4">
    { answers.map((v,i) => {
      const question = questions.find(v2 => v2.id == v.questionId)

      if (!question) return (
        <div key={i} className='w-full rounded-md bg-white shadow'>
          <div className='p-4'>
          <span className="font-semibold">Câu {i+1}. </span>
            <div className='content mt-2'>Câu hỏi không còn tồn tại</div>
          </div>
        </div>
      )

      return <div key={i} className='w-full rounded-md bg-white shadow'>
        <div className='p-4'>
          <span className="font-semibold">Câu {i+1}. </span>
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
        
        <div className="px-4 py-1.5 rounded-b-md flex items-center justify-end space-x-2">
          <span className={`font-semibold mr-4 text-lg
            ${v.answer == null ? '' : v.correct ? 'text-green-600' : 'text-red-600'}
          `}>
            {v.answer == null ? '' : v.correct ? 'Đúng' : 'Sai'}
          </span>
          <p className={`p-2 px-4 ${v.answer == 'a' ? 'rounded bg-yellow-600 text-white' : ''}`}
          >
            <span className="font-semibold">A</span>
          </p>
          <p className={`p-2 px-4 ${v.answer == 'b' ? 'rounded bg-yellow-600 text-white' : ''}`}
          >
            <span className="font-semibold">B</span>
          </p>
          <p className={`p-2 px-4 ${v.answer == 'c' ? 'rounded bg-yellow-600 text-white' : ''}`}
          >
            <span className="font-semibold">C</span>
          </p>
          <p className={`p-2 px-4 ${v.answer == 'd' ? 'rounded bg-yellow-600 text-white' : ''}`}
          >
            <span className="font-semibold">D</span>
          </p>
        </div>
      </div>
      })}
  </div>
  )
}

export default AnswerTestPage