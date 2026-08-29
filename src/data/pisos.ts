// ─── MODELO DE DATOS — Pisos y Revestimientos ────────────────────────────────
//
// Para agregar piezas: copia una entrada del array `piezas` y editá los campos.
// El slug se usa como URL: /pisos-revestimientos/{slug}
// Las imágenes se resuelven desde /public → rutas absolutas sin /public.
//
// Tipos:
//   Material  → agrupa el catálogo en secciones
//   Tono      → filtro de color
//   Pieza     → unidad del catálogo (un stone, un formato, un acabado)

export type Material =
  | "MÁRMOL"
  | "GRANITO"
  | "CUARCITA"
  | "TRAVERTINO"
  | "PORCELANATO";

export type Tono =
  | "Blanco"
  | "Gris"
  | "Beige"
  | "Negro"
  | "Verde"
  | "Dorado"
  | "Azul"
  | "Sin especificar";

export interface Pieza {
  slug: string;
  nombre: string;
  tipo: Material;
  tono: Tono;
  /** Marca del fabricante (ej. "Eliane"). Opcional: las piezas genéricas no la tienen. */
  marca?: string;
  /** Línea/colección dentro de la marca (ej. "Palatino", "Oris"). */
  coleccion?: string;
  origen?: string;
  tamaño: string;
  espesor: string;
  acabado?: string;
  sku?: string;
  descripcion?: string;
  /** Imagen principal, versión grande (1200 px). */
  imagen?: string;
  /** Versión 400 px de `imagen` — para grillas y muros. */
  thumb?: string;
  /** Galería completa en 1200 px. La primera entrada es siempre `imagen`. */
  miniaturas?: string[];
  /** La misma galería en 400 px, alineada índice a índice con `miniaturas`. */
  thumbs?: string[];
  /** Foto del material instalado en un espacio real (piso, revestimiento, etc.). */
  imagenAplicada?: string;
}

// ─── GALERÍAS ────────────────────────────────────────────────────────────────
//
// Las fotos de producto las genera `scripts/optimize-images.js` en
// public/imagenes/productos/{marca}/{producto}/, con el nombre de la carpeta +
// número correlativo, y una copia de 400 px en thumbs/.
//
//   /imagenes/productos/eliane/oris-brut-ac-3d-120x120/oris-brut-ac-3d-120x120-01.webp
//   /imagenes/productos/eliane/oris-brut-ac-3d-120x120/thumbs/oris-brut-ac-3d-120x120-01.webp
//
// `galeria()` arma esas rutas a partir de la carpeta y la cantidad de fotos,
// así que no hace falta escribir 246 rutas a mano. Si volvés a correr el script
// con más fotos, actualizá el número y listo.
function galeria(carpeta: string, cantidad: number) {
  const producto = carpeta.split("/").pop()!;
  const base = `/imagenes/productos/${carpeta}`;
  const nombres = Array.from(
    { length: cantidad },
    (_, i) => `${producto}-${String(i + 1).padStart(2, "0")}.webp`,
  );
  const miniaturas = nombres.map((n) => `${base}/${n}`);
  const thumbs = nombres.map((n) => `${base}/thumbs/${n}`);
  // `cantidad` siempre es >= 1, así que la primera entrada existe.
  return { imagen: miniaturas[0]!, thumb: thumbs[0]!, miniaturas, thumbs };
}

export const MATERIALES: Material[] = [
  "MÁRMOL",
  "GRANITO",
  "CUARCITA",
  "TRAVERTINO",
  "PORCELANATO",
];

export const TONOS: Tono[] = [
  "Blanco",
  "Gris",
  "Beige",
  "Azul",
  "Negro",
  "Verde",
  "Dorado",
  "Sin especificar",
];

// Orden de despliegue de las marcas en el catálogo (separación por marca).
export const MARCAS = ["Eliane", "Decortiles"];

