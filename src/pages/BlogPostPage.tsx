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
      <div className="min-h-screen bg-slate-950 pt-32">
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
      <div className="min-h-screen bg-slate-950 pt-32">
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

      <div className="min-h-screen bg-slate-950">
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <article className="bg-slate-800/20 border border-slate-700/30 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="p-8 pb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-6">
                  <div className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    <span>{post.readingTime} წუთი</span>
                  </div>
                  <span>{formatDate(post.publishedAt)}</span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-3 py-1 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-slate-300"
                  >
                    <FiShare2 className="w-4 h-4" />
                    <span>გაზიარება</span>
                  </button>
                </div>
              </div>

              {/* Small Hero Image */}
              {post.thumbnail && (
                <div className="px-8 mb-8">
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-700/50">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="px-8 pb-8">
                <div className="prose prose-lg prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 bg-slate-800/40 border-t border-slate-700/50">
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
                className="px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
              >
                ← ყველა სტატია
              </Link>

              <Link
                to="/start-project"
                className="px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
              >
                დაიწყეთ პროექტი →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .prose {
          color: #cbd5e1;
          line-height: 1.75;
        }
        .prose h2, .prose h3, .prose h4 {
          color: #ffffff;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h2 {
          font-size: 1.75rem;
          border-bottom: 1px solid #475569;
          padding-bottom: 0.5rem;
        }
        .prose h3 {
          font-size: 1.375rem;
        }
        .prose p {
          margin-bottom: 1.5rem;
        }
        .prose ul, .prose ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose blockquote {
          border-left: 4px solid #3b82f6;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          background: rgba(30, 41, 59, 0.5);
          border-radius: 0.5rem;
          color: #94a3b8;
        }
        .prose a {
          color: #60a5fa;
          text-decoration: underline;
        }
        .prose a:hover {
          color: #93c5fd;
        }
        .prose code {
          background: rgba(30, 41, 59, 0.8);
          color: #e2e8f0;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        .prose pre {
          background: rgba(15, 23, 42, 0.8);
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
          overflow-x: auto;
        }
        .prose strong {
          color: #ffffff;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default BlogPostPage;