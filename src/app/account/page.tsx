"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";
import { Package, MapPin, User, Plus, X, Download, Search, Loader2 } from "lucide-react";
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

export default function AccountPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [activeTab, setActiveTab] = useState<AccountTab>("orders");
  const [orders, setOrders] = useState<SanityOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetch(`/api/orders?userId=${user.id}`)
      .then(res => res.json())
      .then(data => setOrders(data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setOrdersLoading(false));
  }, [isLoaded, isSignedIn, user?.id]);

  if (!isLoaded) return null;
  if (!isSignedIn) redirect("/sign-in");

  const resetAddressForm = () => {
    setAddressForm(EMPTY_ADDRESS);
    setEditingAddress(null);
    setShowAddressForm(false);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(addresses.map(a => a.id === editingAddress ? { ...a, ...addressForm } : a));
    } else {
      setAddresses([...addresses, { ...addressForm, id: Date.now().toString(), isDefault: addresses.length === 0 }]);
    }
    resetAddressForm();
  };

  const handleEditAddress = (addr: Address) => {
    setAddressForm(addr);
    setEditingAddress(addr.id);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const tabs: { key: AccountTab; label: string; icon: React.ElementType }[] = [
    { key: "orders", label: "Order History", icon: Package },
    { key: "addresses", label: "Addresses", icon: MapPin },
    { key: "profile", label: "Profile Details", icon: User },
  ];

  const orderItemCount = (items: OrderItem[]) => items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2">My Account</h1>
        <p className="text-foreground/50 font-light mb-12">Welcome back, {user.firstName || "Guest"}.</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full text-left px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-3 transition-colors ${
                    activeTab === tab.key ? 'bg-foreground text-background' : 'text-foreground/60 hover:bg-foreground/5 hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[1.5]" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/60">Order History</h2>
                  <Link href="/track-order" className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/50 hover:text-foreground transition-colors flex items-center gap-2">
                    <Search className="w-3 h-3 stroke-[1.5]" />
                    Track Order
                  </Link>
                </div>
                {ordersLoading ? (
                  <div className="bg-secondary p-16 text-center border border-foreground/5">
                    <Loader2 className="w-6 h-6 mx-auto mb-4 animate-spin stroke-[1] text-foreground/30" />
                    <p className="text-foreground/40 text-sm font-light">Loading your orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="bg-secondary p-16 text-center border border-foreground/5">
                    <Package className="w-8 h-8 mx-auto mb-4 stroke-[1] text-foreground/30" />
                    <h3 className="font-serif text-2xl text-foreground mb-2">No Orders Yet</h3>
                    <p className="text-foreground/50 text-sm font-light">You haven&apos;t placed any orders with us yet.</p>
                    <Link href="/shop" className="inline-block mt-8 text-[10px] uppercase tracking-[0.2em] font-medium border border-foreground/30 px-8 py-3 hover:bg-foreground hover:text-background transition-colors">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-foreground/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-foreground/20 transition-colors">
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-sm font-medium text-foreground">{order.orderNumber}</span>
                            <span className={`text-[9px] uppercase tracking-[0.15em] px-3 py-1 font-medium ${
                              order.status === "delivered" ? 'bg-green-500/10 text-green-700' : 'bg-foreground/10 text-foreground/70'
                            }`}>{order.status}</span>
                          </div>
                          <p className="text-xs text-foreground/50 font-light">
                            {new Date(order._createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            {" "}&middot;{" "}
                            {orderItemCount(order.items)} {orderItemCount(order.items) === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="font-medium text-foreground">₹{(order.totalAmount || 0).toLocaleString("en-IN")}</span>
                          <button className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/50 hover:text-foreground transition-colors flex items-center gap-1.5">
                            <Download className="w-3 h-3 stroke-[1.5]" />
                            Invoice
                          </button>
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
                  <h2 className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/60">Saved Addresses</h2>
                  <button
                    onClick={() => { setShowAddressForm(true); setEditingAddress(null); setAddressForm(EMPTY_ADDRESS); }}
                    className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/50 hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-3 h-3 stroke-[1.5]" />
                    Add Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div key={addr.id} className={`border p-6 relative ${addr.isDefault ? 'border-foreground/30' : 'border-foreground/5 hover:border-foreground/20'} transition-colors`}>
                      {addr.isDefault && (
                        <span className="absolute top-3 right-3 text-[8px] uppercase tracking-[0.15em] font-medium text-foreground/40">Default</span>
                      )}
                      <h3 className="text-sm font-medium text-foreground mb-1">{addr.label}</h3>
                      <p className="text-xs text-foreground/60 font-light">{addr.firstName} {addr.lastName}</p>
                      <p className="text-xs text-foreground/60 font-light">{addr.address}</p>
                      <p className="text-xs text-foreground/60 font-light">{addr.city}, {addr.state} - {addr.zipCode}</p>
                      <p className="text-xs text-foreground/60 font-light">{addr.phone}</p>
                      <div className="flex gap-4 mt-4 pt-4 border-t border-foreground/5">
                        <button onClick={() => handleEditAddress(addr)} className="text-[9px] uppercase tracking-[0.15em] font-medium text-foreground/50 hover:text-foreground transition-colors">Edit</button>
                        {!addr.isDefault && (
                          <>
                            <button onClick={() => handleSetDefault(addr.id)} className="text-[9px] uppercase tracking-[0.15em] font-medium text-foreground/50 hover:text-foreground transition-colors">Set as Default</button>
                            <button onClick={() => handleDeleteAddress(addr.id)} className="text-[9px] uppercase tracking-[0.15em] font-medium text-red-400/70 hover:text-red-500 transition-colors">Delete</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {addresses.length === 0 && (
                    <div className="col-span-full border border-foreground/5 p-16 text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-4 stroke-[1] text-foreground/20" />
                      <h3 className="font-serif text-xl text-foreground mb-2">No Saved Addresses</h3>
                      <p className="text-foreground/40 text-sm font-light">Add an address to speed up checkout.</p>
                    </div>
                  )}
                </div>

                {/* Address Form Modal */}
                {showAddressForm && (
                  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={resetAddressForm}>
                    <div className="bg-background w-full max-w-lg max-h-[90vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="font-serif text-2xl text-foreground">{editingAddress ? "Edit Address" : "Add Address"}</h3>
                        <button onClick={resetAddressForm} className="p-2 text-foreground/40 hover:text-foreground transition-colors">
                          <X className="w-5 h-5 stroke-[1.5]" />
                        </button>
                      </div>
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">Label *</label>
                          <input required value={addressForm.label} onChange={e => setAddressForm({ ...addressForm, label: e.target.value })} placeholder="e.g. Home, Office" className="w-full h-11 bg-transparent border border-foreground/20 px-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">First Name *</label>
                            <input required value={addressForm.firstName} onChange={e => setAddressForm({ ...addressForm, firstName: e.target.value })} className="w-full h-11 bg-transparent border border-foreground/20 px-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">Last Name *</label>
                            <input required value={addressForm.lastName} onChange={e => setAddressForm({ ...addressForm, lastName: e.target.value })} className="w-full h-11 bg-transparent border border-foreground/20 px-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">Address *</label>
                          <input required value={addressForm.address} onChange={e => setAddressForm({ ...addressForm, address: e.target.value })} className="w-full h-11 bg-transparent border border-foreground/20 px-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">City *</label>
                            <input required value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} className="w-full h-11 bg-transparent border border-foreground/20 px-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">State *</label>
                            <input required value={addressForm.state} onChange={e => setAddressForm({ ...addressForm, state: e.target.value })} className="w-full h-11 bg-transparent border border-foreground/20 px-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">ZIP Code *</label>
                            <input required value={addressForm.zipCode} onChange={e => setAddressForm({ ...addressForm, zipCode: e.target.value })} className="w-full h-11 bg-transparent border border-foreground/20 px-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">Phone *</label>
                            <input required value={addressForm.phone} onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })} className="w-full h-11 bg-transparent border border-foreground/20 px-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors" />
                          </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                          <button type="submit" className="flex-1 h-12 bg-foreground text-background uppercase tracking-[0.2em] text-[10px] font-medium hover:bg-foreground/90 transition-colors">
                            {editingAddress ? "Save Changes" : "Add Address"}
                          </button>
                          <button type="button" onClick={resetAddressForm} className="px-8 h-12 border border-foreground/30 text-foreground uppercase tracking-[0.2em] text-[10px] font-medium hover:bg-foreground/5 transition-colors">
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
              <div className="bg-background p-8 border border-foreground/5">
                <h2 className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/60 mb-8">Profile Management</h2>
                <div className="clerk-account-override">
                  <UserProfile routing="hash" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
