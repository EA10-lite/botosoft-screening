import { FiSearch } from 'react-icons/fi'

const EmptyState = () => {
  return (
    <div className="text-center text-gray-500 py-20">
      <FiSearch className="mx-auto mb-4 text-5xl" />
      <p className="text-lg font-medium mb-2">No products found</p>
      <p className="text-sm">Try adjusting your search query</p>
    </div>
  )
}

export default EmptyState

