import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'
import { Fetch } from "../lib/helper"

type State = {
  isLoad: boolean,
  tests: TestType[]
}

type Actions = {
  findTest: (code: string) => Promise<TestType | null>,
  findQuestion: (code: string) => Promise<{test: TestType | null, questions: QuestionType[]}>,
}

type Dispatch = {
  dispatch: (action: ((state: State) => Partial<State>) | Partial<State>) => void
}

const useTestStore = create<State & Actions & Dispatch>((set, get) => ({
  isLoad: false,
  tests: [],
  findTest: async (code) => {
    let test = get().tests.find(v => v.code == code) || null

    if (!test) {
      test = (await Fetch(`/api/tests/${code}`).catch(e => ({ test: null }))).test
      if (test) {
        set(({ tests: [...get().tests, test] }))
      }
    }

    return test
  },
  findQuestion: async (code) => {
    const test = await get().findTest(code)

    if (!test) return {
      test: null,
      questions: []
    }

    let questions = test.questions || []
    if (questions.length == 0) {
      questions = (await Fetch(`/api/tests/${code}/questions`).catch(e => ({ questions: [] }))).questions
      set(state => ({ tests: state.tests.map(v => ({
        ...v,
        questions: test.id == v.id ? questions : v.questions
      })) }))
    }

    return { test, questions }
  },

  dispatch: (action) => set((state) => typeof action === "function" ? action(state) : action),
}))

export default useTestStore

export type TestType = {
  id: number,
  subject_id: number,
  title: string,
  code: string,
  description: string | null,
  time: number,
  number: number,
  question_number: number,
  questions?: QuestionType[] | null,
  created_at: Date,
  updated_at: Date
}

export type QuestionType = {
  id: number,
  content: string,
  a: string,
  b: string,
  c: string,
  d: string,
  type: 'abcd',
  created_at: Date,
  updated_at: Date
}

export type AnswerType = { questionId: number, value: 'a' | 'b' | 'c' | 'd' | null }