'use client';

import { useEffect, useRef } from 'react';

export function ScrollReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay === 1 ? ' reveal-delay-1' : delay === 2 ? ' reveal-delay-2' : delay === 3 ? ' reveal-delay-3' : '';

  return (
    <div ref={ref} className={`reveal${delayClass}${className ? ' ' + className : ''}`}>
      {children}
    </div>
  );
}

export function RevealGroup({ children, className = '' }) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <ScrollReveal key={i} delay={i < 4 ? i : 0}>
              {child}
            </ScrollReveal>
          ))
        : children}
    </div>
  );
}
