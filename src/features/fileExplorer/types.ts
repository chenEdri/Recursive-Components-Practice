export type NodeType = 'file' | 'folder'

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
  | { type: 'TOGGLE_EXPAND'; id: string }
  | { type: 'SELECT_NODE'; id: string }
  | { type: 'ADD_NODE'; parentId: string; nodeType: NodeType }
