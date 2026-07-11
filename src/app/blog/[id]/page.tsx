import Link from 'next/link';
import Navigation from '../../../components/Navigation';
import { supabase } from '../../../utils/supabase';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: post } = await supabase
    .from('posts')
    .select('title')
    .eq('id', Number(id))
    .single();

  return {
    title: post ? `${post.title} | Blog` : 'Blog Post',
    description: '박연주 개발 블로그 포스트 상세 보기입니다.',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;

  // Query Supabase for the post details by ID
  const { data: post, error } = await supabase
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
    .eq('id', Number(id))
    .single();

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation activeSection="blog" />
        <div className="max-w-[1200px] mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
          <h1 className="font-bold text-[32px] text-neutral-900 mb-4">Post Not Found</h1>
          <p className="text-neutral-500 mb-8">요청하신 블로그 글을 찾을 수 없거나 삭제되었습니다.</p>
          <Link 
            href="/blog"
            className="px-5 py-2.5 bg-neutral-900 text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors"
            style={{ borderRadius: '6px' }}
          >
            블로그 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  interface RawPostTag {
    tags: {
      name: string | null;
    } | null;
  }

  // Extract tags from joined post_tags
  const tags: string[] = [];
  if (Array.isArray(post.post_tags)) {
    (post.post_tags as unknown as RawPostTag[]).forEach((pt) => {
      if (pt?.tags?.name) {
        tags.push(pt.tags.name);
      }
    });
  }

  // Format date to YYYY.MM.DD
  const dateObj = new Date(post.created_at);
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  const date = `${yyyy}.${mm}.${dd}`;

  // Simple reading time estimator
  const content = post.content || '';
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(words / 150)) + ' min read';

  // Helper to render markdown content safely and cleanly as JSX/HTML structure
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    let insideList = false;
    const listItems: string[] = [];
    const elements: React.ReactNode[] = [];

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${key}`} className="list-disc pl-6 mb-6 flex flex-col gap-2.5 text-neutral-600 leading-relaxed text-[15.5px]">
            {listItems.map((item, idx) => (
              <li key={`li-${key}-${idx}`}>{item}</li>
            ))}
          </ul>
        );
        listItems.length = 0;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Heading 1
      if (trimmed.startsWith('# ')) {
        flushList(index);
        elements.push(
          <h1 key={index} className="text-[28px] md:text-[34px] font-bold text-neutral-900 mt-10 mb-4 tracking-[-0.5px]">
            {trimmed.replace('# ', '')}
          </h1>
        );
      } 
      // Heading 2
      else if (trimmed.startsWith('## ')) {
        flushList(index);
        elements.push(
          <h2 key={index} className="text-[22px] md:text-[26px] font-bold text-neutral-900 mt-8 mb-3.5 tracking-[-0.3px]">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } 
      // Heading 3
      else if (trimmed.startsWith('### ')) {
        flushList(index);
        elements.push(
          <h3 key={index} className="text-[18px] md:text-[20px] font-bold text-neutral-900 mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } 
      // Bullet items
      else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        insideList = true;
        listItems.push(trimmed.substring(2));
      } 
      // Code blocks (very basic styling)
      else if (trimmed.startsWith('```')) {
        flushList(index);
        // We skip processing the code block delimiter itself but can wrap next lines
      } 
      // Paragraphs or empty lines
      else {
        if (trimmed === '') {
          flushList(index);
        } else {
          if (insideList) {
            flushList(index);
            insideList = false;
          }
          elements.push(
            <p key={index} className="text-[15.5px] text-neutral-600 leading-relaxed mb-5 tracking-[-0.1px] whitespace-pre-line">
              {trimmed}
            </p>
          );
        }
      }
    });

    flushList(lines.length);
    return elements;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <Navigation activeSection="blog" />

      {/* Main Container */}
      <article className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="max-w-[760px] mx-auto">
          
          {/* Back button */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-neutral-400 hover:text-neutral-900 transition-colors mb-10 group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span> 목록으로 돌아가기
          </Link>

          {/* Post Header */}
          <header className="border-b border-neutral-100 pb-8 mb-10">
            {/* Meta */}
            <div className="flex items-center gap-3 text-[12.5px] text-neutral-400 font-medium mb-4">
              <span>{date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
              <span>{readTime}</span>
            </div>

            {/* Title */}
            <h1 className="font-bold text-[32px] sm:text-[38px] md:text-[44px] leading-[1.2] tracking-[-1px] text-neutral-900 mb-5">
              {post.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 border border-neutral-200 text-[11px] font-medium text-neutral-500 bg-neutral-50"
                  style={{ borderRadius: '4px' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Post Body (Content) */}
          <div className="prose prose-neutral max-w-none">
            {renderContent(content)}
          </div>

        </div>
      </article>
    </div>
  );
}
