import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import styles from './Loader.module.scss'
import type { LoaderProps } from './types'

export function Loader({ size = 24, className }: LoaderProps) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <Loader2 size={size} className={styles.spinner} />
    </div>
  )
}
