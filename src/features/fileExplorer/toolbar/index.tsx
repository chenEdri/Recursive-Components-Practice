import { Button, ButtonSize, ButtonVariant } from '@/components/common/Button'
import styles from './styles.module.scss'
import type { ToolbarProps } from './types'

export function Toolbar({ disabled, onAddFile, onAddFolder }: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <Button variant={ButtonVariant.SECONDARY} size={ButtonSize.SM} disabled={disabled} onClick={onAddFile}>
        Add File
      </Button>
      <Button variant={ButtonVariant.SECONDARY} size={ButtonSize.SM} disabled={disabled} onClick={onAddFolder}>
        Add Folder
      </Button>
    </div>
  )
}
