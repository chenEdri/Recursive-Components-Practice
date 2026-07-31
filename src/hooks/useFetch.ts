import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import { api } from '@/services/api'

export function useFetch<T>(
  endpoint: string,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>,
) {
  const { data, isLoading, isError, error } = useQuery<T, Error>({
    queryKey: [endpoint],
    queryFn: async () => {
      const response = await api.get<T>(endpoint)
      return response.data
    },
    enabled: Boolean(endpoint),
    ...options,
  })

  return { data, isLoading, isError, error }
}
