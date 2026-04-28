import type { Product } from '../../../types/product'
import { FaStar, FaTimes } from 'react-icons/fa'

type ProductModalProps = {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  if (!isOpen || !product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-1/2 bg-gray-100 rounded-lg p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-96 object-contain"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="mb-2">
                <span className="text-xs font-semibold text-blue-600 uppercase">
                  {product.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {product.title}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <FaStar className="text-yellow-400" size={18} />
                <span className="text-lg font-semibold text-gray-900">
                  {product.rating.rate}
                </span>
                <span className="text-sm text-gray-500">
                  ({product.rating.count} reviews)
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                ${product.price.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal

