import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Button, ButtonSize, ButtonVariant } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import styles from './PromptDialog.module.scss'
import type { PromptDialogProps } from './types'

export function PromptDialog({
  title,
  label,
  placeholder,
  defaultValue = '',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  validate,
  onConfirm,
  onCancel,
}: PromptDialogProps) {
  const [value, setValue] = useState(defaultValue)

  const trimmed = value.trim()
  const validationError = trimmed.length > 0 ? validate?.(trimmed) : undefined
  const isInvalid = trimmed.length === 0 || Boolean(validationError)

  const handleSubmit = () => {
    if (isInvalid) return
    onConfirm(trimmed)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSubmit()
  }

  return (
    <div className={styles.prompt}>
      <h2 className={styles.title}>{title}</h2>
      <Input
        label={label}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        error={validationError ?? undefined}
        autoFocus
      />
      <div className={styles.actions}>
        <Button variant={ButtonVariant.SECONDARY} size={ButtonSize.SM} onClick={onCancel}>
          {cancelText}
        </Button>
        <Button
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.SM}
          disabled={isInvalid}
          onClick={handleSubmit}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  )
}
