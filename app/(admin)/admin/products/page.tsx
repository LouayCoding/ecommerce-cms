import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getAllProducts } from '@/lib/queries/products'
import { formatPrice } from '@/lib/utils'

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="mx-auto max-w-[1600px] px-12 py-16">
      {/* Header */}
      <div className="mb-16 flex items-end justify-between border-b border-[var(--color-border-subtle)] pb-8">
        <div>
          <h1 className="mb-2 text-[40px] font-light tracking-tight text-[var(--color-text-primary)]">
            Producten
          </h1>
          <p className="text-[13px] tracking-wide text-[var(--color-text-tertiary)]">
            {products.length} {products.length === 1 ? 'product' : 'producten'} totaal
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button size="md">Nieuw product</Button>
        </Link>
      </div>

      {/* Products List */}
      <div className="space-y-6">
        {products.map((product: any) => (
          <Card key={product.id} className="group transition-all hover:border-[var(--color-border-medium)]">
            <CardContent className="p-8">
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1 space-y-4">
                  {/* Title & Status */}
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-[18px] font-normal tracking-wide text-[var(--color-text-primary)]">
                      {product.title}
                    </h3>
                    {product.is_published ? (
                      <span className="text-[11px] uppercase tracking-widest text-[var(--color-text-tertiary)]">
                        Live
                      </span>
                    ) : (
                      <span className="text-[11px] uppercase tracking-widest text-[var(--color-text-tertiary)]">
                        Concept
                      </span>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-8 text-[13px] tracking-wide text-[var(--color-text-secondary)]">
                    <span className="font-medium text-[var(--color-text-primary)]">
                      {formatPrice(product.price_cents, product.currency || 'EUR')}
                    </span>
                    {product.category && (
                      <span>{product.category.name}</span>
                    )}
                    <span>{product.images?.length || 0} afbeeldingen</span>
                  </div>
                </div>

                {/* Action */}
                <Link href={`/admin/products/${product.id}/edit`}>
                  <Button variant="secondary" size="sm">
                    Bewerken
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32">
          <p className="mb-8 text-[15px] tracking-wide text-[var(--color-text-secondary)]">
            Nog geen producten aangemaakt
          </p>
          <Link href="/admin/products/new">
            <Button size="lg">Maak je eerste product</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
