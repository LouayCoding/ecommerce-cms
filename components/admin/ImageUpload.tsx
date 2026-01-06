'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { uploadProductImageAction, deleteProductImageAction } from '@/lib/actions/products'
import Image from 'next/image'

interface ImageUploadProps {
  productId: string
  images: any[]
}

export function ImageUpload({ productId, images }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  async function handleUpload(formData: FormData) {
    setUploading(true)
    await uploadProductImageAction(productId, formData)
    setUploading(false)
  }

  async function handleDelete(imageId: string) {
    if (!confirm('Weet je zeker dat je deze afbeelding wilt verwijderen?')) return
    await deleteProductImageAction(imageId, productId)
  }

  return (
    <div className="space-y-4">
      <form action={handleUpload} className="space-y-4">
        <div>
          <label htmlFor="file" className="block text-sm font-medium mb-2">
            Upload afbeelding
          </label>
          <Input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            required
          />
        </div>
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Uploaden...' : 'Upload'}
        </Button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${image.storage_path}`}
              alt={image.alt_text || ''}
              width={200}
              height={200}
              className="rounded-lg object-cover w-full h-48"
            />
            <Button
              variant="destructive"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs h-8 px-3"
              onClick={() => handleDelete(image.id)}
            >
              Verwijder
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
