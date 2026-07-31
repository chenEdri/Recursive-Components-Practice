import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export interface Post {
  id: number
  title: string
  body: string
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await api.get<Post[]>('/posts')
      return data
    },
  })
}
