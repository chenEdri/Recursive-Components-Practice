import type { ButtonHTMLAttributes } from 'react'
import type { ButtonSize, ButtonVariant } from './constants'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}
