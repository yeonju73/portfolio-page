"use client";

import { useState } from 'react';
import Link from 'next/link';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
}

interface BlogListProps {
  posts: BlogPost[];
  allTags: string[];
}

export default function BlogList({ posts, allTags }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Use the allTags prop passed from the database, prepended with 'All'
  const categories = ['All', ...allTags];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.tags.includes(selectedCategory));

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2.5 mb-14 border-b border-neutral-100 pb-6">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-[13px] font-medium tracking-[-0.1px] transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                  : 'bg-neutral-50 border border-neutral-200/60 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/60'
              }`}
              style={{ borderRadius: '20px' }}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Blog Posts List */}
      <div className="max-w-[800px] flex flex-col gap-12">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article 
              key={post.id}
              className="group flex flex-col items-start border-b border-neutral-100 pb-12 last:border-b-0"
            >
              {/* Meta details */}
              <div className="flex items-center gap-3 text-[12px] text-neutral-400 font-medium tracking-[-0.1px] mb-3">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span className="text-[#3b82f6]">{post.category}</span>
              </div>

              {/* Title */}
              <Link href={`/blog/${post.id}`} className="block">
                <h2 className="font-bold text-[22px] md:text-[24px] text-neutral-900 leading-snug tracking-[-0.4px] mb-3.5 group-hover:text-[#3b82f6] transition-colors duration-200 cursor-pointer">
                  {post.title}
                </h2>
              </Link>

              {/* Excerpt */}
              <p className="text-[14.5px] text-neutral-500 leading-relaxed tracking-[-0.2px] mb-5">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 border border-neutral-100 text-[11px] text-neutral-500 bg-neutral-50"
                    style={{ borderRadius: '4px' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read Link */}
              <Link 
                href={`/blog/${post.id}`}
                className="text-[13.5px] font-semibold text-neutral-800 group-hover:text-[#3b82f6] transition-colors duration-200 flex items-center gap-1 cursor-pointer"
              >
                Read Post <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </article>
          ))
        ) : (
          <div className="w-full text-center py-20 border border-dashed border-neutral-200 rounded-2xl bg-neutral-50/50">
            <p className="text-[14px] text-neutral-400">등록된 블로그 글이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
