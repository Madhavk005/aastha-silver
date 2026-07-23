import React from "react";
import { notFound } from "next/navigation";
import { GIFT_SECTIONS, OCCASION_DETAILS } from "@/lib/constants";
import { getProductsByCategory } from "@/lib/data";
import OccasionClient from "./OccasionClient";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const occasion = GIFT_SECTIONS.find(o => o.slug === params.slug);
  if (!occasion) return {};
  const details = OCCASION_DETAILS[params.slug];
  return {
    title: `${occasion.name} Gifts | Aastha Silver`,
    description: details?.description || `Shop ${occasion.name} gifts at Aastha Silver.`,
  };
}

export default async function OccasionPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const occasion = GIFT_SECTIONS.find(o => o.slug === params.slug);
  if (!occasion) notFound();

  const products = await getProductsByCategory(params.slug);
  const details = OCCASION_DETAILS[params.slug];

  return (
    <OccasionClient
      occasion={occasion}
      details={details || null}
      products={products}
    />
  );
}
