import { memo, type CSSProperties, type MouseEvent } from 'react'
import { cn } from '@/utils/cn'
import { COLLAPSE_ICON, EXPAND_ICON, NodeType } from '../constants'
import styles from './styles.module.scss'
import type { FileTreeNodeProps } from './types'

function FileTreeNodeComponent({ node, depth, expandedIds, selectedId, onToggle, onSelect }: FileTreeNodeProps) {
  const isFolder = node.type === NodeType.FOLDER
  const isExpanded = expandedIds.has(node.id)
  const isSelected = selectedId === node.id

  const handleToggle = (event: MouseEvent) => {
    event.stopPropagation()
    onSelect(node.id)
    onToggle(node.id)
  }

  return (
    <div className={styles.node}>
      <div
        className={cn(styles.row, isSelected && styles.selected)}
        style={{ '--depth': depth } as CSSProperties}
        onClick={() => onSelect(node.id)}
      >
        {isFolder ? (
          <span className={styles.toggle} onClick={handleToggle}>
            {isExpanded ? COLLAPSE_ICON : EXPAND_ICON}
          </span>
        ) : (
          <span className={styles.togglePlaceholder} />
        )}
        <span className={styles.name}>{node.name}</span>
      </div>

      {isFolder && isExpanded && node.children && node.children.length > 0 && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const FileTreeNode = memo(FileTreeNodeComponent)
