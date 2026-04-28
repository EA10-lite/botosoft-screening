import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Todo = {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export type FilterType = 'all' | 'active' | 'completed'

interface TodoStore {
  todos: Todo[]
  filter: FilterType
  addTodo: (text: string) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  setFilter: (filter: FilterType) => void
  clearCompleted: () => void
  getFilteredTodos: () => Todo[]
}

const STORAGE_KEY = 'todo-storage'

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',

      addTodo: (text: string) => {
        if (!text.trim()) return

        const newTodo: Todo = {
          id: crypto.randomUUID(),
          text: text.trim(),
          completed: false,
          createdAt: Date.now(),
        }

        set((state) => ({
          todos: [...state.todos, newTodo],
        }))
      },

      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }))
      },

      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }))
      },

      setFilter: (filter: FilterType) => {
        set({ filter })
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }))
      },

      getFilteredTodos: () => {
        const { todos, filter } = get()
        switch (filter) {
          case 'active':
            return todos.filter((todo) => !todo.completed)
          case 'completed':
            return todos.filter((todo) => todo.completed)
          default:
            return todos
        }
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ todos: state.todos }),
    }
  )
)

