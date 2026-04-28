import { FiAlertCircle } from 'react-icons/fi'

const ErrorState = () => {
  return (
    <div className="text-center text-gray-500 py-20">
      <FiAlertCircle className="mx-auto mb-4 text-5xl text-red-500" />
      <p className="text-lg font-medium mb-2">Failed to load products</p>
      <p className="text-sm">Please try again later</p>
    </div>
  )
}

export default ErrorState

