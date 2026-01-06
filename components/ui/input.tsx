import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full border-b border-[var(--color-border-medium)] bg-transparent px-0 py-3',
          'text-[15px] tracking-wide text-[var(--color-text-primary)]',
          'placeholder:text-[var(--color-text-tertiary)]',
          'transition-colors duration-200',
          'focus:border-[var(--color-text-primary)] focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-40',
          'file:border-0 file:bg-transparent file:text-[13px] file:font-medium',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
