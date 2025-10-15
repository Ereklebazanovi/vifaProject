import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getBlogPostBySlug, formatDate, generateExcerpt } from '../utils/blogUtils';
import type { BlogPost } from '../types/blog';
import { FiClock, FiUser, FiArrowLeft, FiShare2 } from 'react-icons/fi';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const blogPost = await getBlogPostBySlug(slug);
        if (blogPost) {
          setPost(blogPost);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (error) {
        navigator.clipboard.writeText(window.location.href);
        alert('ბმული კოპირებულია!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('ბმული კოპირებულია!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-black pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📄</div>
            <h1 className="text-2xl font-semibold text-white mb-4">სტატია ვერ მოიძებნა</h1>
            <p className="text-slate-400 mb-8">ეს სტატია არ არსებობს ან წაშლილია</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              ბლოგზე დაბრუნება
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const excerpt = generateExcerpt(post.content, 160);

  return (
    <>
      <Helmet>
        <title>{post.seo?.title || post.title} - Vifa Digital</title>
        <meta name="description" content={post.seo?.description || post.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.seo?.title || post.title} />
        <meta property="og:description" content={post.seo?.description || excerpt} />
        <meta property="og:image" content={post.seo?.ogImage || post.thumbnail || '/images/blog/default-og.jpg'} />
        <meta property="og:url" content={`https://vifadigital.com/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.publishedAt} />
        {post.updatedAt && <meta property="article:modified_time" content={post.updatedAt} />}
        <meta property="article:author" content={post.author.name} />
        {post.tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seo?.title || post.title} />
        <meta name="twitter:description" content={post.seo?.description || excerpt} />
        <meta name="twitter:image" content={post.seo?.ogImage || post.thumbnail || '/images/blog/default-og.jpg'} />

        {/* Additional SEO */}
        <link rel="canonical" href={`https://vifadigital.com/blog/${post.slug}`} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-black mt-16">
        <div className="pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <div className="mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>ბლოგზე დაბრუნება</span>
              </Link>
            </div>

            {/* Article */}
            <article className="bg-gray-900/30 border border-gray-800/40 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="p-6 sm:p-8 pb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-400 mb-6">
                  <div className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    <span>{post.readingTime} წუთი</span>
                  </div>
                  <span className="hidden sm:inline">{formatDate(post.publishedAt)}</span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors text-slate-300 text-xs sm:text-sm"
                  >
                    <FiShare2 className="w-4 h-4" />
                    <span className="hidden sm:inline">გაზიარება</span>
                    <span className="sm:hidden">📤</span>
                  </button>
                </div>
              </div>

              {/* Thumbnail Image */}
              {post.thumbnail && (
                <div className="px-6 sm:px-8 mb-8">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-lg overflow-hidden bg-gray-800/50">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="px-6 sm:px-8 pb-8">
                <div className="prose prose-lg prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 bg-gray-900/40 border-t border-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-white">{post.author.name}</div>
                      <div className="text-sm text-slate-400">Vifa Digital</div>
                    </div>
                  </div>

                  <Link
                    to="/start-project"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    უფასო კონსულტაცია
                  </Link>
                </div>
              </div>
            </article>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <Link
                to="/blog"
                className="px-6 py-3 bg-gray-900/50 hover:bg-gray-900 text-slate-300 hover:text-white rounded-lg transition-colors"
              >
                ← ყველა სტატია
              </Link>

              <Link
                to="/start-project"
                className="px-6 py-3 bg-gray-900/50 hover:bg-gray-900 text-slate-300 hover:text-white rounded-lg transition-colors"
              >
                დაიწყეთ პროექტი →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Main prose styling - optimized for readability */
        .prose {
          color: #e2e8f0;
          line-height: 1.75;
          font-size: 1.125rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Lead paragraph */
        .prose .lead {
          font-size: 1.25rem;
          font-weight: 400;
          color: #f1f5f9;
          margin-bottom: 2.5rem;
          line-height: 1.7;
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          background: rgba(59, 130, 246, 0.05);
          padding: 1.5rem;
          border-radius: 0.5rem;
        }

        /* Headings with better hierarchy */
        .prose h2, .prose h3, .prose h4 {
          color: #ffffff;
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          scroll-margin-top: 6rem;
        }

        .prose h2 {
          font-size: 1.875rem;
          border-bottom: 2px solid #475569;
          padding-bottom: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .prose h3 {
          font-size: 1.5rem;
          color: #60a5fa;
        }

        .prose h4 {
          font-size: 1.25rem;
          color: #94a3b8;
        }

        /* Paragraph spacing for better reading flow */
        .prose p {
          margin-bottom: 1.75rem;
          text-align: justify;
          hyphens: auto;
        }

        /* Lists with better spacing */
        .prose ul, .prose ol {
          margin: 2rem 0;
          padding-left: 2rem;
        }

        .prose li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }

        .prose li::marker {
          color: #60a5fa;
        }

        /* Enhanced blockquotes */
        .prose blockquote {
          border-left: 4px solid #3b82f6;
          padding: 1.5rem 2rem;
          margin: 2.5rem 0;
          background: rgba(30, 41, 59, 0.6);
          border-radius: 0.75rem;
          color: #cbd5e1;
          font-style: italic;
          font-size: 1.1rem;
          position: relative;
        }

        .prose blockquote::before {
          content: '"';
          font-size: 4rem;
          color: #3b82f6;
          position: absolute;
          top: -0.5rem;
          left: 1rem;
          line-height: 1;
        }

        .prose blockquote p {
          margin: 0;
          position: relative;
          z-index: 1;
        }

        /* Links with better hover states */
        .prose a {
          color: #60a5fa;
          text-decoration: none;
          border-bottom: 1px dotted #60a5fa;
          transition: all 0.2s ease;
        }

        .prose a:hover {
          color: #93c5fd;
          border-bottom: 1px solid #93c5fd;
          background: rgba(96, 165, 250, 0.1);
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          margin: 0 -0.25rem;
        }

        /* Code styling */
        .prose code {
          background: rgba(15, 23, 42, 0.8);
          color: #e2e8f0;
          padding: 0.375rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.9rem;
          border: 1px solid #334155;
        }

        .prose pre {
          background: rgba(15, 23, 42, 0.9);
          padding: 2rem;
          border-radius: 0.75rem;
          margin: 2rem 0;
          overflow-x: auto;
          border: 1px solid #334155;
        }

        /* Strong text */
        .prose strong {
          color: #ffffff;
          font-weight: 700;
        }

        /* Enhanced highlight boxes */
        .prose .highlight-box {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.6));
          border: 1px solid #475569;
          border-radius: 1rem;
          padding: 2.5rem;
          margin: 3rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .prose .highlight-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd);
        }

        .prose .highlight-box h4 {
          color: #60a5fa;
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .prose .highlight-box h4::before {
          content: '▶';
          color: #3b82f6;
          font-size: 0.875rem;
        }

        .prose .highlight-box h4:not(:first-child) {
          margin-top: 2rem;
        }

        .prose .highlight-box p {
          margin-bottom: 0;
          color: #cbd5e1;
          line-height: 1.7;
        }

        .prose .highlight-box p:not(:last-child) {
          margin-bottom: 1.5rem;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .prose {
            font-size: 1rem;
            line-height: 1.7;
          }

          .prose .lead {
            font-size: 1.125rem;
            padding: 1rem;
          }

          .prose h2 {
            font-size: 1.5rem;
          }

          .prose h3 {
            font-size: 1.25rem;
          }

          .prose blockquote {
            padding: 1rem 1.5rem;
            margin: 2rem 0;
          }

          .prose .highlight-box {
            padding: 1.5rem;
            margin: 2rem 0;
          }

          .prose p {
            text-align: left;
          }
        }
      `}</style>
    </>
  );
};

export default BlogPostPage;