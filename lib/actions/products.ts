'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { productSchema } from '@/lib/validations/schemas'
import { generateSlug } from '@/lib/server-utils'

export async function createProductAction(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const validated = productSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description') || '',
    price_cents: Number(formData.get('price_cents')),
    category_id: formData.get('category_id') || null,
    is_published: formData.get('is_published') === 'true',
    slug: '',
  })

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors }
  }

  const slug = await generateSlug(validated.data.title)

  const { data, error } = await supabase
    .from('products')
    .insert({ ...validated.data, slug })
    .select()
    .single()

  if (error) return { error: { general: error.message } }

  revalidatePath('/admin/products')
  redirect(`/admin/products/${data.id}/edit`)
}

export async function updateProductAction(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const validated = productSchema.partial().safeParse({
    title: formData.get('title'),
    description: formData.get('description') || '',
    price_cents: Number(formData.get('price_cents')),
    category_id: formData.get('category_id') || null,
    is_published: formData.get('is_published') === 'true',
  })

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors }
  }

  const updateData: any = { ...validated.data }
  
  if (validated.data.title) {
    updateData.slug = await generateSlug(validated.data.title)
  }

  const { error } = await supabase
    .from('products')
    .update({ ...updateData, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: { general: error.message } }

  revalidatePath('/admin/products')
  revalidatePath(`/admin/products/${id}/edit`)
  revalidatePath('/products')
  
  return { success: true }
}

export async function deleteProductAction(id: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/products')
  redirect('/admin/products')
}

export async function uploadProductImageAction(productId: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const file = formData.get('file') as File
  if (!file) return { error: 'No file provided' }

  const fileName = `${productId}/${Date.now()}-${file.name}`
  
  const { data: storageData, error: storageError } = await supabase
    .storage
    .from('product-images')
    .upload(fileName, file)

  if (storageError) return { error: storageError.message }

  const { data, error } = await supabase
    .from('product_images')
    .insert({
      product_id: productId,
      storage_path: storageData.path,
      alt_text: file.name,
    })
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath(`/admin/products/${productId}/edit`)
  return { success: true, data }
}

export async function deleteProductImageAction(imageId: string, productId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { data: image } = await supabase
    .from('product_images')
    .select('storage_path')
    .eq('id', imageId)
    .single()

  if (image) {
    await supabase.storage.from('product-images').remove([image.storage_path])
  }

  const { error } = await supabase
    .from('product_images')
    .delete()
    .eq('id', imageId)

  if (error) return { error: error.message }

  revalidatePath(`/admin/products/${productId}/edit`)
  return { success: true }
}
