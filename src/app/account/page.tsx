"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { Package, MapPin, User, Plus, X, Search, Loader2, LogOut, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";

type AccountTab = "profile" | "orders" | "addresses";

interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface SanityOrder {
  _id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  _createdAt: string;
  items: OrderItem[];
}

const EMPTY_ADDRESS = {
  label: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "India",
  phone: "",
};

const easing = [0.22, 1, 0.36, 1] as const;

function TabButton({ active, icon: Icon, label, onClick }: { active: boolean; icon: React.ElementType; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-3 transition-all duration-300 rounded-xl ${active
        ? "bg-foreground text-background shadow-lg shadow-foreground/10"
        : "text-foreground/50 hover:bg-foreground/[0.03] hover:text-foreground"
        }`}
    >
      <Icon className="w-4 h-4 stroke-[1.5]" />
      {label}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    delivered: "bg-emerald/10 text-emerald border-emerald/10",
    shipped: "bg-champagne/10 text-champagne border-champagne/10",
    processing: "bg-sage/10 text-sage border-sage/10",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/10",
  };
  return (
    <span className={`text-[9px] uppercase tracking-[0.15em] px-3 py-1.5 font-medium rounded-lg border ${colors[status] || "bg-foreground/10 text-foreground/70 border-foreground/10"}`}>
      {status}
    </span>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<AccountTab>("orders");
  const [orders, setOrders] = useState<SanityOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    if (!user) return;

    fetch("/api/orders", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setOrdersLoading(false));
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin stroke-[1] text-foreground/30" />
      </div>
    );
  }

  if (!isSignedIn) return null;

  const resetAddressForm = () => {
    setAddressForm(EMPTY_ADDRESS);
    setEditingAddress(null);
    setShowAddressForm(false);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(addresses.map((a) => (a.id === editingAddress ? { ...a, ...addressForm } : a)));
    } else {
      setAddresses([
        ...addresses,
        { ...addressForm, id: Date.now().toString(), isDefault: addresses.length === 0 },
      ]);
    }
    resetAddressForm();
  };

  const handleEditAddress = (addr: Address) => {
    setAddressForm(addr);
    setEditingAddress(addr.id);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const tabs: { key: AccountTab; label: string; icon: React.ElementType }[] = [
    { key: "orders", label: "Order History", icon: Package },
    { key: "addresses", label: "Addresses", icon: MapPin },
    { key: "profile", label: "Profile Details", icon: User },
  ];

  const orderItemCount = (items: OrderItem[]) =>
    items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easing }}
          className="flex flex-col md:flex-row md:items-start justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/30 mb-4 block font-medium">
              Account
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2 tracking-tight">
              My Account
            </h1>
            <p className="text-foreground/50 font-light text-sm">
              Welcome back, <span className="font-medium text-foreground">{user?.name || "Guest"}</span>.
            </p>
          </div>

          <button
            onClick={signOut}
            className="btn-ghost text-foreground/40"
          >
            <LogOut className="w-3.5 h-3.5 stroke-[1.5]" />
            Sign Out
          </button>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            className="lg:col-span-1 space-y-1"
          >
            {tabs.map((tab) => (
              <TabButton
                key={tab.key}
                active={activeTab === tab.key}
                icon={tab.icon}
                label={tab.label}
                onClick={() => setActiveTab(tab.key)}
              />
            ))}
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easing }}
            className="lg:col-span-3 space-y-8"
          >

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 font-medium">
                    {orders.length} Order{orders.length !== 1 ? "s" : ""}
                  </span>
                  <Link
                    href="/track-order"
                    className="btn-ghost gap-2"
                  >
                    <Search className="w-3.5 h-3.5 stroke-[1.5]" />
                    Track Order
                  </Link>
                </div>

                {ordersLoading ? (
                  <div className="bg-secondary p-20 text-center border border-foreground/5 rounded-2xl">
                    <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin stroke-[1] text-foreground/20" />
                    <p className="text-foreground/40 text-sm font-light">Loading your orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-background p-20 text-center border border-foreground/5 rounded-2xl">
                    <div className="w-16 h-16 rounded-2xl bg-foreground/[0.02] border border-foreground/5 flex items-center justify-center mx-auto mb-6">
                      <Package className="w-8 h-8 stroke-[1] text-foreground/20" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground mb-2">No Orders Yet</h3>
                    <p className="text-foreground/40 text-sm font-light mb-10">
                      {"You haven't placed any orders with us yet."}
                    </p>
                    <Link href="/shop" className="btn-primary">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="group bg-background border border-foreground/5 hover:border-foreground/15 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <span className="text-sm font-medium text-foreground">
                                {order.orderNumber}
                              </span>
                              <StatusBadge status={order.status} />
                            </div>
                            <p className="text-xs text-foreground/50 font-light flex items-center gap-2">
                              <Clock className="w-3 h-3 stroke-[1.5]" />
                              {new Date(order._createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                              <span className="text-foreground/20">&middot;</span>
                              {orderItemCount(order.items)}{" "}
                              {orderItemCount(order.items) === 1 ? "item" : "items"}
                            </p>
                          </div>
                          <div className="flex items-center gap-6">
                            <span className="font-serif text-lg text-foreground">
                              ₹{(order.totalAmount || 0).toLocaleString("en-IN")}
                            </span>
                            <ChevronRight className="w-4 h-4 text-foreground/10 stroke-[1.5] group-hover:text-foreground/30 transition-colors hidden md:block" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 font-medium">
                    {addresses.length} {addresses.length === 1 ? "Address" : "Addresses"}
                  </span>
                  <button
                    onClick={() => {
                      setShowAddressForm(true);
                      setEditingAddress(null);
                      setAddressForm(EMPTY_ADDRESS);
                    }}
                    className="btn-ghost gap-2"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
                    Add Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`border p-6 rounded-2xl relative ${addr.isDefault
                        ? "border-foreground/30 bg-foreground/[0.02]"
                        : "border-foreground/5 hover:border-foreground/20 bg-background"
                        } transition-all duration-300`}
                    >
                      {addr.isDefault && (
                        <span className="absolute top-4 right-4 text-[8px] uppercase tracking-[0.15em] font-medium text-champagne bg-champagne/10 px-2 py-1 rounded-lg">
                          Default
                        </span>
                      )}
                      <h3 className="text-sm font-medium text-foreground mb-1">{addr.label}</h3>
                      <p className="text-xs text-foreground/60 font-light">
                        {addr.firstName} {addr.lastName}
                      </p>
                      <p className="text-xs text-foreground/60 font-light">{addr.address}</p>
                      <p className="text-xs text-foreground/60 font-light">
                        {addr.city}, {addr.state} - {addr.zipCode}
                      </p>
                      <p className="text-xs text-foreground/60 font-light">{addr.phone}</p>
                      <div className="flex gap-4 mt-4 pt-4 border-t border-foreground/5">
                        <button
                          onClick={() => handleEditAddress(addr)}
                          className="text-[9px] uppercase tracking-[0.15em] font-medium text-foreground/50 hover:text-foreground transition-colors"
                        >
                          Edit
                        </button>
                        {!addr.isDefault && (
                          <>
                            <button
                              onClick={() => handleSetDefault(addr.id)}
                              className="text-[9px] uppercase tracking-[0.15em] font-medium text-foreground/50 hover:text-foreground transition-colors"
                            >
                              Set as Default
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="text-[9px] uppercase tracking-[0.15em] font-medium text-red-400/70 hover:text-red-500 transition-colors"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {addresses.length === 0 && (
                    <div className="col-span-full border border-foreground/5 p-20 text-center rounded-2xl">
                      <MapPin className="w-8 h-8 mx-auto mb-4 stroke-[1] text-foreground/20" />
                      <h3 className="font-serif text-xl text-foreground mb-2">No Saved Addresses</h3>
                      <p className="text-foreground/40 text-sm font-light">
                        Add an address to speed up checkout.
                      </p>
                    </div>
                  )}
                </div>

                {/* Address Form Modal */}
                {showAddressForm && (
                  <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={resetAddressForm}
                  >
                    <div
                      className="bg-background w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 rounded-2xl shadow-xl border border-foreground/5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="font-serif text-2xl text-foreground">
                          {editingAddress ? "Edit Address" : "Add Address"}
                        </h3>
                        <button
                          onClick={resetAddressForm}
                          className="p-2 text-foreground/40 hover:text-foreground transition-colors"
                        >
                          <X className="w-5 h-5 stroke-[1.5]" />
                        </button>
                      </div>
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">
                            Label *
                          </label>
                          <input
                            required
                            value={addressForm.label}
                            onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                            placeholder="e.g. Home, Office"
                            className="input-bordered"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">
                              First Name *
                            </label>
                            <input
                              required
                              value={addressForm.firstName}
                              onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                              className="input-bordered"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">
                              Last Name *
                            </label>
                            <input
                              required
                              value={addressForm.lastName}
                              onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                              className="input-bordered"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">
                            Address *
                          </label>
                          <input
                            required
                            value={addressForm.address}
                            onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                            className="input-bordered"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">
                              City *
                            </label>
                            <input
                              required
                              value={addressForm.city}
                              onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                              className="input-bordered"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">
                              State *
                            </label>
                            <input
                              required
                              value={addressForm.state}
                              onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                              className="input-bordered"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">
                              ZIP Code *
                            </label>
                            <input
                              required
                              value={addressForm.zipCode}
                              onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })}
                              className="input-bordered"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">
                              Phone *
                            </label>
                            <input
                              required
                              value={addressForm.phone}
                              onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                              className="input-bordered"
                            />
                          </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                          <button type="submit" className="btn-primary flex-1">
                            {editingAddress ? "Save Changes" : "Add Address"}
                          </button>
                          <button type="button" onClick={resetAddressForm} className="btn-outline">
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-background p-8 border border-foreground/5 rounded-2xl">
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/60 mb-8 block">
                  Profile Details
                </span>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 py-4 border-b border-foreground/5">
                    <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/40 w-24">
                      Name
                    </span>
                    <span className="text-sm text-foreground font-light">{user?.name || "—"}</span>
                  </div>
                  <div className="flex items-center gap-4 py-4 border-b border-foreground/5">
                    <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/40 w-24">
                      Email
                    </span>
                    <span className="text-sm text-foreground font-light">{user?.email || "—"}</span>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
}