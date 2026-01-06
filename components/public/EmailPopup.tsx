'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Check if popup is enabled via env variable
    const isEnabled = process.env.NEXT_PUBLIC_ENABLE_EMAIL_POPUP === 'true'
    if (!isEnabled) return

    // Check if user already subscribed or dismissed
    const hasSubscribed = localStorage.getItem('newsletter_subscribed')
    const hasDismissed = localStorage.getItem('popup_dismissed')
    
    if (hasSubscribed || hasDismissed) return

    let hasShown = false

    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true)
        hasShown = true
      }
    }, 5000)

    const handleScroll = () => {
      if (hasShown) return
      
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 50) {
        setIsOpen(true)
        hasShown = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call - replace with actual newsletter service
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSuccess(true)
    localStorage.setItem('newsletter_subscribed', 'true')

    // Close popup after 2 seconds
    setTimeout(() => {
      setIsOpen(false)
    }, 2000)
  }

  const handleClose = () => {
    setIsOpen(false)
    // Set cookie to not show again for 7 days
    localStorage.setItem('popup_dismissed', Date.now().toString())
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed left-1/2 top-1/2 z-[101] w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4">
        <div className="relative bg-white p-12 shadow-2xl">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-black/40 transition-colors hover:text-black"
            aria-label="Sluiten"
          >
            <X className="h-5 w-5" />
          </button>

          {!isSuccess ? (
            <>
              {/* Content */}
              <div className="mb-8 text-center">
                <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                  Exclusief Aanbod
                </p>
                <h2 className="mb-4 text-[28px] font-light leading-tight tracking-tight text-black">
                  Ontvang 10% Korting
                </h2>
                <p className="text-[15px] leading-relaxed tracking-wide text-neutral-600">
                  Schrijf je in voor onze nieuwsbrief en ontvang 10% korting op je eerste bestelling.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Je e-mailadres"
                    required
                    className="w-full border-b border-neutral-300 bg-transparent px-0 py-3 text-[15px] tracking-wide text-black placeholder:text-neutral-400 focus:border-black focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black py-3 text-[11px] uppercase tracking-[0.15em] text-white transition-all hover:bg-neutral-800 disabled:opacity-50"
                >
                  {isSubmitting ? 'Bezig...' : 'Ontvang 10% Korting'}
                </button>
              </form>

              {/* Fine Print */}
              <p className="mt-6 text-center text-[11px] leading-relaxed tracking-wide text-neutral-400">
                Door je in te schrijven ga je akkoord met onze{' '}
                <a href="#" className="underline hover:text-black">
                  privacyvoorwaarden
                </a>
              </p>
            </>
          ) : (
            /* Success State */
            <div className="py-8 text-center">
              <div className="mb-4 flex justify-center">
                <svg className="h-16 w-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mb-2 text-[24px] font-light tracking-tight text-black">
                Welkom bij Benny's Fashion
              </h3>
              <p className="text-[15px] tracking-wide text-neutral-600">
                Je kortingscode is onderweg naar je inbox.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
