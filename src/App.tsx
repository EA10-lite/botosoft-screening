import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  Home,
  Products,
  Todo,
} from './pages'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
