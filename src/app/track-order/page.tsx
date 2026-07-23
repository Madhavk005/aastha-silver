"use client";

import React, { useState, useCallback } from "react";
import { Search, Package } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

interface TimelineEvent {
  label: string;
  date: string;
  completed: boolean;
  icon: React.ElementType;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  items: OrderItem[];
  total: number;
  shipping: { name: string; address: string };
  timeline: TimelineEvent[];
  date: string;
}



export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(orderId.trim())}`);
      const data = await res.json();
      setOrder(data.order || null);
    } catch {
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <Package className="w-8 h-8 mx-auto mb-6 text-foreground/30 stroke-[1]" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Track Your Order</h1>
          <p className="text-foreground/50 text-sm font-light max-w-md mx-auto">
            Enter your order ID to see the current status and delivery timeline.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex gap-4 mb-16"
        >
          <div className="flex-1">
            <Input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter order ID (e.g. AS-2024-0001)"
              className="w-full h-14 bg-transparent border border-foreground/20 px-6 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors rounded-xl"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !orderId.trim()}
            className="h-14 px-8 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-[0.2em] text-[10px] font-medium transition-all rounded-xl flex items-center gap-3"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
            {loading ? "Searching..." : "Track"}
          </button>
        </motion.form>

        {/* Results */}
        {searched && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {order ? (
              <div className="space-y-8">
                {/* Status Card */}
                <div className="border border-foreground/5 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-1">Order</p>
                      <h2 className="font-serif text-2xl text-foreground">{order.id}</h2>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.15em] font-medium px-4 py-2 bg-foreground/5 text-foreground/70">
                      {order.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-[1px] bg-foreground/10 mb-8">
                    <div className="h-full bg-foreground/50 transition-all duration-1000" style={{ width: `${(order.timeline.filter(t => t.completed).length / order.timeline.length) * 100}%` }} />
                  </div>

                  {/* Timeline */}
                  <div className="relative">
                    {order.timeline.map((event, idx) => {
                      const Icon = event.icon;
                      return (
                        <div key={event.label} className="flex items-start gap-4 pb-8 last:pb-0 relative">
                          {idx < order.timeline.length - 1 && (
                            <div className={`absolute left-[15px] top-8 w-[1px] h-[calc(100%-32px)] ${event.completed ? 'bg-foreground/30' : 'bg-foreground/5'}`} />
                          )}
                          <div className={`relative z-10 w-8 h-8 flex items-center justify-center ${event.completed ? 'bg-foreground text-background' : 'bg-foreground/5 text-foreground/30'}`}>
                            <Icon className="w-4 h-4 stroke-[1.5]" />
                          </div>
                          <div className="flex-1 pt-1.5">
                            <p className={`text-sm font-medium ${event.completed ? 'text-foreground' : 'text-foreground/30'}`}>
                              {event.label}
                            </p>
                            {event.date && (
                              <p className="text-xs text-foreground/40 font-light mt-0.5">{event.date}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border border-foreground/5 p-8">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/60 mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-foreground/70 font-light">{item.name} <span className="text-foreground/40">x{item.quantity}</span></span>
                        <span className="text-foreground font-medium">₹{item.price.toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-foreground/5 flex justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/60">Total</span>
                    <span className="font-serif text-xl text-foreground">₹{order.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="border border-foreground/5 p-8">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/60 mb-4">Shipping Details</h3>
                  <p className="text-sm text-foreground/70 font-light">{order.shipping.name}</p>
                  <p className="text-sm text-foreground/50 font-light">{order.shipping.address}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 border border-foreground/5">
                <Search className="w-8 h-8 mx-auto mb-4 stroke-[1] text-foreground/20" />
                <h3 className="font-serif text-xl text-foreground mb-2">Order Not Found</h3>
                <p className="text-foreground/40 text-sm font-light">
                  No order matches the ID you entered. Please check and try again.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
