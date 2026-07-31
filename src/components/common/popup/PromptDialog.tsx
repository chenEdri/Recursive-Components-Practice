import { useState } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
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
  const [submitError, setSubmitError] = useState<string | undefined>(undefined)

  const trimmed = value.trim()
  const isInvalid = trimmed.length === 0 || Boolean(submitError)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    if (submitError) setSubmitError(undefined)
  }

  const handleSubmit = () => {
    if (isInvalid) return
    const validationError = validate?.(trimmed)
    if (validationError) {
      setSubmitError(validationError)
      return
    }
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
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        error={submitError}
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
