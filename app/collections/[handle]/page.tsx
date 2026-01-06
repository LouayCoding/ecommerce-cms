import { notFound } from 'next/navigation'
import { ProductGrid } from '@/components/public/ProductGrid'
import medusaClient from '@/lib/medusa-client'

async function getDefaultRegion() {
  try {
    const { regions } = await medusaClient.store.region.list()
    return regions?.[0]?.id || null
  } catch (error) {
    console.error('Error fetching regions:', error)
    return null
  }
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  
  try {
    const regionId = await getDefaultRegion()
    
    // Get collection
    const { collections } = await medusaClient.store.collection.list({
      handle: [handle],
    })
    
    const collection = collections?.[0]
    
    if (!collection) {
      notFound()
    }
    
    // Get products in collection
    const { products } = await medusaClient.store.product.list({
      collection_id: [collection.id],
      region_id: regionId,
      fields: '+variants.calculated_price,+images',
      limit: 100,
    })

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{collection.title}</h1>
          {collection.metadata?.description && (
            <p className="text-gray-600">{collection.metadata.description as string}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">{products.length} producten</p>
        </div>
        
        <ProductGrid products={products} />
      </div>
    )
  } catch (error) {
    console.error('Error loading collection:', error)
    notFound()
  }
}
