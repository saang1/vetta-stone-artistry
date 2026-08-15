import { useEffect, useRef, useState } from "react";

interface Props {
  images: string[];
  alt: string;
  priority?: boolean;
  /** ms each image is shown before fading to next (default 6500) */
  interval?: number;
  /** ms to wait before first auto-advance — use to stagger multiple instances */
  startOffset?: number;
  /** extra classes on the wrapper div (e.g. hover scale) */
  className?: string;
}

export function CrossfadeCarousel({
  images,
  alt,
  priority = false,
  interval = 6500,
  startOffset = 0,
  className = "",
}: Props) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length <= 1) return;

    // Preload next image before it's needed
    const preloaded = new Set<string>([images[0] ?? ""]);
    const preload = (src: string) => {
      if (!src || preloaded.has(src)) return;
      preloaded.add(src);
      const el = new window.Image();
      el.src = src;
    };
    if (images[1]) preload(images[1]);

    // Honor prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    // Pause when off-screen to save resources
    let isVisible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        isVisible = e?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    io.observe(container);

    let idx = 0;
    let tid: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (isVisible) {
        idx = (idx + 1) % images.length;
        setActive(idx);
        // Preload the image after next
        const ahead = images[(idx + 1) % images.length];
        if (ahead) preload(ahead);
      }
      tid = setTimeout(tick, interval);
    };

    // First tick fires after startOffset + one full interval
    tid = setTimeout(tick, startOffset + interval);

    return () => {
      clearTimeout(tid);
      io.disconnect();
    };
  }, [images, interval, startOffset]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i !== 0}
          loading={i === 0 && priority ? "eager" : "lazy"}
          fetchPriority={i === 0 && priority ? "high" : undefined}
          decoding={i === 0 ? "sync" : "async"}
          className={[
            "absolute inset-0 h-full w-full object-cover object-center",
            "transition-opacity duration-[1800ms] ease-in-out",
            i === active ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
