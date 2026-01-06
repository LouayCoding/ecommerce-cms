import medusaClient from '@/lib/medusa-client'

const CART_ID_KEY = 'medusa_cart_id'

export async function getOrCreateCart() {
  try {
    let cartId = localStorage.getItem(CART_ID_KEY)
    
    if (cartId) {
      try {
        const { cart } = await medusaClient.store.cart.retrieve(cartId)
        return cart
      } catch (error) {
        localStorage.removeItem(CART_ID_KEY)
        cartId = null
      }
    }
    
    const { regions } = await medusaClient.store.region.list()
    const regionId = regions?.[0]?.id
    
    if (!regionId) {
      throw new Error('No region available')
    }
    
    const { cart } = await medusaClient.store.cart.create({
      region_id: regionId,
    })
    
    localStorage.setItem(CART_ID_KEY, cart.id)
    return cart
  } catch (error) {
    console.error('Error getting or creating cart:', error)
    throw error
  }
}

export async function addToCart(variantId: string, quantity: number = 1) {
  try {
    const cart = await getOrCreateCart()
    
    const { cart: updatedCart } = await medusaClient.store.cart.createLineItem(cart.id, {
      variant_id: variantId,
      quantity,
    })
    
    return updatedCart
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

export async function updateLineItem(cartId: string, lineItemId: string, quantity: number) {
  try {
    const { cart } = await medusaClient.store.cart.updateLineItem(cartId, lineItemId, {
      quantity,
    })
    return cart
  } catch (error) {
    console.error('Error updating line item:', error)
    throw error
  }
}

export async function removeLineItem(cartId: string, lineItemId: string) {
  try {
    const { cart } = await medusaClient.store.cart.deleteLineItem(cartId, lineItemId)
    return cart
  } catch (error) {
    console.error('Error removing line item:', error)
    throw error
  }
}

export async function getCart() {
  try {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (!cartId) return null
    
    const { cart } = await medusaClient.store.cart.retrieve(cartId)
    return cart
  } catch (error) {
    console.error('Error getting cart:', error)
    return null
  }
}

export function clearCart() {
  localStorage.removeItem(CART_ID_KEY)
}