export const piezas: Pieza[] = [
  // ── PORCELANATOS ELIANE (21) ─────────────────────────────────────────────
  // Datos pasados por el cliente (nombre, medida, espesor, colección) + fotos
  // del proveedor ya optimizadas. Falta ficha técnica y tono confirmado.
  // "tono" se deja "Sin especificar" a propósito: no hay dato de color real.
  {
    slug: "palatino-cross-marfim-ac-3d-120x120",
    nombre: "Palatino Cross Marfim AC 3d",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Palatino",
    tamaño: "120 × 120 cm",
    espesor: "8,5 mm",
    ...galeria("eliane/palatino-cross-marfim-ac-3d-120x120", 13),
  },
  {
    slug: "palatino-vein-corda-ac-3d",
    nombre: "Palatino Vein Corda AC 3d",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Palatino",
    tamaño: "120 × 120 cm",
    espesor: "8,5 mm",
    ...galeria("eliane/palatino-vein-corda-ac-3d-120x120", 14),
  },
  {
    slug: "palatino-cross-marfim-ac-3d-120x270",
    nombre: "Palatino Cross Marfim AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Palatino",
    tamaño: "120 × 270 cm",
    espesor: "7 mm",
    ...galeria("eliane/palatino-cross-marfim-ac-3d-120x270", 6),
  },
  {
    slug: "palatino-vein-marfim-ac-3d-120x270",
    nombre: "Palatino Vein Marfim AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Palatino",
    tamaño: "120 × 270 cm",
    espesor: "7 mm",
    ...galeria("eliane/palatino-vein-marfim-ac-3d-120x270", 6),
  },
  {
    slug: "palatino-vein-marfim-ac-3d-160x160",
    nombre: "Palatino Vein Marfim AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Palatino",
    tamaño: "160 × 160 cm",
    espesor: "7 mm",
    ...galeria("eliane/palatino-vein-marfim-ac-3d-160x160", 6),
  },
  {
    slug: "oris-brut-ac-3d-120x270",
    nombre: "Oris Brut AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Oris",
    tamaño: "120 × 270 cm",
    espesor: "7 mm",
    ...galeria("eliane/oris-brut-ac-3d-120x270", 6),
  },
  {
    slug: "oris-brut-ac-3d-160x160",
    nombre: "Oris Brut AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Oris",
    tamaño: "160 × 160 cm",
    espesor: "7 mm",
    ...galeria("eliane/oris-brut-ac-3d-160x160", 6),
  },
  {
    slug: "oris-brut-ac-3d-120x120",
    nombre: "Oris Brut AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Oris",
    tamaño: "120 × 120 cm",
    espesor: "8,5 mm",
    ...galeria("eliane/oris-brut-ac-3d-120x120", 10),
  },
  {
    slug: "oris-brut-ext-3d",
    nombre: "Oris Brut EXT 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Oris",
    tamaño: "120 × 120 cm",
    espesor: "8,5 mm",
    ...galeria("eliane/oris-brut-ext-3d-120x120", 10),
  },
  {
    slug: "oris-gris-ac-3d-120x270",
    nombre: "Oris Gris AC 3D",
    tipo: "PORCELANATO",
    tono: "Gris",
    marca: "Eliane",
    coleccion: "Oris",
    tamaño: "120 × 270 cm",
    espesor: "7 mm",
    ...galeria("eliane/oris-gris-ac-3d-120x270", 6),
  },
  {
    slug: "oris-gris-ac-3d-160x160",
    nombre: "Oris Gris AC 3D",
    tipo: "PORCELANATO",
    tono: "Gris",
    marca: "Eliane",
    coleccion: "Oris",
    tamaño: "160 × 160 cm",
    espesor: "7 mm",
    ...galeria("eliane/oris-gris-ac-3d-160x160", 6),
  },
  {
    slug: "oris-gris-ac-3d-120x120",
    nombre: "Oris Gris AC 3D",
    tipo: "PORCELANATO",
    tono: "Gris",
    marca: "Eliane",
    coleccion: "Oris",
    tamaño: "120 × 120 cm",
    espesor: "8,5 mm",
    ...galeria("eliane/oris-gris-ac-3d-120x120", 10),
  },
  {
    slug: "aura-corda-ac-3d-160x160",
    nombre: "Aura Corda AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Aura",
    tamaño: "160 × 160 cm",
    espesor: "7 mm",
    ...galeria("eliane/aura-corda-ac-3d-160x160", 6),
  },
  {
    slug: "aura-corda-ac-3d-120x120",
    nombre: "Aura Corda AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Aura",
    tamaño: "120 × 120 cm",
    espesor: "8,5 mm",
    ...galeria("eliane/aura-corda-ac-3d-120x120", 10),
  },
  {
    slug: "mahal-cristal-po",
    nombre: "Mahal Cristal PO",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Mahal",
    tamaño: "120 × 120 cm",
    espesor: "8,5 mm",
    ...galeria("eliane/mahal-cristal-po-120x120", 10),
  },
  {
    slug: "mahal-cristal-ac",
    nombre: "Mahal Cristal AC",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Mahal",
    tamaño: "120 × 120 cm",
    espesor: "8,5 mm",
    ...galeria("eliane/mahal-cristal-ac-120x120", 10),
  },
  {
    slug: "mos-palatino-vein-marfim-ac",
    nombre: "Mos Palatino Vein Marfim AC",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Palatino",
    tamaño: "30 × 30 cm",
    espesor: "8,5 mm",
    ...galeria("eliane/mos-palatino-vein-marfim-ac-30x30", 3),
  },
  {
    slug: "oris-petra-brut-ext",
    nombre: "Oris Petra Brut EXT",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Oris",
    tamaño: "20 × 20 cm",
    espesor: "7,4 mm",
    ...galeria("eliane/oris-petra-brut-ext-20x20", 52),
  },
  {
    slug: "flow-carbono-mesh-sim-br",
    nombre: "Flow Carbono Mesh Sim BR",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Flow",
    tamaño: "7,5 × 7,5 cm",
    espesor: "6 mm",
    ...galeria("eliane/flow-carbono-mesh-sim-br-7-5x7-5", 8),
  },
  {
    slug: "flow-gris-mesh-sim-br",
    nombre: "Flow Gris Mesh Sim BR",
    tipo: "PORCELANATO",
    tono: "Gris",
    marca: "Eliane",
    coleccion: "Flow",
    tamaño: "7,5 × 7,5 cm",
    espesor: "6 mm",
    ...galeria("eliane/flow-gris-mesh-sim-br-7-5x7-5", 8),
  },
  {
    slug: "flow-corda-mesh-sim-br",
    nombre: "Flow Corda Mesh Sim BR",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Flow",
    tamaño: "7,5 × 7,5 cm",
    espesor: "6 mm",
    ...galeria("eliane/flow-corda-mesh-sim-br-7-5x7-5", 8),
  },

  // ── PORCELANATOS DECORTILES (4) ──────────────────────────────────────────
  // Mismo criterio que Eliane: nombre, medida, espesor, colección y fotos.
  // Sin tono confirmado todavía.
  {
    slug: "sena-bamboo-gesso-ac",
    nombre: "Sena Bamboo Gesso AC",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Decortiles",
    coleccion: "Marmol",
    tamaño: "120 × 280 cm",
    espesor: "6 mm",
    ...galeria("decortiles/sena-bamboo-gesso-ac-120x280", 5),
  },
  {
    slug: "orbi-trufa-ma",
    nombre: "Orbi Trufa MA",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Decortiles",
    coleccion: "Marmol",
    tamaño: "120 × 280 cm",
    espesor: "6 mm",
    ...galeria("decortiles/orbi-trufa-ma-120x280", 5),
  },
  {
    slug: "flotan-osso-ac-3d",
    nombre: "Flotan Osso AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Decortiles",
    coleccion: "Piedra",
    tamaño: "160 × 160 cm",
    espesor: "7 mm",
    ...galeria("decortiles/flotan-osso-ac-3d-160x160", 8),
  },
  {
    slug: "aria-gelo-ac-3d",
    nombre: "Aria Gelo AC 3d",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Decortiles",
    coleccion: "Ceppo",
    tamaño: "120 × 120 cm",
    espesor: "8,5 mm",
    ...galeria("decortiles/aria-gelo-ac-3d-120x120", 14),
  },
];
