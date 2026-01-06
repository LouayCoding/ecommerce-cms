import Link from 'next/link'
import { logoutAction } from '@/lib/actions/auth'
import { Button } from '@/components/ui/button'

export function AdminNav() {
  return (
    <nav className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-[1600px] px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/admin" 
            className="text-[11px] font-medium uppercase tracking-normal text-[var(--color-text-primary)] transition-opacity hover:opacity-60"
          >
            Benny's Admin
          </Link>

          {/* Main Navigation */}
          <nav className="flex items-center gap-12">
            <Link 
              href="/admin" 
              className="text-[13px] tracking-wide text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              Dashboard
            </Link>
            <Link 
              href="/admin/products" 
              className="text-[13px] tracking-wide text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              Producten
            </Link>
            <Link 
              href="/admin/categories" 
              className="text-[13px] tracking-wide text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              Categorieën
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className="text-[13px] tracking-wide text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              Bekijk winkel
            </Link>
            <form action={logoutAction}>
              <Button variant="ghost" size="sm" type="submit">
                Uitloggen
              </Button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}
