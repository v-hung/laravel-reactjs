import React, { useEffect, useRef, useState } from 'react'
import TestHeader from '../components/test/TestHeader'
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import ResizeObserver from 'resize-observer-polyfill';
import Question from "../components/test/Question";
import { motion } from "framer-motion";

const TestPage = () => {
  const [questions, setQuestions] = useState([
    ...new Array(34).fill({ 
      title: `Cho hàm số $f(x)$ có đạo hàm $f'(x) = x + 1$ với mọi $x \\in \\mathbb{N}$. Hàm số đã cho nghịch biến trên khoảng nào dưới đây?`,
      a: '$(-\\infty; 1)$',
      b: '$(1;+\\infty)$',
      c: '$(-\\infty; -1)$',
      d: '$(-\\infty; 1)$'
    })
  ])

  const simpleBarEl = useRef<HTMLDivElement>(null)
  const simpleBar = useRef<SimpleBar>()
  const [isScroll, setIsScroll] = useState(false)

  const onScroll = (e: Event) => {
    const scrollY = (e.target as HTMLElement)?.scrollTop || 0
    setIsScroll(scrollY >= 40)
  }

  useEffect(() => {
    if (!simpleBarEl.current) return

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.ResizeObserver = ResizeObserver;

    simpleBar.current = new SimpleBar(simpleBarEl.current)

    simpleBar.current.getScrollElement()?.addEventListener('scroll', onScroll);

    return () => {
      SimpleBar.removeObserver()
    }
  }, [])

  return (
    <div ref={simpleBarEl} className='relative w-full h-full bg-slate-100 overflow-y-auto overflow-x-hidden'>
      <div className="flex flex-col">
        <TestHeader className={`sticky top-0 z-10 ${isScroll ? 'bg-white' : ''}`} />
        <div className="flex px-4 py-8 space-x-4 items-start mt-2">
          <motion.div className="flex-grow min-w-0 flex flex-col space-y-6"
            initial={{ x: -50, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {questions.map((v,i) =>
              <Question key={i} question={v} index={i + 1} />
            )}
          </motion.div>

          <motion.div className="sticky top-[96px] w-96 p-4 rounded bg-white"
            initial={{ y: 50, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="font-semibold">Danh sách các câu hỏi</p>
            <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))' }}>
              {questions.map((v,i) =>
                <div key={i} className={`p-1 rounded border border-gray-400 text-center cursor-pointer hover:!bg-blue-600 hover:!text-white hover:!border-blue-600 ${i == 10 ? '!bg-orange-600 !text-white !border-orange-600' : ''}`}>{i+1}</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TestPage