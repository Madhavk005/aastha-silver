import React from "react";
import DeliveryClient from "./DeliveryClient";
import { getDeliveryPolicy } from "@/lib/data";

// A server component to fetch the policy data
export default async function DeliveryPage() {
  const policyData = await getDeliveryPolicy();
  return <DeliveryClient initialData={policyData} />;
}
