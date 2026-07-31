import { useTreeState } from '@/hooks/useTreeState'
import { TreeNodeItem } from './TreeNodeItem'
import styles from './RecursiveTree.module.scss'
import type { RecursiveTreeProps } from './types'

export function RecursiveTree<T = Record<string, unknown>>({
  data,
  onNodeSelect,
  renderNode,
  treeState: externalTreeState,
  className,
  emptyMessage = 'No items to display.',
}: RecursiveTreeProps<T>) {
  const internalTreeState = useTreeState<T>()
  const treeState = externalTreeState ?? internalTreeState

  if (data.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>
  }

  return (
    <div className={className ? `${styles.tree} ${className}` : styles.tree} role="tree">
      <ul className={styles.list}>
        {data.map((node) => (
          <TreeNodeItem<T>
            key={node.id}
            node={node}
            depth={0}
            treeState={treeState}
            onNodeSelect={onNodeSelect}
            renderNode={renderNode}
          />
        ))}
      </ul>
    </div>
  )
}
