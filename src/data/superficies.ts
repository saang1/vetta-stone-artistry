export type Superficie = { nombre: string; src: string; slug?: string };

export const naturales: Superficie[] = [
  { nombre: "Cuarcitas exóticas", src: "/images/sup-cuarcitas.jpg" },
  { nombre: "Mármoles", src: "/images/sup-marmoles.jpg" },
  { nombre: "Granitos", src: "/images/sup-granitos.jpg" },
  { nombre: "Travertinos", src: "/images/sup-travertinos.jpg" },
];

// Cada marca con slug lleva a su propio catálogo en /superficies/$marca.
export const ingenieria: Superficie[] = [
  {
    nombre: "Neolith",
    src: "/images/cocinas/Neolith/Calacatta_Luxe_PC4L1DU061_F1.jpg",
    slug: "neolith",
  },
  {
    nombre: "Purastone Prima",
    src: "/images/cocinas/Purastone Prima/Alpinus_White_PC4PAWM121_T2.webp",
    slug: "purastone-prima",
  },
  {
    nombre: "Purastone",
    src: "/images/cocinas/Purastone/Arabescato_Cervaiole_PC3P35P12J_T1.webp",
    slug: "purastone",
  },
];
