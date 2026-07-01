import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  slug: string
}

interface WishlistState {
  items: WishlistItem[]
  isOpen: boolean
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  hasItem: (id: string) => boolean
  clearWishlist: () => void
  toggleWishlist: () => void
  openWishlist: () => void
  closeWishlist: () => void
  getItemCount: () => number
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) return state // Don't add duplicate
          return { items: [...state.items, item] }
        })
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }))
      },
      
      hasItem: (id) => {
        const state = get()
        return state.items.some((i) => i.id === id)
      },
      
      clearWishlist: () => set({ items: [] }),
      
      toggleWishlist: () => set((state) => ({ isOpen: !state.isOpen })),
      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),
      
      getItemCount: () => {
        const state = get()
        return state.items.length
      },
    }),
    {
      name: 'aastha-wishlist-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
