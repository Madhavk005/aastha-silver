import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";
import { Package, MapPin, User, LogOut } from "lucide-react";

export default async function AccountPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h1 className="font-serif text-4xl md:text-5xl text-[#1A1D1A] mb-4">
          My Account
        </h1>
        <p className="text-gray-500 font-light mb-12">
          Welcome back, {user.firstName || user.username || "Guest"}.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <button className="w-full text-left px-6 py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-3">
              <User className="w-4 h-4 stroke-[1.5]" />
              Profile Details
            </button>
            <button className="w-full text-left px-6 py-4 bg-transparent text-black hover:bg-black/5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-3">
              <Package className="w-4 h-4 stroke-[1.5]" />
              Order History
            </button>
            <button className="w-full text-left px-6 py-4 bg-transparent text-black hover:bg-black/5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-3">
              <MapPin className="w-4 h-4 stroke-[1.5]" />
              Addresses
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            
            {/* We will just show the Clerk UserProfile for now, but styled to blend in */}
            <div className="bg-white p-8 border border-black/5 rounded-none shadow-sm">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-medium text-black mb-8 border-b border-black/5 pb-4">
                Profile Management
              </h2>
              
              {/* Clerk's UI injected here */}
              <div className="clerk-account-override">
                <UserProfile routing="hash" />
              </div>

            </div>

            {/* Example Orders Empty State */}
            <div className="mt-12 bg-[#F9F8F5] p-12 text-center border border-black/5">
              <Package className="w-8 h-8 mx-auto mb-4 stroke-[1] text-black/50" />
              <h3 className="font-serif text-2xl text-[#1A1D1A] mb-2">No Orders Yet</h3>
              <p className="text-gray-500 text-sm font-light">You haven&apos;t placed any orders with us yet.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
