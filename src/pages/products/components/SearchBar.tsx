import { FiSearch, FiX } from 'react-icons/fi'

type SearchBarProps = {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  const handleClear = () => {
    setSearchQuery('')
  }

  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search products..."
        className={`w-full py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${searchQuery ? 'px-12 pr-12' : 'px-12'}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <FiX size={20} />
        </button>
      )}
    </div>
  )
}

export default SearchBar

