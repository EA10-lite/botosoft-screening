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
          // Only fetch if empty to respect local persistence during this session
          // For a real app, you might always fetch and sync.
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

        // Optimistic UI
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
          // Revert optimistic update
          set((state) => ({
            todos: state.todos.filter(t => t.id !== tempId)
          }));
        }
      },

      deleteTodo: async (id: string) => {
        const previousTodos = get().todos;
        
        // Optimistic UI
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }))

        try {
          await todoApi.deleteTodo(id);
        } catch (error) {
          // Revert
          set({ todos: previousTodos });
        }
      },

      toggleTodo: async (id: string) => {
        const previousTodos = get().todos;
        const todoToToggle = previousTodos.find(t => t.id === id);
        if (!todoToToggle) return;

        // Optimistic UI
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }))

        try {
          await todoApi.updateTodo(id, !todoToToggle.completed);
        } catch (error) {
           // Revert
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

        // Optimistic UI
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }))

        try {
          await Promise.all(completedIds.map(id => todoApi.deleteTodo(id)));
        } catch (error) {
           // Revert partially or fully depending on strategy. We'll do fully for simplicity.
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
      partialize: (state) => ({ todos: state.todos }), // Persist only todos
    }
  )
)
