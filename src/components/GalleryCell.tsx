import type { LightboxItem } from "./Lightbox";

interface GalleryCellProps {
  item: LightboxItem;
  index: number;
  onOpen: (index: number) => void;
  priority?: boolean;
  className?: string;
}

export function GalleryCell({
  item,
  index,
  onOpen,
  priority = false,
  className = "",
}: GalleryCellProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Ampliar: ${item.caption}`}
      className={`group relative cursor-pointer overflow-hidden ${className}`}
    >
      <img
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-charcoal/0 transition-colors duration-1000 group-hover:bg-charcoal/25"
      />
      <span className="eyebrow absolute bottom-4 left-4 translate-y-2 text-stone-bone opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
        {item.caption}
      </span>
    </button>
  );
}
