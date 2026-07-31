import { NodeType } from './constants'
import type { FileSystemNode } from './types'

export const initialData: FileSystemNode = {
  id: 'root',
  name: 'Root',
  type: NodeType.FOLDER,
  children: [
    {
      id: 'src',
      name: 'src',
      type: NodeType.FOLDER,
      children: [
        { id: 'index.ts', name: 'index.ts', type: NodeType.FILE },
        { id: 'app.tsx', name: 'app.tsx', type: NodeType.FILE },
      ],
    },
    {
      id: 'package.json',
      name: 'package.json',
      type: NodeType.FILE,
    },
  ],
}
