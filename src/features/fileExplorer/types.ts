import type { FileExplorerActionType, NodeType } from './constants'

export interface FileSystemNode {
  id: string
  name: string
  type: NodeType
  children?: FileSystemNode[]
}

export interface FileExplorerState {
  tree: FileSystemNode
  expandedIds: Set<string>
  selectedId: string | null
}

export type FileExplorerAction =
  | { type: typeof FileExplorerActionType.TOGGLE_EXPAND; id: string }
  | { type: typeof FileExplorerActionType.SELECT_NODE; id: string }
  | { type: typeof FileExplorerActionType.ADD_NODE; parentId: string; nodeType: NodeType; name: string }
