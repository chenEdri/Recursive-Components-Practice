import type { ReactNode } from 'react'
import type { TreeState } from '@/hooks/useTreeState'

export interface TreeNode<T = Record<string, unknown>> {
  id: string
  label: string
  children?: TreeNode<T>[]
  data?: T
}

export interface TreeRenderProps<T = Record<string, unknown>> {
  node: TreeNode<T>
  depth: number
  isExpanded: boolean
  isSelected: boolean
  onToggle: () => void
  onSelect: () => void
}

export interface RecursiveTreeProps<T = Record<string, unknown>> {
  data: TreeNode<T>[]
  onNodeSelect?: (node: TreeNode<T>) => void
  renderNode?: (props: TreeRenderProps<T>) => ReactNode
  treeState?: TreeState<T>
  className?: string
  emptyMessage?: string
}

export interface TreeNodeItemProps<T = Record<string, unknown>> {
  node: TreeNode<T>
  depth: number
  treeState: TreeState<T>
  onNodeSelect?: (node: TreeNode<T>) => void
  renderNode?: (props: TreeRenderProps<T>) => ReactNode
}
