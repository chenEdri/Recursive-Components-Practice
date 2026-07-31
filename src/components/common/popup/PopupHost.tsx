import { useSyncExternalStore } from 'react'
import { popupService } from '@/services/popupService'
import { PopupWidget } from './PopupWidget'

export function PopupHost() {
  const popup = useSyncExternalStore(popupService.subscribe, popupService.getSnapshot)

  if (!popup) return null

  return (
    <PopupWidget
      isOpen
      onClose={() => popupService.close()}
      closeOnOverlayClick={popup.options.closeOnOverlayClick}
      closeOnEscape={popup.options.closeOnEscape}
      ariaLabel={popup.options.ariaLabel}
    >
      {popup.content}
    </PopupWidget>
  )
}
