import { findNode } from '@/features/fileExplorer/helpers'
import type { FileExplorerState, FileSystemNode } from '@/features/fileExplorer/types'

const STORAGE_KEY = 'fileExplorer:state:v1'

interface PersistedShape {
  version: 1
  tree: FileSystemNode
  expandedIds: string[]
  selectedId: string | null
}

function loadState(): FileExplorerState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<PersistedShape>
    if (parsed.version !== 1 || !parsed.tree?.id || !Array.isArray(parsed.expandedIds)) return null

    const selectedId = parsed.selectedId ?? null
    const resolvedSelectedId = selectedId && findNode(parsed.tree, selectedId) ? selectedId : null

    return {
      tree: parsed.tree,
      expandedIds: new Set(parsed.expandedIds),
      selectedId: resolvedSelectedId,
    }
  } catch {
    return null
  }
}

function saveState(state: FileExplorerState): void {
  try {
    const payload: PersistedShape = {
      version: 1,
      tree: state.tree,
      expandedIds: Array.from(state.expandedIds),
      selectedId: state.selectedId,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // best-effort persistence; ignore quota/availability errors
  }
}

function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export const treeStorageService = { loadState, saveState, clearState }
