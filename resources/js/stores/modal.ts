import { create } from "zustand"

type State = {
  isOpen: 'joinClass' | null,
}

type Actions = {
  
}

type Dispatch = {
  dispatch: (action: ((state: State) => Partial<State>) | Partial<State>) => void
}

const useModalStore = create<State & Actions & Dispatch>((set, get) => ({
  isOpen: null,

  dispatch: (action) => set((state) => typeof action === "function" ? action(state) : action),
}))

export default useModalStore