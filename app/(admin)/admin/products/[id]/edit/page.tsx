import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductForm } from '@/components/admin/ProductForm'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { updateProductAction, deleteProductAction } from '@/lib/actions/products'
import { getProductById } from '@/lib/queries/products'
import { getAllCategories } from '@/lib/queries/categories'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  try {
    const [product, categories] = await Promise.all([
      getProductById(id),
      getAllCategories(),
    ])

    async function updateAction(formData: FormData) {
      'use server'
      return updateProductAction(id, formData)
    }

    async function deleteAction() {
      'use server'
      return deleteProductAction(id)
    }

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Product bewerken</h1>
            <p className="text-gray-600 mt-1">{product.title}</p>
          </div>
          <form action={deleteAction}>
            <Button variant="destructive" type="submit">
              Verwijderen
            </Button>
          </form>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product details</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm product={product} categories={categories} action={updateAction} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Afbeeldingen</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload productId={id} images={product.images || []} />
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
