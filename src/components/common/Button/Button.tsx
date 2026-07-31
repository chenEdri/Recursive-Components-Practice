import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import styles from './Button.module.scss'
import { ButtonSize, ButtonVariant } from './constants'
import type { ButtonProps } from './types'

const spinnerSizes: Record<ButtonSize, number> = {
  [ButtonSize.SM]: 14,
  [ButtonSize.MD]: 16,
  [ButtonSize.LG]: 18,
}

export function Button({
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MD,
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
