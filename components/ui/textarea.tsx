import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full border border-[var(--color-border-medium)] bg-transparent px-4 py-4',
          'text-[15px] leading-relaxed tracking-wide text-[var(--color-text-primary)]',
          'placeholder:text-[var(--color-text-tertiary)]',
          'transition-colors duration-200',
          'focus:border-[var(--color-text-primary)] focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-40',
          'resize-y',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
