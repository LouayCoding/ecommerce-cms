'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { generateBunqPaymentLink } from '@/lib/bunq-payment'
import { clearCart } from '@/lib/medusa/cart'
import { ExternalLink, CheckCircle } from 'lucide-react'

export default function PaymentPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<any>(null)
  const [paymentLink, setPaymentLink] = useState<string>('')
  const [reference, setReference] = useState<string>('')

  useEffect(() => {
    // Get pending order from localStorage
    const pendingOrder = localStorage.getItem('pending_order')
    
    if (!pendingOrder) {
      router.push('/cart')
      return
    }

    const data = JSON.parse(pendingOrder)
    setOrderData(data)

    // Generate Bunq payment link
    const payment = generateBunqPaymentLink(
      data.total,
      `Bestelling ${data.cartId.slice(-8)}`,
      data.cartId
    )
    
    setPaymentLink(payment.paymentUrl)
    setReference(payment.reference)
  }, [router])

  const handlePaymentComplete = () => {
    if (!orderData) return
    
    // Clear cart and pending order
    clearCart()
    localStorage.removeItem('pending_order')
    
    // Redirect to success page
    router.push(`/order-success?order_id=${orderData.cartId}&reference=${reference}`)
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount / 100)
  }

  if (!orderData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p>Laden...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Betaling</h1>
        <p className="text-gray-600">Voltooi je betaling via Bunq</p>
      </div>

      <div className="border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Bestelling overzicht</h2>
        
        <div className="space-y-3 mb-4">
          {orderData.items.map((item: any) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.title} x {item.quantity}</span>
              <span>{formatPrice(item.unit_price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Totaal te betalen</span>
            <span>{formatPrice(orderData.total)}</span>
          </div>
          <p className="text-sm text-gray-600">Referentie: #{reference}</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          Betaal via Bunq
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          Klik op de knop hieronder om je betaling te voltooien via Bunq. 
          Je wordt doorgestuurd naar Bunq.me waar je veilig kunt betalen.
        </p>
        
        <a
          href={paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 text-white text-center py-4 px-6 hover:bg-blue-700 transition-colors mb-3"
        >
          Betaal {formatPrice(orderData.total)} via Bunq
        </a>
        
        <p className="text-xs text-gray-500 text-center">
          Referentie: #{reference} - Gebruik deze bij je betaling
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 p-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Na betaling
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          Heb je de betaling voltooid? Klik dan op de knop hieronder om je bestelling te bevestigen.
        </p>
        
        <button
          onClick={handlePaymentComplete}
          className="w-full bg-green-600 text-white py-3 px-6 hover:bg-green-700 transition-colors"
        >
          Ik heb betaald - Bevestig bestelling
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => router.push('/cart')}
          className="text-gray-600 hover:text-gray-800 text-sm"
        >
          ← Terug naar winkelwagen
        </button>
      </div>
    </div>
  )
}
