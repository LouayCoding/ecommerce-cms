'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Search, User, ShoppingBag } from 'lucide-react'

export function MobileNav() {
  const [showSearch, setShowSearch] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide only search when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowSearch(false)
      } else {
        setShowSearch(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Main Mobile Nav - Always visible */}
      <nav className="fixed top-10 left-0 right-0 z-50 bg-white md:hidden">
        <div className="relative flex h-16 items-center px-4">
          {/* Left: Hamburger Menu */}
          <button className="p-2">
            <Menu className="h-4 w-4 text-black" />
          </button>

          {/* Center: Logo - Absolutely centered */}
          <Link 
            href="/" 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[26px] font-black uppercase tracking-wide text-black"
            style={{ fontWeight: 900 }}
          >
            Benny's
          </Link>

          {/* Right: User + Cart */}
          <div className="ml-auto flex items-center gap-3">
            <button className="p-2">
              <User className="h-4 w-4 text-black" />
            </button>
            <Link href="/cart" className="relative p-2">
              <ShoppingBag className="h-4 w-4 text-black" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Search Bar - Absolutely positioned, hides on scroll */}
      <div 
        className={`fixed top-[104px] left-0 right-0 z-40 bg-white transition-all duration-300 md:hidden ${
          showSearch ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="px-4 pb-3 pt-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Search for Men Show SS26"
              className="w-full rounded-full border border-neutral-300 bg-neutral-50 py-2.5 pl-10 pr-4 text-[13px] text-black placeholder:text-neutral-400 focus:border-black focus:outline-none"
            />
          </div>
        </div>
      </div>
    </>
  )
}
