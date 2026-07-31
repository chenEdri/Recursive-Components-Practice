import { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import styles from './Input.module.scss'
import type { InputProps } from './types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <div className={styles.field}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(styles.input, error && styles.hasError, className)}
          {...props}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
