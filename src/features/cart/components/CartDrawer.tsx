"use client"

import { useCartStore } from "@/store/cart-store"
import { formatCurrency } from "@/lib/utils"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CartDrawer() {
  const { 
    isOpen, 
    closeCart, 
    items, 
    removeItem, 
    updateQuantity, 
    getTotal, 
    getItemCount 
  } = useCartStore()

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" 
        onClick={closeCart}
      />
      
      <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#FDFCF8] shadow-2xl z-50 flex flex-col transform transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-black/5">
          <h2 className="uppercase tracking-[0.2em] text-[10px] text-[#1A1D1A] font-medium flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            Your Cart ({getItemCount()})
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 -mr-2 text-gray-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#F5F3EC] flex items-center justify-center text-black mb-2">
                <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
              </div>
              <p className="font-serif text-3xl text-[#1A1D1A]">Your cart is empty.</p>
              <p className="text-gray-500 text-sm font-light max-w-xs">Discover our elegant collections to find your next piece.</p>
              <Button onClick={closeCart} className="mt-8 bg-transparent border-black text-black hover:bg-black hover:text-white rounded-none px-10 py-6 uppercase tracking-[0.15em] text-[10px] transition-colors" variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 md:gap-6">
                  <div className="relative w-24 h-28 md:w-28 md:h-32 bg-[#F5F3EC] overflow-hidden flex-shrink-0 rounded-2xl">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <Link 
                          href={`/product/${item.slug}`} 
                          onClick={closeCart}
                          className="font-serif text-xl text-[#1A1D1A] hover:text-gray-500 transition-colors leading-tight"
                        >
                          {item.name}
                        </Link>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors mt-1"
                        >
                          <X className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>
                      <p className="text-gray-500 text-sm mt-2 font-light">{formatCurrency(item.price)}</p>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-black/10 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-2.5 text-gray-400 hover:text-black transition-colors"
                        >
                          <Minus className="w-3 h-3 stroke-[1.5]" />
                        </button>
                        <span className="w-8 text-center text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2.5 text-gray-400 hover:text-black transition-colors"
                        >
                          <Plus className="w-3 h-3 stroke-[1.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-black/5 p-6 md:p-8 bg-white">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <span className="uppercase tracking-[0.1em] text-xs font-medium text-[#1A1D1A]">Subtotal</span>
              <span className="text-lg font-light text-[#1A1D1A]">{formatCurrency(getTotal())}</span>
            </div>
            <p className="text-xs text-gray-400 mb-8 text-center font-light">Shipping and taxes calculated at checkout.</p>
            <Link 
              href="/checkout" 
              onClick={closeCart}
              className="w-full h-14 bg-black text-white hover:bg-black/80 rounded-full uppercase tracking-[0.1em] text-xs transition-colors shadow-lg flex items-center justify-center font-medium"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
