import type { ReactNode } from 'react'

export interface PopupOptions {
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  ariaLabel?: string
  onDismiss?: () => void
}

export interface PopupWidgetProps {
  isOpen: boolean
  onClose: () => void
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  ariaLabel?: string
  children: ReactNode
}

export interface PromptOptions {
  title: string
  label?: string
  placeholder?: string
  defaultValue?: string
  confirmText?: string
  cancelText?: string
  validate?: (value: string) => string | null | undefined
}

export interface PromptDialogProps extends PromptOptions {
  onConfirm: (value: string) => void
  onCancel: () => void
}
