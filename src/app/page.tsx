"use client";

import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import AboutSection from '../components/AboutSection'
import SearchSection from '../components/SearchSection'
import ProjectSection from '../components/ProjectSection'
import ExperienceSection from '../components/ExperienceSection'
import CertificationSection from '../components/CertificationSection'

export default function Home() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const sections = ['about', 'search', 'project', 'experience', 'certification'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // If we are at the very top, force 'about'
      if (window.scrollY < 50) {
        setActiveSection('about');
        return;
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      if (window.scrollY < 50) {
        setActiveSection('about');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <Navigation activeSection={activeSection} />

      {/* Sections */}
      <AboutSection />
      <SearchSection />
      <ProjectSection />
      <ExperienceSection />
      <CertificationSection />
    </div>
  )
}
