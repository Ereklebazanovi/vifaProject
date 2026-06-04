import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    <main className="min-h-screen bg-[#060608] text-white selection:bg-indigo-500/30">
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

      <div className="fixed inset-0 z-0 bg-[#060608]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_65%_-5%,rgba(99,102,241,0.06)_0%,transparent_65%)]" />
      </div>

      <section className="blog-wrap relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400">
          <span className="h-px w-8 bg-indigo-500" />
          {ka ? "ბლოგი" : "Blog"}
        </span>
        <h1 className="mb-5 max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight text-white md:text-5xl">
          {ka ? "ცოდნა, რომელიც ბიზნესს ზრდის" : "Insights that grow your business"}
        </h1>
        <p className="font-georgian-body mb-14 max-w-2xl text-lg leading-[1.85] text-gray-300">
          {ka
            ? "სტატიები ვებსაიტის დამზადებაზე, ციფრულ მარკეტინგზე, SEO-სა და ტექნოლოგიებზე — პრაქტიკული რჩევები ქართული ბიზნესისთვის."
            : "Articles on website development, digital marketing, SEO and technology — practical advice for Georgian businesses."}
        </p>

        {loading ? (
          <div className="py-20 text-center text-gray-500">{ka ? "იტვირთება…" : "Loading…"}</div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            {ka ? "მალე დაემატება სტატიები." : "Articles coming soon."}
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-indigo-500/40"
                >
                  {post.coverImage && (
                    <div className="aspect-[16/9] w-full overflow-hidden bg-white/5">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider text-indigo-400">
                      {post.tags.slice(0, 2).map((t) => (
                        <span key={t} className="rounded-full bg-indigo-500/10 px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="mb-2 text-lg font-bold leading-snug text-white group-hover:text-indigo-200">
                      {post.title}
                    </h2>
                    <p className="font-georgian-body mb-4 line-clamp-3 flex-1 text-sm leading-[1.8] text-gray-400">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatDate(post.publishedAt, ka)}</span>
                      <ArrowRight className="h-4 w-4 text-indigo-400 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default BlogIndex;
