import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  alt: string;
}

export function AplicadaCarousel({ images, alt }: Props) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="eyebrow text-charcoal/30">Foto de aplicación próxima</span>
      </div>
    );
  }

  if (images.length === 1) {
    return <img src={images[0]} alt={alt} loading="lazy" className="h-full w-full object-cover" />;
  }

  const goTo = (i: number) => setActive((i + images.length) % images.length);

  return (
    <div className="group/carousel relative h-full w-full">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === active ? alt : ""}
          aria-hidden={i !== active}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
      ))}

      <button
        type="button"
        onClick={() => goTo(active - 1)}
        aria-label="Foto anterior"
        className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-background/80 text-charcoal opacity-0 transition-opacity duration-300 group-hover/carousel:opacity-100 hover:bg-background"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        aria-label="Foto siguiente"
        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-background/80 text-charcoal opacity-0 transition-opacity duration-300 group-hover/carousel:opacity-100 hover:bg-background"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ver foto ${i + 1}`}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-4 bg-background" : "bg-background/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
