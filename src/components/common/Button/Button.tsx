import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import styles from './Button.module.scss'
import type { ButtonProps, ButtonSize } from './types'

const spinnerSizes: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles.btn, styles[variant], styles[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 size={spinnerSizes[size]} className={styles.spinner} />}
      {children}
    </button>
  )
}
