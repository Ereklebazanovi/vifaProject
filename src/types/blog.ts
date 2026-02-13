export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  thumbnail?: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  readingTime?: number;
  seo?: {
    title: string;
    description: string;
    ogImage?: string;
  };
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  thumbnail?: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  readingTime?: number;
  seo?: {
    title: string;
    description: string;
    ogImage?: string;
  };
}