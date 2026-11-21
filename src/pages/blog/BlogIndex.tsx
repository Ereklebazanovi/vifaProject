import { EditorialPage } from "../../components/ui/EditorialPage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import Breadcrumbs, { type Crumb } from "../../components/Breadcrumbs";
import { useLanguage } from "../../contexts/LanguageContext";
import { getPublishedPosts } from "../../service/blogService";
import type { BlogPost } from "../../types/blog";

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

const BlogIndex = () => {
  const { currentLanguage } = useLanguage();
  const ka = currentLanguage === "ka";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    getPublishedPosts()
      .then((p) => alive && setPosts(p))
      .catch((e) => console.error("[blog] failed to load posts:", e))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const breadcrumbItems: Crumb[] = [
    { name: ka ? "მთავარი" : "Home", url: `${base}/` },
    { name: ka ? "ბლოგი" : "Blog", url: `${base}/blog` },
  ];

  return (
    <EditorialPage activeLink="/blog">
      <SEO
        title={ka ? "ბლოგი — ვებ დეველოპმენტი, მარკეტინგი, SEO" : "Blog — Web Development, Marketing, SEO"}
        description={
          ka
            ? "VIFA Digital-ის ბლოგი: პრაქტიკული რჩევები ვებსაიტის დამზადებაზე, ციფრულ მარკეტინგზე, SEO-სა და ბიზნესის ციფრულ ზრდაზე."
            : "The VIFA Digital blog: practical guides on website development, digital marketing, SEO and growing your business online."
        }
        url={`${base}/blog`}
        breadcrumbs={breadcrumbItems}
      />

      <section className="ed-wrap">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] ed-accent">
          <span className="h-px w-8 bg-current" />
          {ka ? "ბლოგი" : "Blog"}
        </span>
        <h1 className="mb-5 ed-about-intro ed-about-intro-start text-4xl font-extrabold leading-[1.15] tracking-tight ed-ink md:text-5xl">
          {ka ? "ცოდნა, რომელიც ბიზნესს ზრდის" : "Insights that grow your business"}
        </h1>
        <p className="mb-14 ed-about-intro ed-about-intro-start text-lg leading-[1.85] ed-muted">
          {ka
            ? "სტატიები ვებსაიტის დამზადებაზე, ციფრულ მარკეტინგზე, SEO-სა და ტექნოლოგიებზე. პრაქტიკული რჩევები ქართული ბიზნესისთვის."
            : "Articles on website development, digital marketing, SEO and technology. Practical advice for Georgian businesses."}
        </p>

        {loading ? (
          <div className="py-20 text-center ed-muted">{ka ? "იტვირთება…" : "Loading…"}</div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center ed-muted">
            {ka ? "მალე დაემატება სტატიები." : "Articles coming soon."}
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group ed-card ed-blog-card flex h-full flex-col overflow-hidden"
                >
                  {post.coverImage && (
                    <div className="aspect-[16/9] w-full overflow-hidden ed-tint">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider ed-accent">
                      {post.tags.slice(0, 2).map((t) => (
                        <span key={t} className="ed-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="mb-2 text-lg font-bold leading-snug ed-ink group-hover:underline">
                      {post.title}
                    </h2>
                    <p className="font-georgian-body mb-4 line-clamp-3 flex-1 text-sm leading-[1.8] ed-muted">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-xs ed-muted">
                      <span>{formatDate(post.publishedAt, ka)}</span>
                      <ArrowRight className="h-4 w-4 ed-accent transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </EditorialPage>
  );
};

export default BlogIndex;
