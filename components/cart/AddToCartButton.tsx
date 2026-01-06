'use client'

import { useState } from 'react'
import { addToCart } from '@/lib/medusa/cart'

interface AddToCartButtonProps {
  variantId: string
  disabled?: boolean
}

export function AddToCartButton({ variantId, disabled }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      await addToCart(variantId, 1)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
      window.dispatchEvent(new Event('cart-updated'))
    } catch (error) {
      console.error('Failed to add to cart:', error)
      alert('Kon niet toevoegen aan winkelwagen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled || loading}
      className="w-full bg-black text-white py-3 px-6 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? 'Toevoegen...' : success ? '✓ Toegevoegd!' : 'Toevoegen aan winkelwagen'}
    </button>
  )
}
