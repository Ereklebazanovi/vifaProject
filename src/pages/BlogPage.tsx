import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBlogPosts, formatDate } from "../utils/blogUtils";
import type { BlogPostMetadata } from "../types/blog";
import { Helmet } from "react-helmet-async";
import { FiClock, FiUser, FiArrowRight } from "react-icons/fi";

const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await getAllBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>ბლოგი - Vifa Digital | ციფრული მარკეტინგის სტატიები</title>
        <meta
          name="description"
          content="ციფრული მარკეტინგის, ვებ განვითარების და სოციალური მედიის შესახებ სტატიები Vifa Digital-ისგან. ისწავლეთ უახლესი ტრენდები და მიიღეთ ექსპერტული რჩევები."
        />
        <meta
          name="keywords"
          content="ბლოგი, ციფრული მარკეტინგი, ვებ განვითარება, სოციალური მედია, SEO, Google Ads"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="ბლოგი - Vifa Digital | ციფრული მარკეტინგის სტატიები"
        />
        <meta
          property="og:description"
          content="ციფრული მარკეტინგის, ვებ განვითარების და სოციალური მედიის შესახებ სტატიები Vifa Digital-ისგან."
        />
        <meta property="og:image" content="/images/blog/blog-cover.jpg" />
        <meta property="og:url" content="https://vifadigital.com/blog" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ბლოგი - Vifa Digital" />
        <meta
          name="twitter:description"
          content="ციფრული მარკეტინგის, ვებ განვითარების და სოციალური მედიის შესახებ სტატიები Vifa Digital-ისგან."
        />
        <meta name="twitter:image" content="/images/blog/blog-cover.jpg" />
      </Helmet>

      <div className="min-h-screen bg-slate-950 mt-18">
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Simple Header */}
            <div className="text-center mb-10">
              <h1 className="text-2xl md:text-5xl font-light text-white mb-6">
                სტატიები
              </h1>
            </div>

            {/* Blog Posts List */}
            {blogPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  სტატიები მალე დაემატება
                </h3>
                <p className="text-slate-400">
                  ჩვენ ვამზადებთ საინტერესო კონტენტს თქვენთვის
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {blogPosts.map((post, index) => (
                  <BlogPostCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

interface BlogPostCardProps {
  post: BlogPostMetadata;
  index: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <article className="bg-slate-800/20 border border-slate-700/30 rounded-lg p-4 sm:p-6 hover:bg-slate-800/40 hover:border-slate-600/50 transition-all duration-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Small Thumbnail */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mx-auto sm:mx-0">
            <div className="w-full h-full bg-slate-700/50 rounded-lg overflow-hidden">
              {post.thumbnail ? (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-2xl text-slate-500">📄</div>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors leading-tight">
              {post.title}
            </h2>

            <p className="text-slate-300 mb-4 line-clamp-2 text-sm sm:text-base">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-4 sm:gap-1">
                <div className="flex items-center gap-1">
                  <FiUser className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="truncate">{post.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiClock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{post.readingTime} წუთი</span>
                </div>
                <span className="hidden sm:inline">
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <div className="flex items-center gap-1 text-blue-400 group-hover:text-blue-300 transition-colors sm:ml-auto">
                <span>წაიკითხეთ</span>
                <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

// Add the fadeInUp animation to the global styles
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

export default BlogPage;
