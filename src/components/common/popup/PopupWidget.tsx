import { useEffect } from 'react'
import type { MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import styles from './PopupWidget.module.scss'
import type { PopupWidgetProps } from './types'

export function PopupWidget({
  isOpen,
  onClose,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  ariaLabel,
  children,
}: PopupWidgetProps) {
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeOnEscape, onClose])

  if (!isOpen) return null

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) onClose()
  }

  const handlePanelClick = (event: MouseEvent) => {
    event.stopPropagation()
  }

  return createPortal(
    <div className={styles.overlay} onMouseDown={handleOverlayClick}>
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label={ariaLabel} onMouseDown={handlePanelClick}>
        {children}
      </div>
    </div>,
    document.body,
  )
}
