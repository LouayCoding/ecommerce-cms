'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tables } from '@/types/database'

type Product = Tables<'products'>
type Category = Tables<'categories'>

interface ProductFormProps {
  product?: Product
  categories: Category[]
  action: (formData: FormData) => Promise<any>
}

export function ProductForm({ product, categories, action }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await action(formData)
    setLoading(false)
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Titel
        </label>
        <Input
          id="title"
          name="title"
          defaultValue={product?.title}
          required
        />
        {error?.title && <p className="text-red-600 text-sm mt-1">{error.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Beschrijving
        </label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description || ''}
          rows={5}
        />
      </div>

      <div>
        <label htmlFor="price_cents" className="block text-sm font-medium mb-2">
          Prijs (in centen, bijv. 1999 voor €19,99)
        </label>
        <Input
          id="price_cents"
          name="price_cents"
          type="number"
          defaultValue={product?.price_cents}
          required
        />
        {error?.price_cents && <p className="text-red-600 text-sm mt-1">{error.price_cents}</p>}
      </div>

      <div>
        <label htmlFor="category_id" className="block text-sm font-medium mb-2">
          Categorie
        </label>
        <select
          id="category_id"
          name="category_id"
          defaultValue={product?.category_id || ''}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
        >
          <option value="">Geen categorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_published"
          name="is_published"
          value="true"
          defaultChecked={product?.is_published || false}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="is_published" className="text-sm font-medium">
          Gepubliceerd
        </label>
      </div>

      {error?.general && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error.general}</p>
        </div>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? 'Bezig...' : product ? 'Bijwerken' : 'Aanmaken'}
      </Button>
    </form>
  )
}
