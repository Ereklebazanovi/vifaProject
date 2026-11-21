import { EditorialPage } from "../../components/ui/EditorialPage";
import { useEffect, useState } from "react";
import { SectionHeading } from "../../components/ui/SectionHeading";
import SEO from "../../components/SEO";
import Breadcrumbs, { type Crumb } from "../../components/Breadcrumbs";
import { useLanguage } from "../../contexts/LanguageContext";
import { getPublishedPosts } from "../../service/blogService";
import type { BlogPost } from "../../types/blog";
import { BlogCard } from "./BlogCard";

const base = "https://vifadigital.ge";

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

      <section className="it-col blog-route" aria-labelledby="blog-title">
        <header className="ed-hub-heading blog-heading">
          <Breadcrumbs items={breadcrumbItems} />
          <SectionHeading as="h1" id="blog-title">{ka ? "ბლოგი" : "Blog"}</SectionHeading>
          <p>{ka
            ? "სტატიები ვებსაიტებზე, რეკლამაზე, SEO-სა და ბიზნესის მართვის პროგრამებზე."
            : "Articles on websites, advertising, SEO and business management software."}</p>
        </header>

        {loading ? (
          <div className="py-20 text-center ed-muted">{ka ? "იტვირთება…" : "Loading…"}</div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center ed-muted">
            {ka ? "მალე დაემატება სტატიები." : "Articles coming soon."}
          </div>
        ) : (
          <div className="blog-card-grid">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} language={currentLanguage} featured={index === 0} />
            ))}
          </div>
        )}
      </section>
    </EditorialPage>
  );
};

export default BlogIndex;
