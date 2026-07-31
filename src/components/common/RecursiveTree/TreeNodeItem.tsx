import { ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import styles from './RecursiveTree.module.scss'
import type { TreeRenderProps, TreeNodeItemProps } from './types'

export function TreeNodeItem<T = Record<string, unknown>>({
  node,
  depth,
  treeState,
  onNodeSelect,
  renderNode,
}: TreeNodeItemProps<T>) {
  const hasChildren = Boolean(node.children && node.children.length > 0)
  const expanded = treeState.isExpanded(node.id)
  const selected = treeState.isSelected(node.id)

  const handleToggle = () => {
    if (hasChildren) {
      treeState.toggleNode(node.id)
    }
  }

  const handleSelect = () => {
    treeState.selectNode(node.id)
    onNodeSelect?.(node)
  }

  const renderProps: TreeRenderProps<T> = {
    node,
    depth,
    isExpanded: expanded,
    isSelected: selected,
    onToggle: handleToggle,
    onSelect: handleSelect,
  }

  return (
    <li className={styles.nodeItem} role="treeitem" aria-expanded={hasChildren ? expanded : undefined}>
      {renderNode ? (
        renderNode(renderProps)
      ) : (
        <div
          className={cn(styles.nodeRow, selected && styles.selected)}
          style={{ '--depth': depth } as React.CSSProperties}
          onClick={handleSelect}
        >
          {hasChildren ? (
            <button
              type="button"
              className={cn(styles.toggle, expanded && styles.expanded)}
              onClick={(event) => {
                event.stopPropagation()
                handleToggle()
              }}
              aria-label={expanded ? 'Collapse node' : 'Expand node'}
            >
              <ChevronRight size={14} />
            </button>
          ) : (
            <span className={styles.leafSpacer}>
              <span className={styles.leafIndicator} />
            </span>
          )}
          <span className={styles.label}>{node.label}</span>
        </div>
      )}

      {hasChildren && expanded && (
        <ul className={styles.list}>
          {node.children!.map((child) => (
            <TreeNodeItem<T>
              key={child.id}
              node={child}
              depth={depth + 1}
              treeState={treeState}
              onNodeSelect={onNodeSelect}
              renderNode={renderNode}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
