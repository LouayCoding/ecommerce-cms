import medusaClient from '@/lib/medusa-client'

export async function getProducts(limit = 20) {
  try {
    const { products } = await medusaClient.store.product.list({
      limit,
    })
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProduct(id: string) {
  try {
    const { product } = await medusaClient.store.product.retrieve(id)
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getProductByHandle(handle: string) {
  try {
    const { products } = await medusaClient.store.product.list({
      handle,
    })
    return products[0] || null
  } catch (error) {
    console.error('Error fetching product by handle:', error)
    return null
  }
}
