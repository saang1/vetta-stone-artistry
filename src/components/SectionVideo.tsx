import { useEffect, useRef } from "react";

interface Props {
  /**
   * Nombre base del archivo, sin extensión ni carpeta.
   * Ej: "oficio" busca /public/videos/oficio.mp4 y, como respaldo, oficio.mov
   */
  name: string;
  /** Imagen que se ve mientras carga y si el navegador no puede reproducir el video */
  poster: string;
  /** Texto descriptivo para lectores de pantalla */
  label: string;
  /** Clases del <video> — normalmente para el object-cover / posición */
  className?: string;
}

/**
 * Video de fondo para secciones (El oficio, Proceso, Showroom).
 *
 * Reproduce en loop, sin sonido. Prioriza .mp4 (reproduce en todos los
 * navegadores) y cae a .mov si es lo único disponible (solo Safari lo decodifica;
 * en el resto queda el poster). Se pausa cuando la sección sale de pantalla y
 * respeta prefers-reduced-motion.
 *
 * Para subir un video: dejá el archivo en /public/videos/<name>.mp4
 * (idealmente) o <name>.mov.
 */
export function SectionVideo({ name, poster, label, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    // Pausar cuando la sección no está a la vista para no gastar recursos.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(video);

    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className={className}
    >
      <source src={`/videos/${name}.mp4`} type="video/mp4" />
      <source src={`/videos/${name}.mov`} type="video/quicktime" />
    </video>
  );
}
