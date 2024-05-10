import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import TestHeader from '../components/test/TestHeader'
import Question from "../components/test/Question";
import { motion } from "framer-motion";
import CustomBar from "../components/CustomBar";
import { Backdrop, CircularProgress, Skeleton } from '@mui/material';
import useTestStore, { AnswerType, QuestionType, TestType } from '../stores/test';
import { useParams } from 'react-router-dom';
import TestPageLoading from "../components/test/TestPageLoading";
import SimpleBar from 'simplebar';
import Prism from "prismjs";
import "prismjs/themes/prism.min.css";

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

    const [loadingSubmit, setLoadingSubmit] = useState(false)
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
            {loading
                ? <TestPageLoading />
                : test == null ? <p className='text-center'>Không tìm thấy đề</p>
                    : <CustomBar ref={barEl} className='relative w-full h-full bg-slate-100' onScroll={onScroll}>
                        <div className="flex flex-col">
                            <TestHeader
                                className={`sticky top-0 z-10 ${isScroll ? 'bg-white' : ''}`}
                                test={test}
                                answers={answers}
                                numberOfUnansweredQuestions={answers.filter(v => v.value == null).length}
                                loadingSubmit={loadingSubmit}
                                setLoadingSubmit={setLoadingSubmit}
                            />

                            <div className="flex px-4 py-8 space-x-4 items-start mt-2">
                                <RenderQuestions questions={questions} findAnswer={findAnswer} handelSetAnswer={handelSetAnswer} />
                                <motion.div className="hidden md:block sticky top-[96px] w-96 p-4 rounded bg-white"
                                    initial={{ y: 50, opacity: 0.5 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1 }}
                                >
                                    <p className="font-semibold">Danh sách các câu hỏi</p>
                                    <div className="mt-2 grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))' }}>
                                        {questions.map((v, i) =>
                                            <div key={i} onClick={(e) => scrollTo(e, v.id)} className={`p-1 rounded border border-gray-400 text-center cursor-pointer hover:!bg-blue-600 hover:!text-white hover:!border-blue-600 ${findAnswer(v.id)?.value ? '!bg-orange-600 !text-white !border-orange-600' : ''}`}>{i + 1}</div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </CustomBar>
            }

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingSubmit}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

const RenderQuestions = ({
    questions, findAnswer, handelSetAnswer
}: {
    questions: QuestionType[],
    findAnswer: (id: number) => AnswerType | undefined,
    handelSetAnswer: (answer: AnswerType) => void
}) => {

    useEffect(() => {
        Prism.highlightAll()
    }, [])
    return (
        <motion.div className="flex-grow min-w-0 flex flex-col space-y-6"
            initial={{ x: -50, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {questions.map((v, i) => {
                const answer = findAnswer(v.id)

                if (answer)
                    return <Question key={i} question={v} answer={answer} setAnswer={handelSetAnswer} index={i + 1} />
            })}
        </motion.div>
    )
}

export default TestPage