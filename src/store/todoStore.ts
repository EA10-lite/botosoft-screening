import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { todoApi } from '../api/todoApi'

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
  isLoading: boolean
  error: string | null
  fetchTodos: () => Promise<void>
  addTodo: (text: string) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
  toggleTodo: (id: string) => Promise<void>
  setFilter: (filter: FilterType) => void
  clearCompleted: () => Promise<void>
  getFilteredTodos: () => Todo[]
  reorderTodos: (startIndex: number, endIndex: number) => void
}

const STORAGE_KEY = 'todo-storage'

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      filter: 'all',
      isLoading: false,
      error: null,

      fetchTodos: async () => {
        set({ isLoading: true, error: null });
        try {
          const state = get();
          if (state.todos.length === 0) {
            const data = await todoApi.fetchTodos();
            set({ todos: data, isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      addTodo: async (text: string) => {
        if (!text.trim()) return

        const tempId = 'temp-' + Date.now();
        const optimisticTodo: Todo = {
          id: tempId,
          text: text.trim(),
          completed: false,
          createdAt: Date.now(),
        };

        set((state) => ({
          todos: [optimisticTodo, ...state.todos],
        }));

        try {
          const newTodo = await todoApi.addTodo(text);
          set((state) => ({
            todos: state.todos.map(t => t.id === tempId ? newTodo : t)
          }));
        } catch (error) {
          set((state) => ({
            todos: state.todos.filter(t => t.id !== tempId)
          }));
        }
      },

      deleteTodo: async (id: string) => {
        const previousTodos = get().todos;

        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }))

        try {
          await todoApi.deleteTodo(id);
        } catch (error) {
          set({ todos: previousTodos });
        }
      },

      toggleTodo: async (id: string) => {
        const previousTodos = get().todos;
        const todoToToggle = previousTodos.find(t => t.id === id);
        if (!todoToToggle) return;

        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }))

        try {
          await todoApi.updateTodo(id, !todoToToggle.completed);
        } catch (error) {
          set({ todos: previousTodos });
        }
      },

      setFilter: (filter: FilterType) => {
        set({ filter })
      },

      clearCompleted: async () => {
        const state = get();
        const completedIds = state.todos.filter(t => t.completed).map(t => t.id);

        if (completedIds.length === 0) return;

        const previousTodos = state.todos;
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }))

        try {
          await Promise.all(completedIds.map(id => todoApi.deleteTodo(id)));
        } catch (error) {
          set({ todos: previousTodos });
        }
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

      reorderTodos: (startIndex: number, endIndex: number) => {
        set((state) => {
          const result = Array.from(state.todos);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { todos: result };
        });
      }
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ todos: state.todos }),
    }
  )
)
