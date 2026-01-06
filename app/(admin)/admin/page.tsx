import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getAllProducts } from '@/lib/queries/products'
import { getAllCategories } from '@/lib/queries/categories'

export default async function AdminDashboard() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ])

  const publishedCount = products.filter(p => p.is_published).length

  return (
    <div className="mx-auto max-w-[1600px] px-12 py-16">
      {/* Hero Section - Luxury spacing */}
      <div className="mb-20">
        <h1 className="mb-3 text-[40px] font-light tracking-tight text-[var(--color-text-primary)]">
          Dashboard
        </h1>
        <p className="text-[15px] tracking-wide text-[var(--color-text-secondary)]">
          Overzicht van je winkel
        </p>
      </div>

      {/* Stats Grid - More breathing room */}
      <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Totaal Producten</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-[56px] font-light tabular-nums tracking-tight text-[var(--color-text-primary)]">
              {products.length}
            </p>
            <p className="text-[13px] tracking-wide text-[var(--color-text-tertiary)]">
              {publishedCount} gepubliceerd
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorieën</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[56px] font-light tabular-nums tracking-tight text-[var(--color-text-primary)]">
              {categories.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Concept</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-[56px] font-light tabular-nums tracking-tight text-[var(--color-text-primary)]">
              {products.length - publishedCount}
            </p>
            <p className="text-[13px] tracking-wide text-[var(--color-text-tertiary)]">
              Niet gepubliceerd
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Producten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-[15px] leading-relaxed tracking-wide text-[var(--color-text-secondary)]">
              Beheer je producten, prijzen en voorraad
            </p>
            <div className="flex gap-4">
              <Link href="/admin/products">
                <Button size="md">Bekijk alle producten</Button>
              </Link>
              <Link href="/admin/products/new">
                <Button variant="secondary" size="md">
                  Nieuw product
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorieën</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <p className="text-[15px] leading-relaxed tracking-wide text-[var(--color-text-secondary)]">
              Organiseer je producten in categorieën
            </p>
            <Link href="/admin/categories">
              <Button size="md">Beheer categorieën</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
