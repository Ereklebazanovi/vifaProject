import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import Breadcrumbs, { type Crumb } from "../../components/Breadcrumbs";
import { useLanguage } from "../../contexts/LanguageContext";
import { getPostBySlug } from "../../service/blogService";
import type { BlogPost as BlogPostType } from "../../types/blog";

const base = "https://vifadigital.ge";

function formatDate(iso: string, ka: boolean) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(ka ? "ka-GE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type LoadState = "loading" | "ready" | "notfound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentLanguage } = useLanguage();
  const ka = currentLanguage === "ka";
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    let alive = true;
    if (!slug) {
      setState("notfound");
      return;
    }
    setState("loading");
    getPostBySlug(slug)
      .then((p) => {
        if (!alive) return;
        if (p && p.status === "published") {
          setPost(p);
          setState("ready");
        } else {
          setState("notfound");
        }
      })
      .catch((e) => {
        console.error("[blog] failed to load post:", e);
        if (alive) setState("notfound");
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (state === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#060608] text-gray-500">
        {ka ? "იტვირთება…" : "Loading…"}
      </main>
    );
  }

  if (state === "notfound" || !post) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#060608] px-5 text-center text-white">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-400">404</span>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {ka ? "სტატია ვერ მოიძებნა" : "Article not found"}
        </h1>
        <Link
          to="/blog"
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 font-semibold text-black transition-transform hover:scale-[1.02]"
        >
          {ka ? "ბლოგზე დაბრუნება" : "Back to blog"}
        </Link>
      </main>
    );
  }

  const breadcrumbItems: Crumb[] = [
    { name: ka ? "მთავარი" : "Home", url: `${base}/` },
    { name: ka ? "ბლოგი" : "Blog", url: `${base}/blog` },
    { name: post.title, url: `${base}/blog/${post.slug}` },
  ];

  // Normalize pasted content (Word/Docs/AI artifacts) before sanitizing:
  //  • &nbsp; / U+00A0 → real space, so the browser can wrap at word boundaries
  //    instead of treating a whole sentence as one unbreakable token (which then
  //    gets force-broken mid-word).
  //  • strip invisible break chars (soft hyphen, zero-width space/joiners, BOM).
  const normalizedHtml = post.contentHtml
    .replace(/&nbsp;/gi, " ")
    .replace(/[ ­​‌‍﻿]/g, (m) => (m === " " ? " " : ""));
  const cleanHtml = DOMPurify.sanitize(normalizedHtml, {
    ADD_ATTR: ["target", "rel"],
  });

  return (
    <main className="min-h-screen bg-[#060608] text-white selection:bg-indigo-500/30">
      <SEO
        title={post.title}
        description={post.description}
        url={`${base}/blog/${post.slug}`}
        image={post.coverImage || undefined}
        type="article"
        breadcrumbs={breadcrumbItems}
        articleMeta={{
          publishedTime: post.publishedAt,
          modifiedTime: post.updatedAt || post.publishedAt,
          author: post.author,
          section: post.tags[0],
          tags: post.tags,
        }}
      />

      <article className="blog-article relative mx-auto max-w-2xl px-5 sm:px-6 pt-24 pb-24 md:pt-28">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />

        <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-indigo-400">
          {post.tags.slice(0, 3).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <h1 className="mb-4 text-[1.7rem] font-bold leading-[1.3] tracking-tight text-white sm:text-3xl md:text-[2.1rem] md:leading-[1.25]">
          {post.title}
        </h1>

        <div className="flex items-center gap-2.5 text-[13px] text-gray-500">
          <span>{post.author}</span>
          <span className="h-1 w-1 rounded-full bg-gray-600" />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, ka)}</time>
        </div>

        <div className="my-8 h-px w-full bg-white/10" />

        {post.coverImage && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={post.coverImage}
            alt={post.title}
            className="mb-10 h-52 w-full rounded-xl border border-white/10 object-cover md:h-72"
          />
        )}

        {/* Sanitized rich content */}
        <div
          className="blog-prose font-georgian-body"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-7">
          <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">
            {ka ? "მზად ხართ თქვენი პროექტისთვის?" : "Ready to start your project?"}
          </h2>
          <p className="font-georgian-body mb-5 text-[15px] leading-[1.8] text-gray-300">
            {ka
              ? "VIFA Digital დაგეხმარებათ ვებსაიტის დამზადებაში, ციფრულ მარკეტინგსა და SEO-ში. უფასო კონსულტაცია."
              : "VIFA Digital helps with website development, digital marketing and SEO. Free consultation."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/services/web"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-gray-200"
            >
              {ka ? "ვებ დეველოპმენტი" : "Web Development"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services/marketing"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-500"
            >
              {ka ? "ციფრული მარკეტინგი" : "Digital Marketing"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              {ka ? "კონტაქტი" : "Contact"}
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
