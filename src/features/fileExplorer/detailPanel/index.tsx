import styles from './styles.module.scss'
import type { DetailPanelProps } from './types'

export function DetailPanel({ node }: DetailPanelProps) {
  if (!node) {
    return <p className={styles.empty}>No node selected.</p>
  }

  return (
    <dl className={styles.details}>
      <dt>Name</dt>
      <dd>{node.name}</dd>

      <dt>Type</dt>
      <dd>{node.type}</dd>

      <dt>ID</dt>
      <dd>{node.id}</dd>
    </dl>
  )
}
