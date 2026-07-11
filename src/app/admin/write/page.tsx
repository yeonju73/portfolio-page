"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';
import Navigation from '../../../components/Navigation';
import Link from 'next/link';

interface Tag {
  id: number;
  name: string | null;
}

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [allExistingTags, setAllExistingTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  // Fetch all existing tags from database on load
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data, error } = await supabase
          .from('tags')
          .select('*')
          .order('name', { ascending: true });
        
        if (error) throw error;
        if (data) setAllExistingTags(data);
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };
    fetchTags();
  }, [supabase]);

  // Append a clicked suggested tag to the input field
  const handleTagSuggestClick = (tagName: string) => {
    const currentTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    
    if (!currentTags.includes(tagName)) {
      currentTags.push(tagName);
      setTagsInput(currentTags.join(', ') + ', ');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || loading) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      // 1. Insert the new post into the 'posts' table
      const { data: newPost, error: postError } = await supabase
        .from('posts')
        .insert({
          title: title.trim(),
          content: content.trim(),
        })
        .select()
        .single();

      if (postError) throw postError;
      if (!newPost) throw new Error('게시글 등록에 실패했습니다.');

      const postId = newPost.id;

      // 2. Parse tag names from the input
      const tagNames = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const tagIds: number[] = [];

      // 3. Match entered tags against existing tags or create them
      for (const tagName of tagNames) {
        const match = allExistingTags.find(
          t => t.name?.toLowerCase() === tagName.toLowerCase()
        );

        if (match) {
          tagIds.push(match.id);
        } else {
          // Create new tag if not existing
          const { data: newTag, error: tagError } = await supabase
            .from('tags')
            .insert({ name: tagName })
            .select()
            .single();

          if (tagError) throw tagError;
          if (newTag) {
            tagIds.push(newTag.id);
            // Append to our local list so we don't recreate it if typed twice
            setAllExistingTags(prev => [...prev, newTag]);
          }
        }
      }

      // 4. Create relations in the 'post_tags' table
      if (tagIds.length > 0) {
        const postTagsInsert = tagIds.map(tagId => ({
          post_id: postId,
          tag_id: tagId,
        }));

        const { error: relError } = await supabase
          .from('post_tags')
          .insert(postTagsInsert);

        if (relError) throw relError;
      }

      // Refresh cache and redirect to blog
      router.refresh();
      router.push('/blog');
    } catch (err: unknown) {
      console.error('Error saving post:', err);
      const error = err as Error;
      setErrorMsg(error.message || '저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <Navigation activeSection="blog" />

      {/* Write Form Container */}
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="max-w-[800px] mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-neutral-400 hover:text-neutral-900 transition-colors mb-6 group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span> 취소하고 돌아가기
            </Link>
            <h1 className="font-bold text-[32px] tracking-[-1px] text-neutral-900">
              새 글 작성하기
            </h1>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-[13.5px] rounded-r-md">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-semibold tracking-[0.5px] uppercase text-neutral-400">
                제목
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="글 제목을 입력하세요"
                className="bg-neutral-50 px-4 py-3.5 text-[15px] text-neutral-800 border border-neutral-200/60 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all placeholder-neutral-400"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-semibold tracking-[0.5px] uppercase text-neutral-400">
                태그 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Spring, Database, Next.js"
                className="bg-neutral-50 px-4 py-3.5 text-[15px] text-neutral-800 border border-neutral-200/60 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all placeholder-neutral-400"
              />
              
              {/* Tag Suggestions */}
              {allExistingTags.length > 0 && (
                <div className="mt-2.5">
                  <p className="text-[11.5px] text-neutral-400 font-medium mb-2 uppercase tracking-[0.5px]">기존 태그 목록 (클릭하여 추가)</p>
                  <div className="flex flex-wrap gap-1.5">
                    {allExistingTags.map(tag => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => tag.name && handleTagSuggestClick(tag.name)}
                        className="px-2.5 py-1 border border-neutral-200 bg-white hover:border-neutral-900 text-neutral-500 hover:text-neutral-900 transition-colors text-[12px] cursor-pointer"
                        style={{ borderRadius: '4px' }}
                      >
                        +{tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-semibold tracking-[0.5px] uppercase text-neutral-400">
                본문 내용 (마크다운 지원)
              </label>
              <textarea
                required
                rows={14}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="글 본문 내용을 작성해 주세요..."
                className="bg-neutral-50 px-4 py-4 text-[15px] text-neutral-800 border border-neutral-200/60 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all placeholder-neutral-400 font-sans resize-y"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 mt-4 pt-6 border-t border-neutral-100">
              <Link
                href="/blog"
                className="px-5 py-3 border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-950 transition-colors text-[14px] font-medium"
                style={{ borderRadius: '10px' }}
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={loading || !title.trim()}
                className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-[14px] rounded-xl disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>저장 중...</span>
                  </>
                ) : (
                  <span>글 게시하기</span>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
