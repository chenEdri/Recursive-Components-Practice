import type { FileSystemNode } from '../types'

export interface FileTreeNodeProps {
  node: FileSystemNode
  depth: number
  expandedIds: Set<string>
  selectedId: string | null
  onToggle: (id: string) => void
  onSelect: (id: string) => void
}
