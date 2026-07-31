import { useEffect, useReducer } from 'react'
import { popupService } from '@/services/popupService'
import { treeStorageService } from '@/services/treeStorageService'
import { initialData } from './data'
import { countDefaultNamedChildren, defaultName, findNode, insertChild } from './helpers'
import type { FileExplorerAction, FileExplorerState, FileSystemNode, NodeType } from './types'

const initialState: FileExplorerState = {
  tree: initialData,
  expandedIds: new Set([initialData.id]),
  selectedId: null,
}

function fileTreeReducer(state: FileExplorerState, action: FileExplorerAction): FileExplorerState {
  switch (action.type) {
    case 'TOGGLE_EXPAND': {
      const next = new Set(state.expandedIds)
      if (next.has(action.id)) {
        next.delete(action.id)
      } else {
        next.add(action.id)
      }
      return { ...state, expandedIds: next }
    }
    case 'SELECT_NODE':
      return { ...state, selectedId: action.id }
    case 'ADD_NODE': {
      const parent = findNode(state.tree, action.parentId)
      if (!parent || parent.type !== 'folder') return state

      const newNode: FileSystemNode = {
        id: crypto.randomUUID(),
        name: action.name,
        type: action.nodeType,
        ...(action.nodeType === 'folder' ? { children: [] } : {}),
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
    const suggested = defaultName(nodeType, countDefaultNamedChildren(selectedNode, nodeType))

    const name = await popupService.prompt({
      title: nodeType === 'file' ? 'New File' : 'New Folder',
      label: nodeType === 'file' ? 'File name' : 'Folder name',
      defaultValue: suggested,
      confirmText: 'Create',
    })
    if (name === null) return

    dispatch({ type: 'ADD_NODE', parentId, nodeType, name: name.trim() })
  }

  return {
    tree: state.tree,
    expandedIds: state.expandedIds,
    selectedId: state.selectedId,
    selectedNode,
    canAddToSelection: selectedNode?.type === 'folder',
    toggleExpand: (id: string) => dispatch({ type: 'TOGGLE_EXPAND', id }),
    selectNode: (id: string) => dispatch({ type: 'SELECT_NODE', id }),
    addFile: () => addNode('file'),
    addFolder: () => addNode('folder'),
  }
}
