'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const reference = searchParams.get('reference')

  useEffect(() => {
    window.dispatchEvent(new Event('cart-updated'))
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 text-center max-w-2xl">
      <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Bedankt voor je bestelling!</h1>
      <p className="text-gray-600 mb-2">Je bestelling is succesvol geplaatst en betaald.</p>
      
      <div className="bg-gray-50 border p-6 my-8">
        {orderId && (
          <p className="text-sm text-gray-700 mb-2">
            <strong>Bestelnummer:</strong> {orderId.slice(-8)}
          </p>
        )}
        {reference && (
          <p className="text-sm text-gray-700">
            <strong>Betaling referentie:</strong> #{reference}
          </p>
        )}
      </div>

      <p className="text-gray-600 mb-8">
        Je ontvangt een bevestigingsmail met alle details van je bestelling en betaling.
      </p>
      
      <div className="space-y-4">
        <Link
          href="/products"
          className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800"
        >
          Verder winkelen
        </Link>
        
        <p className="text-sm text-gray-500">
          Heb je vragen? Neem contact met ons op via info@example.com
        </p>
      </div>
    </div>
  )
}
