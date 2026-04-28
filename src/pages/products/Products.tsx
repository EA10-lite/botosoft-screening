import { useState, useMemo } from 'react'
import { useProducts } from '../../api/products'
import type { Product } from '../../types/product'
import {
  ProductCard,
  ProductModal,
  SearchBar,
  LoadingSpinner,
  ErrorState,
  EmptyState,
} from './components'

const Products = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const { data: products, isLoading, isError } = useProducts()

    const filteredProducts = useMemo(() => {
        if (!products) return []
        if (!searchQuery.trim()) return products

        const query = searchQuery.toLowerCase()
        return products.filter(
        (product) =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        )
    }, [products, searchQuery])

    return (
        <div className="min-h-screen bg-gray-50">
            <header>
                <div className="bg-black py-6">
                    <div className='max-w-[1280px] mx-auto px-4'>
                        <h4 className="text-white text-lg font-[500]">Welcome to Product Listing</h4>
                    </div>
                </div>
            </header>
            <div className="bg-[#2a2c33] py-6 sticky top-0 z-50 shadow-md">
                <div className='max-w-[1280px] mx-auto px-4'>    
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>
            </div>

            <main className="max-w-[1280px] mx-auto px-4 py-8">
                {isLoading && <LoadingSpinner />}

                {isError && <ErrorState />}

                {!isLoading && !isError && filteredProducts.length === 0 && <EmptyState />}

                {!isLoading && !isError && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => setSelectedProduct(product)}
                            />
                        ))}
                    </div>
                )}
            </main>

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    )
}

export default Products
