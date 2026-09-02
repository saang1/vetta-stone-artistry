import { Link } from "@tanstack/react-router";
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
  const img = item.video ? (
    <video
      src={item.src}
      muted
      autoPlay
      loop
      playsInline
      preload={priority ? "auto" : "metadata"}
      aria-label={item.alt}
      className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
    />
  ) : (
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
  );

  // Pieza en stock y a la venta — lleva a su ficha de producto en vez de abrir el lightbox.
  if (item.producto) {
    return (
      <Link
        to="/banos/$producto"
        params={{ producto: item.producto.slug }}
        aria-label={`Ver disponibilidad: ${item.caption}`}
        className={`group relative cursor-pointer overflow-hidden ${className}`}
      >
        {img}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-charcoal/0 transition-colors duration-1000 group-hover:bg-charcoal/50"
        />
        <span className="absolute inset-0 flex translate-y-2 flex-col items-center justify-center gap-1 text-center opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="eyebrow text-stone-bone">Disponible</span>
          <span className="text-xs font-light text-stone-bone/80">{item.caption}</span>
        </span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Ampliar: ${item.caption}`}
      className={`group relative cursor-pointer overflow-hidden ${className}`}
    >
      {img}
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
