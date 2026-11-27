import { EditorialPage } from "../../components/ui/EditorialPage";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import Breadcrumbs, { type Crumb } from "../../components/Breadcrumbs";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { useLanguage } from "../../contexts/LanguageContext";
import { getPostBySlug, getPublishedPosts } from "../../service/blogService";
import type { BlogPost as BlogPostType } from "../../types/blog";
import { BlogCard } from "./BlogCard";
import { formatPostDate } from "./formatPostDate";

const base = "https://vifadigital.ge";

type LoadState = "loading" | "ready" | "notfound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentLanguage } = useLanguage();
  const ka = currentLanguage === "ka";
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [related, setRelated] = useState<BlogPostType[]>([]);
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

  // Related articles (internal linking) — other published posts, newest first.
  useEffect(() => {
    let alive = true;
    getPublishedPosts()
      .then((all) => {
        if (alive) setRelated(all.filter((p) => p.slug !== slug).slice(0, 3));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [slug]);

  if (state === "loading") {
    return (
      <EditorialPage activeLink="/blog">
        <div className="ed-state ed-muted" role="status">
          {ka ? "იტვირთება…" : "Loading…"}
        </div>
      </EditorialPage>
    );
  }

  if (state === "notfound" || !post) {
    return (
      <EditorialPage activeLink="/blog">
        <div className="ed-state">
          <span className="text-xs font-semibold ed-accent">404</span>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {ka ? "სტატია ვერ მოიძებნა" : "Article not found"}
          </h1>
          <Link to="/blog" className="it-pill-button">
            {ka ? "ბლოგზე დაბრუნება" : "Back to blog"}
          </Link>
        </div>
      </EditorialPage>
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
    .replace(/\u00a0/g, " ")
    // strip invisible break chars ONLY (soft hyphen, zero-width space/joiners, BOM).
    // Must NOT touch U+0020: an earlier version compared against a U+00A0 literal
    // here and silently deleted every real space.
    .replace(/[\u00ad\u200b-\u200d\ufeff]/g, "");
  const cleanHtml = DOMPurify.sanitize(normalizedHtml, {
    ADD_ATTR: ["target", "rel"],
  });

  return (
    <EditorialPage activeLink="/blog">
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

      <div className="it-col blog-route blog-article-route">
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />

        <article className="blog-article">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className="blog-card-chip">{t}</span>
            ))}
          </div>

          <h1 className="mb-4 text-[1.7rem] font-bold leading-[1.3] tracking-tight ed-ink sm:text-3xl md:text-[2.1rem] md:leading-[1.25]">
            {post.title}
          </h1>

          <div className="flex items-center gap-2.5 text-[13px] ed-muted">
            <span>{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt, currentLanguage)}</time>
          </div>

          <div className="my-8 h-px w-full ed-rule" />

          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="mb-10 h-52 w-full rounded-xl border ed-border object-cover md:h-72"
            />
          )}

          {/* Sanitized rich content */}
          <div
            className="blog-prose ed-prose"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />

          {/* CTA */}
          <div className="ed-card mt-12 p-5 sm:p-7">
            <h2 className="mb-2 text-xl font-bold ed-ink md:text-2xl">
              {ka ? "მზად ხართ თქვენი პროექტისთვის?" : "Ready to start your project?"}
            </h2>
            <p className="font-georgian-body mb-5 text-[15px] leading-[1.8] ed-muted">
              {ka
                ? "VIFA Digital დაგეხმარებათ ვებსაიტის დამზადებაში, ციფრულ მარკეტინგსა და SEO-ში. უფასო კონსულტაცია."
                : "VIFA Digital helps with website development, digital marketing and SEO. Free consultation."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/services/web"
                className="it-pill-button gap-2"
              >
                {ka ? "ვებ დეველოპმენტი" : "Web Development"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services/marketing"
                className="it-pill-button gap-2"
              >
                {ka ? "ციფრული მარკეტინგი" : "Digital Marketing"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="it-pill-button gap-2"
              >
                {ka ? "კონტაქტი" : "Contact"}
              </Link>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="blog-related" aria-labelledby="blog-related-title">
            <SectionHeading id="blog-related-title">
              {ka ? "სხვა სტატიები" : "More articles"}
            </SectionHeading>
            <div className="blog-card-grid">
              {related.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} language={currentLanguage} headingAs="h3" />
              ))}
            </div>
            <Link
              to="/blog"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold ed-accent hover:underline"
            >
              {ka ? "ყველა სტატია" : "All articles"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        )}
      </div>
    </EditorialPage>
  );
};

export default BlogPost;
