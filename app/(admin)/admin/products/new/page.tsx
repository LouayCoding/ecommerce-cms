import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductForm } from '@/components/admin/ProductForm'
import { createProductAction } from '@/lib/actions/products'
import { getAllCategories } from '@/lib/queries/categories'

export default async function NewProductPage() {
  const categories = await getAllCategories()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Nieuw product</h1>
        <p className="text-gray-600 mt-1">Voeg een nieuw product toe aan je winkel</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product details</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm categories={categories} action={createProductAction} />
        </CardContent>
      </Card>
    </div>
  )
}
