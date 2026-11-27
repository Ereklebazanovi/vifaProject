import { useEffect, useState } from "react";
import { ArrowUpRight, Check, FileText, Megaphone, Package, Search } from "lucide-react";
import type { CSSProperties } from "react";
import { PageLink } from "../components/ui/PageLink";
import { SectionHeading } from "../components/ui/SectionHeading";
import { productColors } from "../components/ui/tokens";
import type { ItLanguage } from "../data/itServices";
import type { BlogPost } from "../types/blog";

type BlogPreview = Pick<BlogPost, "id" | "slug" | "title" | "description" | "tags">;

const articleTopics = [
  { kind: "stock", match: /საწყობ|მარაგ|\b(?:inventory|warehouse|wms)\b/i, palette: productColors.invento },
  { kind: "search", match: /\bseo\b|ინდექსაცი|საძიებო|google-ში|google search/i, palette: productColors.web },
  { kind: "website", match: /ვებსაიტ|საიტი|საიტის|\b(?:website|web development)\b/i, palette: productColors.branding },
  { kind: "marketing", match: /მარკეტინგ|რეკლამ|ბრენდინგ|\b(?:marketing|advertising|branding|social media)\b/i, palette: productColors.marketing },
] as const;

function ArticleArtwork({ post }: { post: BlogPreview }) {
  const tags = post.tags?.join(" ") ?? "";
  const topic = articleTopics.find(({ match }) => match.test(tags))
    ?? articleTopics.find(({ match }) => match.test(post.title));
  const kind = topic?.kind ?? "article";
  const { wash, soft, deep } = topic?.palette ?? productColors.socialMedia;

  return (
    <div className="home-blog-art" data-topic={kind} aria-hidden="true"
      style={{ "--blog-wash": wash, "--blog-soft": soft, "--blog-ink": deep } as CSSProperties}>
      <div className="home-blog-art-window">
        <div className="home-blog-art-bar"><i /><i /><i /></div>
        {kind === "stock" ? (
          <div className="home-blog-art-stock">
            {[1, 2, 3].map(row => <div key={row}><Package /><span /><Check /></div>)}
          </div>
        ) : kind === "search" ? (
          <div className="home-blog-art-search">
            <div><Search /><i /></div>
            <span /><span />
          </div>
        ) : kind === "website" ? (
          <div className="home-blog-art-website"><span /><i /><i /><i /></div>
        ) : (
          <div className="home-blog-art-document">
            {kind === "marketing" ? <Megaphone /> : <FileText />}
            <span /><span />
          </div>
        )}
      </div>
    </div>
  );
}

function ArticleCard({ post, language, featured = false }: {
  post: BlogPreview;
  language: ItLanguage;
  featured?: boolean;
}) {
  const ka = language === "ka";
  return (
    <article className="home-blog-entry" data-featured={featured || undefined}>
      <PageLink to={`/blog/${post.slug}`} className="home-blog-card">
        <ArticleArtwork post={post} />
        <div className="home-blog-copy">
          <div className="home-blog-meta">
            <span className="home-blog-category">{post.tags?.[0] || (ka ? "სტატია" : "Article")}</span>
            {!featured && <ArrowUpRight className="home-blog-arrow" size={17} aria-hidden="true" />}
          </div>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          {featured && (
            <span className="home-blog-read">{ka ? "წაიკითხეთ სტატია" : "Read article"} <ArrowUpRight size={17} aria-hidden="true" /></span>
          )}
        </div>
      </PageLink>
    </article>
  );
}

export function HomeBlog({ language }: { language: ItLanguage }) {
  const ka = language === "ka";
  const [posts, setPosts] = useState<BlogPreview[]>(() => {
    const snapshot = document.getElementById("home-blog-data")?.textContent;
    if (!snapshot) return [];
    try { return JSON.parse(snapshot) as BlogPreview[]; } catch { return []; }
  });

  useEffect(() => {
    let active = true;
    void import("../service/blogService")
      .then(({ getPublishedPosts }) => getPublishedPosts({ fromServer: true }))
      .then(published => { if (active) setPosts(published.slice(0, 3)); })
      .catch(() => {}); // Prerendered posts remain available when the server is unreachable.
    return () => { active = false; };
  }, []);

  const [latest, ...recent] = posts;
  return (
    <section className="it-section it-col home-section" aria-labelledby="home-blog">
      <div className="home-section-header">
        <SectionHeading id="home-blog">{ka ? "ბლოგი" : "Blog"}</SectionHeading>
        <PageLink to="/blog" className="it-more-link">{ka ? "ყველა სტატია" : "All articles"} <ArrowUpRight size={16} aria-hidden="true" /></PageLink>
      </div>
      {latest && (
        <div className="home-blog-grid">
          <ArticleCard post={latest} language={language} featured />
          {recent.length > 0 && (
            <div className="home-blog-archive">
              {recent.map(post => <ArticleCard key={post.id} post={post} language={language} />)}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
