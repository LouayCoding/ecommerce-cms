'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function DesktopNav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-10 left-0 right-0 z-50 hidden transition-all duration-300 md:block ${
        isScrolled ? 'bg-white' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1800px] px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Menu + Search */}
          <div className="flex items-center gap-8">
            <button className={`flex items-center gap-2 text-[14px] tracking-[0.15em] transition-all ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Menu
            </button>
            <button className={`flex items-center gap-2 text-[14px] tracking-[0.15em] transition-all ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>

          {/* Center: Logo */}
          <Link 
            href="/" 
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[34px] font-black uppercase tracking-wide transition-colors ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
            style={{ fontWeight: 950 }}
          >
            Benny's
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            <Link 
              href="/products" 
              className={`text-[14px] tracking-[0.15em] transition-all ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
            >
              Contact us
            </Link>
            <div className="flex items-center gap-4">
              <button className="transition-colors">
                <svg className={`h-5 w-5 transition-colors ${
                  isScrolled ? 'text-black' : 'text-white'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <Link href="/cart" className="relative transition-colors">
                <svg className={`h-5 w-5 transition-colors ${
                  isScrolled ? 'text-black' : 'text-white'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
