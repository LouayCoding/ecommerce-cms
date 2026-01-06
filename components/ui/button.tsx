import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles - luxury minimal
          'inline-flex items-center justify-center font-medium tracking-wide uppercase',
          'transition-all duration-200 ease-out',
          'disabled:pointer-events-none disabled:opacity-40',
          'focus-visible:outline-none focus-visible:outline-1 focus-visible:outline-offset-2',
          
          // Variant styles
          {
            // Primary - solid black
            'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]': 
              variant === 'primary',
            
            // Secondary - outline
            'border border-[var(--color-border-medium)] bg-transparent hover:bg-[var(--color-bg-tertiary)]': 
              variant === 'secondary',
            
            // Ghost - minimal
            'hover:bg-[var(--color-bg-tertiary)]': 
              variant === 'ghost',
            
            // Destructive - subtle red
            'bg-neutral-900 text-white hover:bg-red-900': 
              variant === 'destructive',
          },
          
          // Size styles
          {
            'h-9 px-4 text-[11px] tracking-widest': size === 'sm',
            'h-11 px-6 text-[13px] tracking-wider': size === 'md',
            'h-14 px-8 text-[13px] tracking-widest': size === 'lg',
          },
          
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
