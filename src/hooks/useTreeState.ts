import { useCallback, useMemo, useState } from 'react'
import type { TreeNode } from '@/components/common/RecursiveTree/types'

export interface UseTreeStateOptions {
  defaultExpandedIds?: string[]
  defaultSelectedId?: string | null
}

export interface TreeState<T = Record<string, unknown>> {
  expandedIds: Set<string>
  selectedId: string | null
  toggleNode: (id: string) => void
  selectNode: (id: string) => void
  expandAll: (nodes: TreeNode<T>[]) => void
  collapseAll: () => void
  isExpanded: (id: string) => boolean
  isSelected: (id: string) => boolean
}

function collectIds<T>(nodes: TreeNode<T>[]): string[] {
  const ids: string[] = []

  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      ids.push(node.id)
      ids.push(...collectIds(node.children))
    }
  }

  return ids
}

export function useTreeState<T = Record<string, unknown>>(
  options?: UseTreeStateOptions,
): TreeState<T> {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(options?.defaultExpandedIds ?? []),
  )
  const [selectedId, setSelectedId] = useState<string | null>(
    options?.defaultSelectedId ?? null,
  )

  const toggleNode = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const selectNode = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  const expandAll = useCallback((nodes: TreeNode<T>[]) => {
    setExpandedIds(new Set(collectIds(nodes)))
  }, [])

  const collapseAll = useCallback(() => {
    setExpandedIds(new Set())
  }, [])

  const isExpanded = useCallback(
    (id: string) => expandedIds.has(id),
    [expandedIds],
  )

  const isSelected = useCallback(
    (id: string) => selectedId === id,
    [selectedId],
  )

  return useMemo(
    () => ({
      expandedIds,
      selectedId,
      toggleNode,
      selectNode,
      expandAll,
      collapseAll,
      isExpanded,
      isSelected,
    }),
    [expandedIds, selectedId, toggleNode, selectNode, expandAll, collapseAll, isExpanded, isSelected],
  )
}
