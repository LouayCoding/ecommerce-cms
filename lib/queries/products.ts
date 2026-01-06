import medusaClient from '@/lib/medusa-client'

async function getDefaultRegion() {
  try {
    const { regions } = await medusaClient.store.region.list()
    return regions?.[0]?.id || null
  } catch (error) {
    console.error('Error fetching regions:', error)
    return null
  }
}

export async function getPublishedProducts() {
  try {
    const regionId = await getDefaultRegion()
    const response = await medusaClient.store.product.list({
      limit: 100,
      fields: '+variants.calculated_price,+images',
      region_id: regionId,
    })
    return response.products || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const regionId = await getDefaultRegion()
    const response = await medusaClient.store.product.list({
      handle: slug,
      fields: '+variants.calculated_price,+images',
      region_id: regionId,
    })
    return response.products?.[0] || null
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
}

export async function getAllProducts() {
  try {
    const regionId = await getDefaultRegion()
    const response = await medusaClient.store.product.list({
      limit: 100,
      fields: '+variants.calculated_price,+images',
      region_id: regionId,
    })
    return response.products || []
  } catch (error) {
    console.error('Error fetching all products:', error)
    return []
  }
}

export async function getProductById(id: string) {
  try {
    const regionId = await getDefaultRegion()
    const response = await medusaClient.store.product.retrieve(id, {
      fields: '+variants.calculated_price,+images',
      region_id: regionId,
    })
    return response.product || null
  } catch (error) {
    console.error('Error fetching product by id:', error)
    return null
  }
}
