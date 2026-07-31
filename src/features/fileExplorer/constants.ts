export const NodeType = {
  FILE: 'file',
  FOLDER: 'folder',
} as const
export type NodeType = (typeof NodeType)[keyof typeof NodeType]

export const FileExplorerActionType = {
  TOGGLE_EXPAND: 'TOGGLE_EXPAND',
  SELECT_NODE: 'SELECT_NODE',
  ADD_NODE: 'ADD_NODE',
} as const
export type FileExplorerActionType = (typeof FileExplorerActionType)[keyof typeof FileExplorerActionType]

export const NEW_NODE_TITLE: Record<NodeType, string> = {
  [NodeType.FILE]: 'New File',
  [NodeType.FOLDER]: 'New Folder',
}

export const NODE_NAME_FIELD_LABEL: Record<NodeType, string> = {
  [NodeType.FILE]: 'File name',
  [NodeType.FOLDER]: 'Folder name',
}

export const EXPAND_ICON = '[+]'
export const COLLAPSE_ICON = '[-]'
