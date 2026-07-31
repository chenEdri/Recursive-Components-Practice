import { useEffect, useReducer } from 'react'
import { popupService } from '@/services/popupService'
import { treeStorageService } from '@/services/treeStorageService'
import { FileExplorerActionType, NEW_NODE_TITLE, NODE_NAME_FIELD_LABEL, NodeType } from './constants'
import { initialData } from './data'
import { defaultName, findNode, insertChild, isNameTaken } from './helpers'
import type { FileExplorerAction, FileExplorerState, FileSystemNode } from './types'

const initialState: FileExplorerState = {
  tree: initialData,
  expandedIds: new Set([initialData.id]),
  selectedId: null,
}

function fileTreeReducer(state: FileExplorerState, action: FileExplorerAction): FileExplorerState {
  switch (action.type) {
    case FileExplorerActionType.TOGGLE_EXPAND: {
      const next = new Set(state.expandedIds)
      if (next.has(action.id)) {
        next.delete(action.id)
      } else {
        next.add(action.id)
      }
      return { ...state, expandedIds: next }
    }
    case FileExplorerActionType.SELECT_NODE:
      return { ...state, selectedId: action.id }
    case FileExplorerActionType.ADD_NODE: {
      const parent = findNode(state.tree, action.parentId)
      if (!parent || parent.type !== NodeType.FOLDER) return state

      const newNode: FileSystemNode = {
        id: crypto.randomUUID(),
        name: action.name,
        type: action.nodeType,
        ...(action.nodeType === NodeType.FOLDER ? { children: [] } : {}),
      }

      return {
        ...state,
        tree: insertChild(state.tree, action.parentId, newNode),
        expandedIds: new Set(state.expandedIds).add(action.parentId),
      }
    }
    default:
      return state
  }
}

export function useFileTreeManager() {
  const [state, dispatch] = useReducer(
    fileTreeReducer,
    undefined,
    () => treeStorageService.loadState() ?? initialState,
  )
  const selectedNode = state.selectedId ? findNode(state.tree, state.selectedId) : undefined

  useEffect(() => {
    treeStorageService.saveState(state)
  }, [state])

  const addNode = async (nodeType: NodeType) => {
    if (!selectedNode) return
    const parentId = selectedNode.id
    const suggested = defaultName(selectedNode, nodeType)

    const name = await popupService.prompt({
      title: NEW_NODE_TITLE[nodeType],
      label: NODE_NAME_FIELD_LABEL[nodeType],
      defaultValue: suggested,
      confirmText: 'Create',
      validate: (value) => (isNameTaken(selectedNode, value) ? 'A file or folder with this name already exists' : undefined),
    })
    if (name === null) return

    dispatch({ type: FileExplorerActionType.ADD_NODE, parentId, nodeType, name: name.trim() })
  }

  return {
    tree: state.tree,
    expandedIds: state.expandedIds,
    selectedId: state.selectedId,
    selectedNode,
    canAddToSelection: selectedNode?.type === NodeType.FOLDER,
    toggleExpand: (id: string) => dispatch({ type: FileExplorerActionType.TOGGLE_EXPAND, id }),
    selectNode: (id: string) => dispatch({ type: FileExplorerActionType.SELECT_NODE, id }),
    addFile: () => addNode(NodeType.FILE),
    addFolder: () => addNode(NodeType.FOLDER),
  }
}
