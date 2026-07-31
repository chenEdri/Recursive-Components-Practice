import { NEW_NODE_TITLE, NodeType } from './constants'
import type { FileSystemNode } from './types'

export function insertChild(root: FileSystemNode, parentId: string, newNode: FileSystemNode): FileSystemNode {
  if (root.id === parentId) {
    if (root.type !== NodeType.FOLDER) return root
    return { ...root, children: [...(root.children ?? []), newNode] }
  }

  if (!root.children) return root

  let changed = false
  const nextChildren = root.children.map((child) => {
    const updated = insertChild(child, parentId, newNode)
    if (updated !== child) changed = true
    return updated
  })

  return changed ? { ...root, children: nextChildren } : root
}

export function findNode(root: FileSystemNode, id: string): FileSystemNode | undefined {
  if (root.id === id) return root

  for (const child of root.children ?? []) {
    const found = findNode(child, id)
    if (found) return found
  }

  return undefined
}

function defaultNameBase(type: NodeType): string {
  return NEW_NODE_TITLE[type]
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function defaultName(folder: FileSystemNode, type: NodeType): string {
  const base = defaultNameBase(type)
  const pattern = new RegExp(`^${escapeRegExp(base)}(?: \\((\\d+)\\))?$`)
  const count = (folder.children ?? []).filter((child) => child.type === type && pattern.test(child.name)).length
  return count === 0 ? base : `${base} (${count + 1})`
}

export function isNameTaken(folder: FileSystemNode, name: string): boolean {
  return (folder.children ?? []).some((child) => child.name === name)
}
