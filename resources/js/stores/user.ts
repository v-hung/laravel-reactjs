import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  user: {
    name: string,
    email: string
  } | null,
  accessToken: string | null
}

type Actions = {

}

type Dispatch = {
  dispatch: (action: (state: State) => State) => void
}

const useUserStore = create(persist<State & Actions & Dispatch>((set, get) => ({
  user: null,
  accessToken: null,

  dispatch: (action) => set((state) => action(state)),
}), {
  name: 'user-storage',
  storage: createJSONStorage(() => localStorage),
}))

export default useUserStore