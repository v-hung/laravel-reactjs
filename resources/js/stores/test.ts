import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'
import { Fetch } from "../lib/helper"

type State = {
  isLoad: boolean,
  tests: TestType[]
}

type Actions = {
  loadTests: () => Promise<void>,
  findTest: (code: string) => Promise<TestType | null>,
  findQuestion: (code: string) => Promise<{test: TestType | null, questions: QuestionType[]}>,
  findHistory: (code: string, id: number) => Promise<{test: TestType | null, history:TestHistoryType | null}>,
  addTestHistory: (code: string, history: TestHistoryType) => Promise<void>
}

type Dispatch = {
  dispatch: (action: ((state: State) => Partial<State>) | Partial<State>) => void
}

const useTestStore = create<State & Actions & Dispatch>((set, get) => ({
  isLoad: false,
  tests: [],
  loadTests: async () => {
    const { tests }: { tests: TestType[] } = await Fetch('/api/tests').catch(e => ({ tests: [] }))
    console.log('fasdf')

    let testAdd = tests.filter(v => !get().tests.some(v2 => v2.id == v.id))
    set(state => ({ tests: [...state.tests, ...testAdd], isLoad: true }))
    return
  },
  findTest: async (code) => {
    let test = get().tests.find(v => v.code == code) || null

    if (!test || (test.test_histories == null || test.test_histories == undefined)) {
      let testTemp = (await Fetch(`/api/tests/${code}`).catch(e => ({ test: null }))).test
      let tests = test ? get().tests.map(v => v.id == testTemp.id ? testTemp : v) : [...get().tests, testTemp]

      set(({ tests: tests }))
      return testTemp
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
  findHistory: async (code, id) => {
    const test = await get().findTest(code)

    if (!test) return {
      test: null,
      history: null
    }

    let history = test.test_histories?.find(v => v.id == id) || null

    return { test, history }
  },
  addTestHistory: async (code, history) => {
    const test = await get().findTest(code)

    if (test) {
      set(state => ({ tests: state.tests.map(v => ({
        ...v,
        test_histories: test.id == v.id ? [history,...v.test_histories || []] : v.test_histories
      })) }))
    }

    return
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
  test_histories?: TestHistoryType[] | null,
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

export type TestHistoryType = {
  id: number,
  user_id: number,
  correct: number,
  wrong: number,
  time: number,
  answers: string,
  point: number,
  created_at: Date,
  updated_at: Date
}