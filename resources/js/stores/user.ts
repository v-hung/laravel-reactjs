import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'
import { Fetch } from "../lib/helper"

export type UserType = {
  id: number,
  name: string,
  email: string,
  avatar: string | null,
  created_at: Date,
  updated_at: Date
}

type State = {
  user: UserType | null,
  accessToken: string | null
}

type Actions = {
  login: (data: {email: string, password: string, remember: boolean}) => Promise<void>,
  logout: () => void,
  logged: () => Promise<void>,
}

type Dispatch = {
  dispatch: (action: (state: State) => State) => void
}

const useUserStore = create(persist<State & Actions & Dispatch>((set, get) => ({
  user: null,
  accessToken: null,

  login: async ({ email, password, remember}) => {
    const body = await Fetch('/api/auth/login', {
      method: 'post',
      body: JSON.stringify({
        email, password, remember
      })
    })

    set({
      user: body.user,
      accessToken: body.access_token
    })
  },
  logout: () => {
    Fetch('/api/auth/logout', {
      method: 'post',
    })

    set({ user: null, accessToken: null })
  },
  logged: async () => {
    const body = await Fetch('/api/auth/logged', {
      method: 'post',
    }).catch(e => null)

    set({
      user: body?.user || null
    })
  },

  dispatch: (action) => set((state) => action(state)),
}), {
  name: 'user-storage',
  storage: createJSONStorage(() => localStorage),
}))

export default useUserStore