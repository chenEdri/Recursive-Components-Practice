import { DetailPanel } from './detailPanel'
import { FileTreeNode } from './fileTreeNode'
import { useFileTreeManager } from './hook'
import styles from './styles.module.scss'
import { Toolbar } from './toolbar'

export function FileExplorer() {
  const {
    tree,
    expandedIds,
    selectedId,
    selectedNode,
    canAddToSelection,
    toggleExpand,
    selectNode,
    addFile,
    addFolder,
  } = useFileTreeManager()

  return (
    <div className={styles.explorer}>
      <Toolbar disabled={!canAddToSelection} onAddFile={addFile} onAddFolder={addFolder} />
      <div className={styles.panes}>
        <div className={styles.treePane}>
          <FileTreeNode
            node={tree}
            depth={0}
            expandedIds={expandedIds}
            selectedId={selectedId}
            onToggle={toggleExpand}
            onSelect={selectNode}
          />
        </div>
        <div className={styles.detailPane}>
          <DetailPanel node={selectedNode} />
        </div>
      </div>
    </div>
  )
}
