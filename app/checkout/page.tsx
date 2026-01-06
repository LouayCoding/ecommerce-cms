'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCart, clearCart } from '@/lib/medusa/cart'
import medusaClient from '@/lib/medusa-client'

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  })

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      const cartData = await getCart()
      if (!cartData || !cartData.items || cartData.items.length === 0) {
        router.push('/cart')
        return
      }
      setCart(cartData)
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
      // Update cart with email and shipping address
      await medusaClient.store.cart.update(cart.id, {
        email: formData.email,
        shipping_address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          phone: formData.phone,
          country_code: cart.region?.countries?.[0]?.iso_2 || 'nl',
        },
      })

      // Save order data to localStorage for payment confirmation
      const orderData = {
        cartId: cart.id,
        email: formData.email,
        total: cart.total,
        items: cart.items,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        timestamp: Date.now(),
      }
      
      localStorage.setItem('pending_order', JSON.stringify(orderData))
      
      // Redirect to payment page
      router.push('/payment')
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Er is een fout opgetreden bij het afrekenen. Probeer het opnieuw.')
    } finally {
      setProcessing(false)
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

  if (!cart) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Afrekenen</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact informatie</h2>
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border p-3"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Verzendadres</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Voornaam"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="border p-3"
                  />
                  <input
                    type="text"
                    placeholder="Achternaam"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="border p-3"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Adres"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border p-3"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Postcode"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="border p-3"
                  />
                  <input
                    type="text"
                    placeholder="Plaats"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="border p-3"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Telefoon"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border p-3"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-black text-white py-4 hover:bg-gray-800 disabled:bg-gray-300"
            >
              {processing ? 'Verwerken...' : 'Bestelling plaatsen'}
            </button>
          </form>
        </div>

        <div>
          <div className="border p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Bestelling overzicht</h2>
            
            <div className="space-y-4 mb-6">
              {cart.items.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">Aantal: {item.quantity}</p>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.unit_price * item.quantity, cart.region?.currency_code || 'EUR')}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}
