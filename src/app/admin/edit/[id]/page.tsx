import { createClient } from '../../../../lib/supabase/server';
import Navigation from '../../../../components/Navigation';
import Link from 'next/link';
import EditForm from './EditForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch post details along with its tags
  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      content,
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
          <p className="text-neutral-500 mb-8">수정할 블로그 글을 찾을 수 없거나 이미 삭제되었습니다.</p>
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

  // Format existing tags into a comma-separated string
  const tagsList: string[] = [];
  if (Array.isArray(post.post_tags)) {
    (post.post_tags as unknown as RawPostTag[]).forEach((pt) => {
      if (pt?.tags?.name) {
        tagsList.push(pt.tags.name);
      }
    });
  }
  const tagsString = tagsList.join(', ');

  const formattedPost = {
    id: post.id,
    title: post.title,
    content: post.content || '',
    tagsString: tagsString,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <Navigation activeSection="blog" />

      {/* Edit Form Container */}
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <Link 
              href={`/blog/${post.id}`}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-neutral-400 hover:text-neutral-900 transition-colors mb-6 group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span> 취소하고 상세 보기로 돌아가기
            </Link>
            <h1 className="font-bold text-[32px] tracking-[-1px] text-neutral-900">
              블로그 글 수정하기
            </h1>
          </div>

          {/* Client-side form handler */}
          <EditForm post={formattedPost} />

        </div>
      </div>
    </div>
  );
}
