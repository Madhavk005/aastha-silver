"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormErrors {
  [key: string]: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\+\-\(\)\s]{7,15}$/;

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  
  // Coupon State
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    giftNote: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/");
    }
  }, [items, router]);

  const subtotal = getTotal();
  const tax = (subtotal - discount) * 0.18;
  const shipping = 0;
  const total = (subtotal - discount) + tax + shipping;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "WELCOME10") {
      setDiscount(subtotal * 0.10);
      setCouponMessage("10% discount applied!");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  interface RazorpayErrorResponse {
    error: {
      code: string;
      description: string;
    };
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.email) errors.email = "Email is required";
    else if (!EMAIL_REGEX.test(formData.email)) errors.email = "Invalid email format";

    if (!formData.phone) errors.phone = "Phone number is required";
    else if (!PHONE_REGEX.test(formData.phone)) errors.phone = "Invalid phone number";

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.zipCode.trim()) errors.zipCode = "ZIP code is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!isScriptLoaded) {
      alert("Payment system is still loading. Please try again in a moment.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: total,
          items,
          customerDetails: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          }
        }),
      });

      const orderData = await response.json();
      if (orderData.error) throw new Error(orderData.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Aastha Silver",
        description: "Timeless Craft. Quiet Luxury.",
        order_id: orderData.id,
        handler: async function (response: RazorpaySuccessResponse) {
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) throw new Error("Payment verification failed");
            
            clearCart();
            router.push("/checkout/success");
          } catch (err) {
            console.error(err);
            alert("Payment verification failed. If money was deducted, please contact support.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`,
          giftNote: formData.giftNote || "None",
        },
        theme: { color: "#215650" },
      };

      interface RazorpayInstance {
        on: (event: string, callback: (res: RazorpayErrorResponse) => void) => void;
        open: () => void;
      }

      const RazorpayConstructor = (
        window as unknown as {
          Razorpay: new (options: Record<string, unknown>) => RazorpayInstance;
        }
      ).Razorpay;

      const rzp = new RazorpayConstructor(options as Record<string, unknown>);
      
      rzp.on("payment.failed", function (response: RazorpayErrorResponse) {
        console.error("Payment Failed", response.error);
        alert("Payment failed. Please try again.");
      });

      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Could not initiate payment. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) return null;

  const renderField = (label: string, name: string, type: string = "text", placeholder: string, colSpan: boolean = false) => (
    <div className={`space-y-2 text-sm ${colSpan ? 'md:col-span-2' : ''}`}>
      <label htmlFor={name} className="text-foreground/50 font-light">{label} *</label>
      <Input
        required
        id={name}
        type={type}
        name={name}
        value={(formData as Record<string, string>)[name]}
        onChange={handleInputChange}
        className={`h-12 bg-transparent border-foreground/20 focus-visible:ring-primary focus-visible:border-primary rounded-xl shadow-none ${formErrors[name] ? 'border-red-400/70 focus-visible:border-red-500' : ''}`}
        placeholder={placeholder}
      />
      {formErrors[name] && <p className="text-red-500 text-[10px] mt-1">{formErrors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32 pb-16">
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        onLoad={() => setIsScriptLoaded(true)}
      />
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-12">Checkout</h1>
        
        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Contact Information */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.1em] font-medium text-foreground mb-6 pb-4 border-b border-foreground/10">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField("Email Address", "email", "email", "Enter your email")}
                {renderField("Phone Number", "phone", "tel", "Enter your phone number")}
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.1em] font-medium text-foreground mb-6 pb-4 border-b border-foreground/10">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField("First Name", "firstName", "text", "First Name")}
                {renderField("Last Name", "lastName", "text", "Last Name")}
                {renderField("Address", "address", "text", "Street Address, Apartment, Suite, etc.", true)}
                {renderField("City", "city", "text", "City")}
                {renderField("State / Province", "state", "text", "State")}
                {renderField("ZIP / Postal Code", "zipCode", "text", "ZIP Code")}
                <div className="space-y-2 text-sm">
                  <label htmlFor="country" className="text-foreground/50 font-light">Country *</label>
                  <Input required id="country" name="country" value={formData.country} onChange={handleInputChange} className="h-12 bg-transparent border-foreground/20 focus-visible:ring-primary focus-visible:border-primary rounded-xl shadow-none" placeholder="Country" />
                </div>
              </div>
            </section>

            {/* Gift Note */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.1em] font-medium text-foreground mb-6 pb-4 border-b border-foreground/10">
                Gift Note <span className="text-foreground/30 font-light normal-case tracking-normal">(optional)</span>
              </h2>
              <div className="space-y-2 text-sm">
                <label htmlFor="giftNote" className="text-foreground/50 font-light">Add a personal message</label>
                <textarea
                  id="giftNote"
                  name="giftNote"
                  value={formData.giftNote}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  placeholder="Write a thoughtful note to accompany your gift..."
                  className="w-full bg-transparent border border-foreground/20 rounded-xl px-4 py-3 text-sm font-light text-foreground placeholder:text-foreground/25 focus:outline-none focus:ring-1 focus:ring-black focus:border-black resize-none transition-all"
                />
                <p className="text-foreground/30 text-[10px] text-right">{formData.giftNote.length}/500</p>
              </div>
            </section>

            {/* Billing Address Toggle */}
            <section>
              <h2 className="text-xs uppercase tracking-[0.1em] font-medium text-foreground mb-6 pb-4 border-b border-foreground/10">
                Billing Address
              </h2>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    checked={billingSameAsShipping}
                    onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                  />
                  <div className="w-5 h-5 border border-foreground/30 rounded-sm peer-checked:bg-primary peer-checked:border-primary transition-colors"></div>
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-foreground/50 font-light select-none group-hover:text-foreground transition-colors">Billing address is the same as shipping address</span>
              </label>
              
              {!billingSameAsShipping && (
                <div className="mt-6 p-6 bg-secondary rounded-xl">
                  <p className="text-xs text-gray-500 italic">Your billing address is collected by our secure payment gateway at checkout.</p>
                </div>
              )}
            </section>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-2xl border border-foreground/5 shadow-xl shadow-foreground/5 sticky top-32">
              
              <h2 className="text-xs uppercase tracking-[0.1em] font-medium text-foreground mb-6 pb-4 border-b border-foreground/10">
                Order Summary
              </h2>
              
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-20 bg-secondary overflow-hidden rounded-lg flex-shrink-0">
                      <Image src={item.image || "/placeholder.jpg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-medium text-foreground line-clamp-1">{item.name}</h3>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-xs font-medium text-foreground">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code */}
              <div className="mb-6 pb-6 border-b border-foreground/10">
                <div className="flex gap-2">
                  <Input 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Gift card or discount code" 
                    className="h-12 rounded-xl border-foreground/10 focus-visible:ring-0 focus-visible:border-black text-xs font-light"
                  />
                  <Button type="button" onClick={handleApplyCoupon} className="h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover px-6 uppercase tracking-[0.1em] text-[10px]">
                    Apply
                  </Button>
                </div>
                {couponMessage && (
                  <p className={`mt-2 text-[10px] font-medium tracking-wide ${discount > 0 ? "text-primary" : "text-red-500"}`}>
                    {couponMessage}
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-foreground/50 font-light">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-primary font-light">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-foreground/50 font-light">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Complimentary" : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm text-foreground/50 font-light">
                  <span>Estimated Tax (18%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8 pt-6 border-t border-foreground/10">
                <span className="text-sm font-medium text-foreground">Total</span>
                <span className="text-2xl font-serif text-foreground">{formatCurrency(total)}</span>
              </div>

              <Button 
                type="submit"
                disabled={isProcessing || !isScriptLoaded}
                className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary-hover rounded-xl btn-shine uppercase tracking-[0.2em] text-[10px] font-medium transition-all shadow-lg"
              >
                {isProcessing ? "Processing..." : "Pay Securely with Razorpay"}
              </Button>
              <div className="mt-6 flex justify-center items-center gap-4 opacity-50">
                <span className="text-[10px] uppercase tracking-[0.1em] text-foreground">Encrypted & Secure Transactions</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
