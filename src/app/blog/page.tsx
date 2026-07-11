import Navigation from '../../components/Navigation';
import BlogList, { BlogPost } from './BlogList';
import { supabase } from '../../utils/supabase';

// Tell Next.js to not cache this page statically if we want it dynamic, 
// or let Next.js statically generate it and revalidate.
export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  // Fetch posts from Supabase database joined with tags
  const { data: rawPosts, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      content,
      created_at,
      post_tags (
        tags (
          name
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts from Supabase:', error);
  }

  interface RawPostTag {
    tags: {
      name: string | null;
    } | null;
  }

  // Format the raw database posts to match our UI-friendly BlogPost interface
  const formattedPosts: BlogPost[] = (rawPosts || []).map((post) => {
    const tags: string[] = [];
    if (Array.isArray(post.post_tags)) {
      (post.post_tags as unknown as RawPostTag[]).forEach((pt) => {
        if (pt?.tags?.name) {
          tags.push(pt.tags.name);
        }
      });
    }

    // Default category to the first tag, or 'Backend' if none exists
    const category = tags[0] || 'Backend';

    // Format created_at to YYYY.MM.DD
    const dateObj = new Date(post.created_at);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const date = `${yyyy}.${mm}.${dd}`;

    // Generate summary excerpt by stripping basic markdown symbols
    const content = post.content || '';
    const cleanExcerptText = content
      .replace(/[#*`_\-\n]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const excerpt = cleanExcerptText.substring(0, 140) + (cleanExcerptText.length > 140 ? '...' : '');

    // Simple read time estimation
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(words / 150)) + ' min read';

    return {
      id: post.id,
      title: post.title,
      excerpt,
      category,
      tags,
      date,
      readTime,
    };
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <Navigation activeSection="blog" />

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="max-w-[800px] mb-16">
          <span className="text-[#3b82f6] font-semibold text-[13px] tracking-[1.5px] uppercase mb-3 block">
            Dev Blog
          </span>
          <h1 className="font-bold text-[38px] md:text-[46px] leading-[1.2] tracking-[-1px] text-neutral-900 mb-5">
            Writing & Thoughts
          </h1>
          <p className="text-[16px] text-neutral-500 tracking-[-0.2px] leading-relaxed">
            개발 과정에서의 고민, 기술적 트러블슈팅, 아키텍처 개선 기록을 공유합니다.
          </p>
        </div>

        {/* Dynamic posts list containing category filters */}
        <BlogList posts={formattedPosts} />

      </div>
    </div>
  );
}
