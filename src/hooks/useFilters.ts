import { useState } from 'react'

export type SortOrder = 'asc' | 'desc'

export interface Filters {
  search: string
  sortOrder: SortOrder
  page: number
}

const DEFAULT_FILTERS: Filters = {
  search: '',
  sortOrder: 'asc',
  page: 1,
}

export function useFilters(initialFilters?: Partial<Filters>) {
  const [filters, setFilters] = useState<Filters>({ ...DEFAULT_FILTERS, ...initialFilters })

  const updateFilters = (updates: Partial<Filters>) => {
    setFilters((prev) => {
      const shouldResetPage =
        updates.page === undefined && (updates.search !== undefined || updates.sortOrder !== undefined)

      return {
        ...prev,
        ...updates,
        page: shouldResetPage ? 1 : (updates.page ?? prev.page),
      }
    })
  }

  const resetFilters = () => setFilters({ ...DEFAULT_FILTERS, ...initialFilters })

  return { filters, updateFilters, resetFilters }
}
