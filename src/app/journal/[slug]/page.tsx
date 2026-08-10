import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ARTICLES } from "../articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  return {
    title: article ? `${article.title} | Aastha Silver` : "Journal | Aastha Silver",
    description: article?.excerpt,
  };
}

export default function JournalArticlePage({ params }: { params: { slug: string } }) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <nav className="flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 mb-12">
          <Link href="/" className="hover:text-[#0F0F0F] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href="/journal" className="hover:text-[#0F0F0F] transition-colors">Journal</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#0F0F0F]/80">{article.category}</span>
        </nav>

        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 mb-4 block">
            {article.category} · {article.date}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0F0F0F] leading-[1.1]">
            {article.title}
          </h1>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden bg-secondary mb-12">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          {article.body.map((paragraph, index) => (
            <p key={index} className="text-gray-600 font-light leading-relaxed text-[15px]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-black/10 text-center">
          <Link
            href="/journal"
            className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#0F0F0F] border-b border-black pb-2 hover:opacity-60 transition-opacity"
          >
            Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}