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
    [key: string]: unknown;
  };
}

interface RagResponse {
  data?: {
    answer?: string;
    relevantDocuments?: RelevantDocument[];
  };
}

const suggestedQuestions: Question[] = [
  { text: 'bankK 프로젝트의 멱등성 보장 기법을 설명해줘.', icon: '☁' },
  { text: 'DriveU 대용량 파일 업로드 최적화 방법은?', icon: '⚡' },
  { text: '박연주 님의 보유 자격증과 수상 기록은?', icon: '🏆' },
  { text: '활동 및 경험 내용을 요약해줘.', icon: '📄' },
]

export default function SearchSection() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ((messages.length > 0 || loading) && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading])

  const sendQuery = async (text: string) => {
    if (!text.trim() || loading) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    setQuery('')
    setLoading(true)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    try {
      const res = await fetch('http://3.36.59.80:8080/api/v1/rag/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, maxResults: 3, model: 'gpt-3.5-turbo' }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (!res.ok) {
        throw new Error('Server responded with an error')
      }

      const json: RagResponse = await res.json()
      let answer = json?.data?.answer ?? '응답을 가져오지 못했습니다.'
      const docs = json?.data?.relevantDocuments ?? []
      answer = answer.replace(/\\\[(\d+)\\\] Unknown file/g, (_, n) => {
        const doc = docs[Number(n) - 1]
        return `[${doc?.metadata?.file ?? '참조 문서'}]`
      })
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }])
    } catch (err: unknown) {
      clearTimeout(timeoutId)
      const isTimeout = err instanceof Error && err.name === 'AbortError'
      
      const errorMessage = isTimeout
        ? '현재 RAG 백엔드 서버의 응답 속도가 지연되고 있어 답변을 가져오지 못했습니다. 잠시 후 다시 시도해 주시기 바랍니다. (자격증, 프로젝트 이력 등 상세 정보는 아래의 Projects와 Experiences 섹션에서도 풍부하게 확인하실 수 있습니다!)'
        : '현재 RAG 백엔드 서버가 오프라인 상태이거나 네트워크 연결에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요. (보유 기술 및 기여 이력 등은 아래의 Projects와 Experiences 섹션에서도 확인하실 수 있습니다!)'

      setMessages((prev) => [...prev, { role: 'assistant', text: errorMessage }])
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
    <div id="search" className="flex flex-col items-center px-5 py-24 font-sans border-b border-neutral-100 bg-neutral-50/50">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="font-bold text-[36px] leading-[1.15] tracking-[-1px] text-neutral-900 mb-3">
            Ask AI Assistant
          </h1>
          <p className="text-neutral-500 text-[14px] tracking-[-0.2px]">
            포트폴리오의 내용에 대해 무엇이든 RAG AI에게 질문해 보세요.
          </p>
        </div>

        {/* Outer Box */}
        <div 
          className="w-full max-w-[720px] bg-white border border-neutral-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden transition-all duration-500"
          style={{ borderRadius: '16px' }}
        >
          {/* Chat Messages Area (Accordion / Grow) */}
          <div 
            className={`w-full overflow-y-auto px-6 transition-all duration-500 ease-in-out ${
              hasChatStarted ? 'max-h-[360px] py-6 border-b border-neutral-100' : 'max-h-0'
            }`}
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div
                  className={`max-w-[85%] px-4 py-3 text-[13.5px] leading-relaxed tracking-[-0.1px] whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-neutral-900 text-white rounded-2xl rounded-tr-none'
                      : 'bg-neutral-50 border border-neutral-200/60 text-neutral-800 rounded-2xl rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="bg-neutral-50 border border-neutral-200/60 text-neutral-500 px-4 py-3 text-[13.5px] rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form and Input */}
          <form onSubmit={handleSubmit} className="p-4 flex gap-2 items-center bg-white">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="박연주 님의 주요 역량에 대해 알려줘..."
              className="flex-1 bg-neutral-50 px-4 py-3 text-[14px] text-neutral-800 border border-neutral-200/60 rounded-xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all placeholder-neutral-400"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-[13.5px] rounded-xl disabled:opacity-40 transition-opacity shrink-0 flex items-center gap-1.5"
            >
              <span>질문</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>

        {/* Suggested Questions Tags */}
        <div className="mt-8 w-full max-w-[720px] flex flex-col items-center">
          <p className="text-[11.5px] uppercase tracking-[1px] text-neutral-400 font-medium mb-3">추천 질문</p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestedQuestions.map((item) => (
              <button
                key={item.text}
                onClick={() => sendQuery(item.text)}
                disabled={loading}
                className="group flex items-center gap-1.5 px-3.5 py-2 border border-neutral-200/60 bg-white hover:border-neutral-900 transition-all text-neutral-600 hover:text-neutral-900 disabled:opacity-50 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                style={{ borderRadius: '20px' }}
              >
                <span className="text-[13px] opacity-60 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
                <span className="text-[12px] font-medium tracking-[-0.1px]">
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
