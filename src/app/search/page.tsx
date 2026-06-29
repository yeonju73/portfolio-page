"use client";

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface Question {
  text: string;
  icon: string;
}

interface RelevantDocument {
  metadata?: {
    file?: string;
    [key: string]: any;
  };
}

interface RagResponse {
  data?: {
    answer?: string;
    relevantDocuments?: RelevantDocument[];
  };
}

const suggestedQuestions: Question[] = [
  { text: '박연주의 프로젝트 내용에 대해 설명해줘.', icon: '☁' },
  { text: '박연주의 수상 내용에 대해 설명해줘.', icon: '⚡' },
  { text: '박연주의 자격증 내용에 대해 설명해줘.', icon: '📄' },
  { text: '박연주의 동아리 경험 내용에 대해 설명해줘.', icon: '🍝' },
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading])

  const sendQuery = async (text: string) => {
    if (!text.trim() || loading) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    setQuery('')
    setLoading(true)
    try {
      const res = await fetch('http://3.36.59.80:8080/api/v1/rag/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, maxResults: 3, model: 'gpt-3.5-turbo' }),
      })
      const json: RagResponse = await res.json()
      let answer = json?.data?.answer ?? '응답을 가져오지 못했습니다.'
      const docs = json?.data?.relevantDocuments ?? []
      answer = answer.replace(/\[(\d+)\] Unknown file/g, (_, n) => {
        const doc = docs[Number(n) - 1]
        return doc ? `[${n}] ${doc.metadata?.file ?? 'Unknown file'}` : `[${n}] Unknown file`
      })
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: '서버에 연결할 수 없습니다.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendQuery(query.trim())
  }

  const hasChatStarted = messages.length > 0 || loading

  return (
    <div className="flex flex-col items-center px-5 py-16 font-sans">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        <div className="w-full max-w-[640px] flex flex-col items-center">
        {/* Title */}
        <h1 className="font-bold text-[36px] leading-[1.15] tracking-[-1px] text-neutral-900 mb-2">
          무엇이든 물어보세요
        </h1>
        <p className="text-neutral-400 text-[15px] mb-10 tracking-[-0.2px]">
          검색하거나 질문을 입력하세요
        </p>

        {/* Chat Messages */}
        {hasChatStarted && (
          <div className="w-full mb-6 flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-1">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-3 text-[14px] leading-relaxed tracking-[-0.1px] whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-50 border border-neutral-200 text-neutral-800'
                  }`}
                  style={{ borderRadius: '3px' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 bg-neutral-50 border border-neutral-200 text-neutral-400 text-[14px]"
                  style={{ borderRadius: '3px' }}
                >
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: '0ms' }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: '150ms' }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: '300ms' }}>·</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Search Input */}
        <form onSubmit={handleSubmit} className="w-full mb-12">
          <div
            className={`relative flex items-center w-full bg-neutral-50 border transition-all duration-200 ease-out ${
              isFocused
                ? 'border-neutral-300 shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
                : 'border-neutral-200 shadow-none'
            }`}
            style={{ borderRadius: '3px' }}
          >
            <div className="pl-4 pr-2 flex items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="검색어를 입력하세요..."
              className="flex-1 bg-transparent py-3 pr-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none tracking-[-0.2px]"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="mr-2 p-1 text-neutral-400 hover:text-neutral-600 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className={`mr-1.5 px-3 py-1.5 text-[13px] font-medium transition-all duration-150 ${
                query.trim() && !loading
                  ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                  : 'bg-neutral-200 text-neutral-400 cursor-default'
              }`}
              style={{ borderRadius: '2px' }}
              disabled={!query.trim() || loading}
            >
              검색
            </button>
          </div>
        </form>

        {/* Suggested Questions */}
        <div className="w-full">
          <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-4">
            추천 질문
          </p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedQuestions.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => sendQuery(item.text)}
                className="group flex items-center gap-2.5 text-left px-3 py-2.5 border border-neutral-100 bg-white hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-150 cursor-pointer"
                style={{ borderRadius: '3px' }}
              >
                <span className="text-[15px] shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
                <span className="text-[13px] text-neutral-600 group-hover:text-neutral-900 transition-colors tracking-[-0.1px] leading-snug">
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {!hasChatStarted && (
          <div className="mt-12 flex items-center gap-1.5 text-neutral-300 text-[12px]">
            <kbd className="px-1.5 py-0.5 border border-neutral-200 text-neutral-400 font-mono text-[11px]" style={{ borderRadius: '2px' }}>Enter</kbd>
            <span>로 검색</span>
          </div>
        )}
      </div>
    </div>
  </div>
)
}
