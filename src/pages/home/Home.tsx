import { Link } from 'react-router-dom'
import { FaTasks, FaShoppingBag } from 'react-icons/fa'

const Home = () => {
  const exercises = [
    {
      id: 2,
      title: 'Todo App',
      description: 'Task list with filters and local storage',
      icon: FaTasks,
      path: '/todo',
    },
    {
      id: 3,
      title: 'Products',
      description: 'Fetch and display products with search',
      icon: FaShoppingBag,
      path: '/products',
    },
  ]

  return (
    <div className="min-h-screen bg-[#f4f2ee]">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            Frontend Screening Exercises
          </h1>
          <p className="text-sm text-gray-600">Click on an exercise to view</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exercises.map((exercise) => {
            const Icon = exercise.icon
            return (
              <Link
                key={exercise.id}
                to={exercise.path}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 block"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded flex items-center justify-center bg-gray-100">
                    <Icon className="text-gray-700" size={20} />
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">Exercise {exercise.id}</h2>
                    <h3 className="text-lg font-semibold text-gray-900">{exercise.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{exercise.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home