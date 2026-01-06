import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { getProductBySlug } from '@/lib/queries/products'
import { AddToCartButton } from '@/components/cart/AddToCartButton'

function formatMedusaPrice(variant: any) {
  if (!variant?.calculated_price) return 'Prijs op aanvraag'
  
  const amount = variant.calculated_price.calculated_amount
  const currencyCode = variant.calculated_price.currency_code?.toUpperCase() || 'EUR'
  
  const formatted = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount / 100)
  
  return formatted
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const product = await getProductBySlug(slug)
  
  if (!product) {
    notFound()
  }

  const firstVariant = product.variants?.[0]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          {product.images && product.images.length > 0 ? (
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={product.images[0].url}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1, 5).map((image: any) => (
                    <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Geen afbeelding</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {product.collection && (
            <p className="text-sm text-blue-600 font-medium">{product.collection.title}</p>
          )}
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="text-3xl font-bold text-blue-600">
            {formatMedusaPrice(firstVariant)}
          </p>
          
          <AddToCartButton 
            variantId={firstVariant?.id} 
            disabled={!firstVariant?.id}
          />
          
          {product.description && (
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold mb-2">Beschrijving</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4">Product informatie</h2>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">SKU</dt>
                  <dd className="font-medium">{firstVariant?.sku || product.id.slice(0, 8)}</dd>
                </div>
                {product.collection && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Collectie</dt>
                    <dd className="font-medium">{product.collection.title}</dd>
                  </div>
                )}
                {product.material && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Materiaal</dt>
                    <dd className="font-medium">{product.material}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
