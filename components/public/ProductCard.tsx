import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  product: any
}

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

export function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images?.[0]
  const firstVariant = product.variants?.[0]

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] transition-all hover:border-[var(--color-border-medium)]">
        {firstImage?.url ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={firstImage.url}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex aspect-[4/5] w-full items-center justify-center bg-[var(--color-bg-tertiary)]">
            <span className="text-[11px] uppercase tracking-widest text-[var(--color-text-tertiary)]">
              Geen afbeelding
            </span>
          </div>
        )}
        
        <div className="space-y-3 p-6">
          {product.collection && (
            <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-tertiary)]">
              {product.collection.title}
            </p>
          )}
          <h3 className="text-[15px] font-normal tracking-wide text-[var(--color-text-primary)]">
            {product.title}
          </h3>
          <p className="text-[13px] tracking-wide text-[var(--color-text-primary)]">
            {formatMedusaPrice(firstVariant)}
          </p>
        </div>
      </div>
    </Link>
  )
}
