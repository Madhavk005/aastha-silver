import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface RecentlyViewedItem {
  id: string
  name: string
  price: number
  image: string
  slug: string
  viewedAt: number
}

interface RecentlyViewedState {
  items: RecentlyViewedItem[]
  addItem: (item: Omit<RecentlyViewedItem, 'viewedAt'>) => void
  clearRecentlyViewed: () => void
}

const MAX_ITEMS = 8

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const filtered = state.items.filter((i) => i.id !== item.id)
          return {
            items: [{ ...item, viewedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS),
          }
        })
      },

      clearRecentlyViewed: () => set({ items: [] }),
    }),
    {
      name: 'aastha-recently-viewed-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
