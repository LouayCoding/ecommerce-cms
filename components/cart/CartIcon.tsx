'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { getCart } from '@/lib/medusa/cart'

export function CartIcon() {
  const [itemCount, setItemCount] = useState(0)

  const updateCartCount = async () => {
    try {
      const cart = await getCart()
      const count = cart?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0
      setItemCount(count)
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  useEffect(() => {
    updateCartCount()
    window.addEventListener('cart-updated', updateCartCount)
    return () => window.removeEventListener('cart-updated', updateCartCount)
  }, [])

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
