"use client";

import { useState } from 'react'
import Image from 'next/image'
import projectData from '../data/projects.json'

interface ProjectRole {
  title: string;
  desc: string;
}

interface ProjectItem {
  title: string;
  subtitle: string;
  period: string;
  tags: string[];
  team: string;
  github: string;
  summary: string;
  images: string[];
  roles: ProjectRole[];
  achievements: string[];
}

const PROJECTS = projectData as ProjectItem[];

interface ProjectModalProps {
  project: ProjectItem;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-170 max-h-[85vh] bg-white overflow-y-auto shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
        style={{ borderRadius: '4px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-100 px-8 py-5 flex items-start justify-between">
          <div>
            <h2 className="font-bold text-[24px] leading-tight tracking-[-0.5px] text-neutral-900">
              {project.title}
            </h2>
            <p className="text-[13px] text-neutral-400 mt-1 tracking-[-0.1px]">{project.period}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-1 p-1.5 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-7 flex flex-col gap-8">

          {/* Images */}
          {project.images.length === 1 ? (
            <Image
              src={project.images[0]}
              alt={project.title}
              className="w-full object-cover h-auto"
              style={{ borderRadius: '4px', maxHeight: '500px' }}
              width={800}
              height={500}
            />
          ) : (
            <div className="flex justify-center gap-2 items-start">
              {project.images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`${project.title} ${i + 1}`}
                  className="h-auto object-contain"
                  style={{ borderRadius: '4px', maxHeight: '350px', maxWidth: '45%' }}
                  width={400}
                  height={350}
                />
              ))}
            </div>
          )}

          {/* Summary */}
          <section>
            <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-3">요약</p>
            <p className="text-[14px] text-neutral-700 leading-relaxed tracking-[-0.1px]">{project.summary}</p>
          </section>

          {/* Meta */}
          <section className="flex flex-col gap-3">
            <div className="flex gap-3">
              <span className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium w-20 shrink-0 pt-0.5">팀 구성</span>
              <p className="text-[13px] text-neutral-600 tracking-[-0.1px]">{project.team}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium w-20 shrink-0 pt-0.5">GitHub</span>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] text-neutral-700 hover:text-neutral-900 transition-colors tracking-[-0.1px]"
              >
                {project.github}
              </a>
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-3">기술 스택</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 border border-neutral-200 text-[12px] text-neutral-600 tracking-[-0.1px] bg-white"
                  style={{ borderRadius: '3px' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <div className="border-t border-neutral-100" />

          {/* Roles */}
          <section>
            <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-5">역할 및 기여</p>
            <div className="flex flex-col gap-5">
              {project.roles.map((role, i) => (
                <div key={i}>
                  <p className="text-[13px] font-semibold text-neutral-900 tracking-[-0.1px] mb-1.5">{role.title}</p>
                  <p className="text-[13px] text-neutral-600 leading-relaxed tracking-[-0.1px]">{role.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-neutral-100" />

          {/* Achievements */}
          <section className="pb-1">
            <p className="text-[11px] uppercase tracking-[1.5px] text-neutral-400 font-medium mb-3">성과</p>
            <ul className="flex flex-col gap-2">
              {project.achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-neutral-700 tracking-[-0.1px] leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function ProjectSection() {
  const [selected, setSelected] = useState<ProjectItem | null>(null)

  return (
    <div id="project" className="flex flex-col items-center px-5 py-24 font-sans border-b border-neutral-100">
      <div className="w-full max-w-[1200px]">

        {/* Header */}
        <div className="mb-14">
          <h1 className="font-bold text-[36px] leading-[1.15] tracking-[-1px] text-neutral-900 mb-3">
            프로젝트
          </h1>
          <p className="text-[15px] text-neutral-500 tracking-[-0.2px]">Projects</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <button
              key={project.title}
              onClick={() => setSelected(project)}
              className="group text-left flex flex-col border border-neutral-100 bg-white hover:border-neutral-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 h-full"
              style={{ borderRadius: '12px' }}
            >
              {/* Thumbnail */}
              {project.images.length === 1 ? (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full object-cover"
                  style={{ height: '220px' }}
                  width={400}
                  height={220}
                />
              ) : (
                <div className="grid grid-cols-2 overflow-hidden flex-shrink-0" style={{ height: '220px' }}>
                  {project.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      className="w-full object-cover"
                      style={{ height: '220px' }}
                      width={200}
                      height={220}
                    />
                  ))}
                </div>
              )}

              {/* Text */}
              <div className="flex flex-col flex-1 gap-4 p-6">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-[19px] leading-tight tracking-[-0.3px] text-neutral-900 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-[13.5px] text-neutral-500 leading-snug tracking-[-0.1px] line-clamp-2 min-h-10">
                    {project.subtitle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 border border-neutral-100 text-[11px] text-neutral-500 tracking-[-0.1px] bg-neutral-50 group-hover:border-neutral-200 transition-colors"
                      style={{ borderRadius: '20px' }}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-0.5 text-[11px] text-neutral-400 tracking-[-0.1px] self-center">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
                <div className="mt-auto pt-4 border-t border-neutral-50 text-[13px] font-medium text-neutral-400 group-hover:text-neutral-900 transition-colors flex items-center gap-1">
                  자세히 보기 <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
