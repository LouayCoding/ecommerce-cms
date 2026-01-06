'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createCategoryAction, deleteCategoryAction } from '@/lib/actions/categories'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])

  async function handleCreate(formData: FormData) {
    const result = await createCategoryAction(formData)
    if (result.success) {
      window.location.reload()
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Weet je zeker dat je deze categorie wilt verwijderen?')) return
    await deleteCategoryAction(id)
    window.location.reload()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Categorieën</h1>
        <p className="text-gray-600 mt-1">Beheer je productcategorieën</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nieuwe categorie</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleCreate} className="flex gap-2">
            <Input
              name="name"
              placeholder="Categorie naam"
              required
              className="flex-1"
            />
            <Button type="submit">Toevoegen</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alle categorieën</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{category.name}</p>
                  <p className="text-sm text-gray-600">{category.slug}</p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(category.id)}
                >
                  Verwijderen
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
