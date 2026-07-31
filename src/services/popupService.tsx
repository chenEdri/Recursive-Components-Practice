import type { ReactNode } from 'react'
import { PromptDialog } from '@/components/common/popup/PromptDialog'
import type { PopupOptions, PromptOptions } from '@/components/common/popup/types'

interface PopupState {
  content: ReactNode
  options: PopupOptions
}

let currentPopup: PopupState | null = null
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): PopupState | null {
  return currentPopup
}

function open(content: ReactNode, options: PopupOptions = {}): void {
  currentPopup = { content, options }
  notify()
}

function close(): void {
  const dismiss = currentPopup?.options.onDismiss
  currentPopup = null
  notify()
  dismiss?.()
}

function prompt(options: PromptOptions): Promise<string | null> {
  return new Promise((resolve) => {
    let settled = false
    const settle = (value: string | null) => {
      if (settled) return
      settled = true
      resolve(value)
    }

    const handleCancel = () => {
      settle(null)
      close()
    }

    const handleConfirm = (value: string) => {
      settle(value)
      close()
    }

    open(<PromptDialog {...options} onConfirm={handleConfirm} onCancel={handleCancel} />, {
      closeOnOverlayClick: true,
      closeOnEscape: true,
      onDismiss: handleCancel,
      ariaLabel: options.title,
    })
  })
}

export const popupService = { subscribe, getSnapshot, open, close, prompt }
