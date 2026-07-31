import type { FileSystemNode, NodeType } from './types'

export function insertChild(root: FileSystemNode, parentId: string, newNode: FileSystemNode): FileSystemNode {
  if (root.id === parentId) {
    if (root.type !== 'folder') return root
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
  return type === 'file' ? 'New File' : 'New Folder'
}

export function countDefaultNamedChildren(folder: FileSystemNode, type: NodeType): number {
  const base = defaultNameBase(type)
  return (folder.children ?? []).filter((child) => child.type === type && child.name.startsWith(base)).length
}

export function defaultName(type: NodeType, existingDefaultNamedCount: number): string {
  const base = defaultNameBase(type)
  return existingDefaultNamedCount === 0 ? base : `${base} (${existingDefaultNamedCount + 1})`
}
