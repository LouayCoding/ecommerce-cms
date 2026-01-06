'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCart, updateLineItem, removeLineItem } from '@/lib/medusa/cart'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function CartPage() {
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const loadCart = async () => {
    try {
      const cartData = await getCart()
      setCart(cartData)
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  const handleUpdateQuantity = async (lineItemId: string, quantity: number) => {
    if (!cart || quantity < 1) return
    try {
      const updatedCart = await updateLineItem(cart.id, lineItemId, quantity)
      setCart(updatedCart)
      window.dispatchEvent(new Event('cart-updated'))
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  const handleRemoveItem = async (lineItemId: string) => {
    if (!cart) return
    try {
      const updatedCart = await removeLineItem(cart.id, lineItemId)
      setCart(updatedCart)
      window.dispatchEvent(new Event('cart-updated'))
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const formatPrice = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: currencyCode.toUpperCase(),
    }).format(amount / 100)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p>Laden...</p>
      </div>
    )
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Winkelwagen</h1>
        <p className="text-gray-600 mb-8">Je winkelwagen is leeg</p>
        <Link href="/products" className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800">
          Verder winkelen
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Winkelwagen</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item: any) => (
            <div key={item.id} className="flex gap-4 border p-4">
              {item.thumbnail && (
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.variant?.title}</p>
                <p className="font-semibold mt-2">
                  {formatPrice(item.unit_price, cart.region?.currency_code || 'EUR')}
                </p>
              </div>
              
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                
                <div className="flex items-center gap-2 border">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="border p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Overzicht</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotaal</span>
                <span>{formatPrice(cart.subtotal || 0, cart.region?.currency_code || 'EUR')}</span>
              </div>
              <div className="flex justify-between">
                <span>Verzending</span>
                <span>{formatPrice(cart.shipping_total || 0, cart.region?.currency_code || 'EUR')}</span>
              </div>
              <div className="flex justify-between">
                <span>BTW</span>
                <span>{formatPrice(cart.tax_total || 0, cart.region?.currency_code || 'EUR')}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Totaal</span>
                <span>{formatPrice(cart.total || 0, cart.region?.currency_code || 'EUR')}</span>
              </div>
            </div>
            
            <Link
              href="/checkout"
              className="block w-full bg-black text-white text-center py-3 hover:bg-gray-800"
            >
              Afrekenen
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
