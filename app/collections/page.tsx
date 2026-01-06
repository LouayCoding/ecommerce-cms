import Link from 'next/link'
import medusaClient from '@/lib/medusa-client'

export default async function CollectionsPage() {
  let collections: any[] = []
  
  try {
    const response = await medusaClient.store.collection.list({
      limit: 100,
    })
    collections = response.collections || []
  } catch (error) {
    console.error('Error fetching collections:', error)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Collecties</h1>
      
      {collections.length === 0 ? (
        <p className="text-gray-600">Geen collecties gevonden</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="border p-6 hover:border-black transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">{collection.title}</h2>
              {collection.metadata?.description && (
                <p className="text-gray-600 text-sm">{collection.metadata.description as string}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
