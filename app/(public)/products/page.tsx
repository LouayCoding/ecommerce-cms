import { ProductGrid } from '@/components/public/ProductGrid'
import { getPublishedProducts } from '@/lib/queries/products'

export default async function ProductsPage() {
  const products = await getPublishedProducts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Alle producten</h1>
        <p className="text-gray-600">{products.length} producten beschikbaar</p>
      </div>
      <ProductGrid products={products} />
    </div>
  )
}
