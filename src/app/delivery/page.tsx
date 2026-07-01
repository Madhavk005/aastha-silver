import React from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getPolicyBySlugQuery } from "@/sanity/lib/queries";
import DeliveryClient, { PolicyData } from "./DeliveryClient";

// A server component to fetch the policy data
export default async function DeliveryPage() {
  // Fetch from Sanity
  const policyData = await sanityFetch<PolicyData>({
    query: getPolicyBySlugQuery,
    params: { slug: "delivery-and-returns" },
  });

  return <DeliveryClient initialData={policyData} />;
}
