import type { FileSystemNode } from './types'

export const initialData: FileSystemNode = {
  id: 'root',
  name: 'Root',
  type: 'folder',
  children: [
    {
      id: 'src',
      name: 'src',
      type: 'folder',
      children: [
        { id: 'index.ts', name: 'index.ts', type: 'file' },
        { id: 'app.tsx', name: 'app.tsx', type: 'file' },
      ],
    },
    {
      id: 'package.json',
      name: 'package.json',
      type: 'file',
    },
  ],
}
