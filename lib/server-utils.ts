import { createClient } from '@/lib/supabase/server'

export async function generateSlug(title: string, attempt = 0): Promise<string> {
  const supabase = await createClient()
  
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (attempt > 0) {
    slug = `${slug}-${attempt}` 
  }

  const { data } = await supabase
    .from('products')
    .select('id')
    .eq('slug', slug)
    .single()

  if (data) {
    return generateSlug(title, attempt + 1)
  }

  return slug
}
