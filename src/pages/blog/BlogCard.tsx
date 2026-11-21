import { ArrowUpRight } from "lucide-react";
import { PageLink } from "../../components/ui/PageLink";
import type { ItLanguage } from "../../data/itServices";
import type { BlogPost } from "../../types/blog";
import { formatPostDate } from "./formatPostDate";
import "./blog.css";

export function BlogCard({ post, language, featured = false, headingAs: Heading = "h2" }: {
  post: BlogPost;
  language: ItLanguage;
  featured?: boolean;
  headingAs?: "h2" | "h3";
}) {
  const category = post.tags[0] || (language === "ka" ? "სტატია" : "Article");
  const date = formatPostDate(post.publishedAt, language);
  return (
    <article className="blog-card" data-featured={featured || undefined}>
      <PageLink to={`/blog/${post.slug}`} className="blog-card-link">
        <span className="blog-card-chip">{category}</span>
        <Heading>{post.title}</Heading>
        <p>{post.description}</p>
        <div className="blog-card-foot">
          {date && <time dateTime={post.publishedAt}>{date}</time>}
          <ArrowUpRight size={19} aria-hidden="true" />
        </div>
      </PageLink>
    </article>
  );
}
