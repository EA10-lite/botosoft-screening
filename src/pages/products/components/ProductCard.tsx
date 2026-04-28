import type { Product } from '../../../types/product'
import { FaStar } from 'react-icons/fa'

type ProductCardProps = {
  product: Product
  onClick: () => void
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
    return (
        <div
            className="bg-white rounded-lg duration-300 overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
            onClick={onClick}
        >
            <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center p-4">
                <img
                    src={product.image}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-xs font-semibold text-blue-600 uppercase">
                        {product.category}
                    </span>
                </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                        {product.description}
                    </p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" size={14} />
                        <span className="text-sm font-medium text-gray-700">
                            {product.rating.rate}
                        </span>
                        <span className="text-xs text-gray-500">
                            ({product.rating.count})
                        </span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
