import { AlertTriangle } from 'lucide-react'
import { cn } from '@/utils/cn'
import styles from './ErrorBox.module.scss'
import type { ErrorBoxProps } from './types'

export function ErrorBox({ message, className }: ErrorBoxProps) {
  return (
    <div role="alert" className={cn(styles.box, className)}>
      <AlertTriangle size={18} className={styles.icon} />
      <span>{message}</span>
    </div>
  )
}
