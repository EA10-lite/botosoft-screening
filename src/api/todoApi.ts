import axios from 'axios';

const API_URL = 'https://dummyjson.com/todos';

export const todoApi = {
  fetchTodos: async () => {
    const response = await axios.get(`${API_URL}?limit=10`);
    return response.data.todos.map((t: any) => ({
      id: String(t.id),
      text: t.todo,
      completed: t.completed,
      createdAt: Date.now(),
    }));
  },
  addTodo: async (text: string) => {
    const response = await axios.post(`${API_URL}/add`, {
      todo: text,
      completed: false,
      userId: 1,
    });
    return {
      id: String(response.data.id) + '-' + Date.now(),
      text: response.data.todo,
      completed: response.data.completed,
      createdAt: Date.now(),
    };
  },
  updateTodo: async (id: string, completed: boolean) => {
    if (String(id).includes('-')) {
      return { id, completed };
    }
    const response = await axios.put(`${API_URL}/${id}`, {
      completed,
    });
    return response.data;
  },
  deleteTodo: async (id: string) => {
    if (String(id).includes('-')) {
      return { id, isDeleted: true };
    }
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};
