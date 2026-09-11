"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export function FadeIn({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(32px)",
        transition: `opacity 0.9s cubic-bezier(.23,1,.32,1) ${delay}s, transform 0.9s cubic-bezier(.23,1,.32,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
