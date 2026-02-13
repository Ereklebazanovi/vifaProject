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
    const shareUrl = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(post?.title || '')}`;

    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: shareUrl,
        });
      } catch (error) {
        window.open(facebookShareUrl, 'facebook-share', 'width=550,height=420');
      }
    } else {
      window.open(facebookShareUrl, 'facebook-share', 'width=550,height=420');
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
        <meta property="og:image" content={`https://www.vifadigital.ge${post.seo?.ogImage || post.thumbnail || '/images/blog/default-og.jpg'}`} />
        <meta property="og:image:secure_url" content={`https://www.vifadigital.ge${post.seo?.ogImage || post.thumbnail || '/images/blog/default-og.jpg'}`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`https://www.vifadigital.ge/blog/${post.slug}`} />
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
        <meta name="twitter:image" content={`https://www.vifadigital.ge${post.seo?.ogImage || post.thumbnail || '/images/blog/default-og.jpg'}`} />

        {/* Additional SEO */}
        <link rel="canonical" href={`https://www.vifadigital.ge/blog/${post.slug}`} />
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
            <article className="bg-gradient-to-br from-gray-900/80 to-slate-900/60 border border-gray-800/40 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-blue-900/30">
              {/* Header */}
              <div className="p-4 sm:p-6 pb-4 flex flex-col items-center text-center">
                <h1 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                  {post.title}
                </h1>
                {/* Meta */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-base text-slate-400 mb-6">
                  <div className="flex items-center gap-2">
                    <FiUser className="w-5 h-5" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="w-5 h-5" />
                    <span>{post.readingTime} წუთი</span>
                  </div>
                  <span className="hidden sm:inline">{formatDate(post.publishedAt)}</span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-700/20 hover:bg-blue-700/40 rounded-lg transition-colors text-blue-300 text-xs sm:text-base font-medium"
                  >
                    <FiShare2 className="w-5 h-5" />
                    <span className="hidden sm:inline">გაზიარება</span>
                    <span className="sm:hidden">📤</span>
                  </button>
                </div>
                
              </div>

              {/* Content */}
              <div className="px-4 sm:px-6 pb-12 flex justify-center lg:!max-w-5xl lg:mx-auto">
                <div className="w-full max-w-xl prose prose-lg prose-invert leading-relaxed tracking-wide text-slate-200" style={{ fontFamily: "'Inter', 'Noto Sans Georgian', sans-serif" }}>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-8 bg-gradient-to-r from-gray-900/60 to-blue-900/30 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                    <img src="/vifa.jpg" alt="Vifa Digital Team" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{post.author.name}</div>
                    <div className="text-sm text-slate-400">Vifa Digital</div>
                  </div>
                </div>
                <Link
                  to="/start-project"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all font-semibold shadow-md"
                >
                  უფასო კონსულტაცია
                </Link>
              </div>
            </article>

            {/* Navigation */}
            <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
              <Link
                to="/blog"
                className="px-6 py-3 bg-gray-900/60 hover:bg-gray-900 text-slate-300 hover:text-white rounded-lg transition-colors text-center"
              >
                ← ყველა სტატია
              </Link>
              <Link
                to="/start-project"
                className="px-6 py-3 bg-blue-700/20 hover:bg-blue-700/40 text-blue-300 hover:text-white rounded-lg transition-colors text-center"
              >
                დაიწყეთ პროექტი →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .prose {
          color: #e2e8f0;
          line-height: 1.8;
          font-size: 1.18rem;
          font-family: 'Inter', 'Noto Sans Georgian', sans-serif;
          letter-spacing: 0.01em;
        }
        .prose h2, .prose h3, .prose h4 {
          color: #fff;
          font-weight: 800;
          margin-top: 2.5rem;
          margin-bottom: 1.2rem;
          scroll-margin-top: 6rem;
        }
        .prose h2 {
          font-size: 2rem;
          border-bottom: 2px solid #334155;
          padding-bottom: 0.5rem;
        }
        .prose h3 {
          font-size: 1.4rem;
          color: #60a5fa;
        }
        .prose h4 {
          font-size: 1.15rem;
          color: #a5b4fc;
        }
        .prose p {
          margin-bottom: 1.5rem;
          text-align: justify;
          hyphens: auto;
        }
        .prose ul, .prose ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        .prose li {
          margin-bottom: 0.7rem;
          line-height: 1.7;
        }
        .prose li::marker {
          color: #60a5fa;
        }
        .prose blockquote {
          border-left: 4px solid #3b82f6;
          padding: 1.2rem 2rem;
          margin: 2rem 0;
          background: rgba(30, 41, 59, 0.6);
          border-radius: 0.75rem;
          color: #cbd5e1;
          font-style: italic;
          font-size: 1.08rem;
          position: relative;
        }
        .prose blockquote::before {
          content: '"';
          font-size: 3rem;
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
        .prose a {
          color: #60a5fa;
          text-decoration: none;
          border-bottom: 1px dotted #60a5fa;
          transition: all 0.2s;
        }
        .prose a:hover {
          color: #a5b4fc;
          border-bottom: 1px solid #a5b4fc;
          background: rgba(96, 165, 250, 0.1);
          padding: 0.1rem 0.2rem;
          border-radius: 0.2rem;
        }
        .prose code {
          background: rgba(15, 23, 42, 0.8);
          color: #e2e8f0;
          padding: 0.32rem 0.5rem;
          border-radius: 0.3rem;
          font-size: 0.98rem;
          border: 1px solid #334155;
        }
        .prose pre {
          background: rgba(15, 23, 42, 0.95);
          padding: 1.5rem;
          border-radius: 0.7rem;
          margin: 2rem 0;
          overflow-x: auto;
          border: 1px solid #334155;
        }
        .prose strong {
          color: #fff;
          font-weight: 700;
        }
        .prose img {
          border-radius: 1rem;
          margin: 2rem auto;
          box-shadow: 0 4px 24px 0 rgba(30,41,59,0.18);
          max-width: 100%;
          display: block;
        }
        .prose table {
          width: 100%;
          background: rgba(30,41,59,0.7);
          border-radius: 0.5rem;
          overflow: hidden;
          margin: 2rem 0;
        }
        .prose th, .prose td {
          padding: 0.75rem 1rem;
          border: 1px solid #334155;
        }
        .prose th {
          background: #1e293b;
          color: #60a5fa;
          font-weight: 700;
        }
        .prose tr:nth-child(even) {
          background: rgba(51,65,85,0.3);
        }
        @media (max-width: 640px) {
          .prose {
            font-size: 1.04rem;
            line-height: 1.7;
          }
          .prose h2 {
            font-size: 1.3rem;
          }
          .prose h3 {
            font-size: 1.1rem;
          }
          .prose blockquote {
            padding: 1rem 1.2rem;
            margin: 1.2rem 0;
          }
          .prose img {
            margin: 1.2rem auto;
          }
        }
      `}</style>
    </>
  );
};

export default BlogPostPage;