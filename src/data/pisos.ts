// ─── MODELO DE DATOS — Pisos y Revestimientos ────────────────────────────────
//
// Para agregar piezas: copia una entrada del array `piezas` y editá los campos.
// El slug se usa como URL: /pisos-revestimientos/{slug}
// Las imágenes se resuelven desde /public → rutas absolutas sin /public.
//
// Tipos:
//   Material  → agrupa el catálogo en secciones
//   Tono      → filtro de color
//   Pieza     → unidad del catálogo (un producto, con todas sus medidas)
//   Formato   → una medida de la pieza: tamaño + espesor + sus fotos

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
  /**
   * Medidas en las que viene la pieza. Si el mismo producto existe en varios
   * tamaños, va una sola pieza con varios formatos (no una pieza por medida).
   * El primero es el que se muestra por defecto en el catálogo.
   */
  formatos: Formato[];
  acabado?: string;
  sku?: string;
  descripcion?: string;
  /** Imagen de portada = primera foto del primer formato (1200 px). */
  imagen?: string;
  /** Versión 400 px de `imagen` — para grillas y muros. */
  thumb?: string;
  /** Fotos del material instalado en un espacio real (piso, revestimiento, etc.). */
  imagenesAplicadas?: string[];
}

/** Una medida concreta de una pieza: tamaño y espesor van siempre juntos. */
export interface Formato {
  /** Identificador en la URL: /pisos-revestimientos/{slug}?formato={id} */
  id: string;
  tamaño: string;
  espesor: string;
  /**
   * URL vieja de cuando esta medida era una ficha aparte. Ya está indexada en
   * Google, así que la ruta la redirige (301) a la ficha agrupada.
   */
  slugAnterior?: string;
  /** Imagen principal del formato, versión grande (1200 px). */
  imagen?: string;
  /** Versión 400 px de `imagen`. */
  thumb?: string;
  /** Galería completa en 1200 px. La primera entrada es siempre `imagen`. */
  miniaturas?: string[];
  /** La misma galería en 400 px, alineada índice a índice con `miniaturas`. */
  thumbs?: string[];
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

// Arma un formato a partir de su medida y la carpeta de fotos. El `id` sale del
// final de la carpeta ("...-120x270" → "120x270", "...-7-5x7-5" → "7-5x7-5").
function formato(
  tamaño: string,
  espesor: string,
  carpeta: string,
  cantidad: number,
  slugAnterior?: string,
): Formato {
  const id = carpeta.match(/\d+(?:-\d+)?x\d+(?:-\d+)?$/)?.[0] ?? carpeta;
  return {
    id,
    tamaño,
    espesor,
    ...(slugAnterior ? { slugAnterior } : {}),
    ...galeria(carpeta, cantidad),
  };
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

// Logos de las marcas: WebP con fondo transparente (tinta negra), recortados
// al borde. `ancho`/`alto` son los px reales del archivo, para reservar espacio.
export const LOGOS_MARCA: Record<string, { src: string; ancho: number; alto: number }> = {
  Eliane: { src: "/imagenes/marcas/eliane.webp", ancho: 800, alto: 214 },
  Decortiles: { src: "/imagenes/marcas/decortiles.webp", ancho: 800, alto: 117 },
};

// Los productos que vienen en varias medidas van en UNA sola entrada con varios
// `formatos`. Cuando una medida antes tenía ficha propia, se pasa su slug viejo
// como último argumento de `formato()` para que la URL vieja redirija acá.
const catalogo: Pieza[] = [
  // ── PORCELANATOS ELIANE ──────────────────────────────────────────────────
  // Datos pasados por el cliente (nombre, medida, espesor, colección) + fotos
  // del proveedor ya optimizadas. Falta ficha técnica y tono confirmado.
  // "tono" se deja "Sin especificar" a propósito: no hay dato de color real.
  {
    slug: "palatino-cross-marfim-ac-3d",
    nombre: "Palatino Cross Marfim AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Palatino",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/palatino-cross-marfim-ac-3d.webp"],
    formatos: [
      formato("120 × 120 cm", "8,5 mm", "eliane/palatino-cross-marfim-ac-3d-120x120", 13,
        "palatino-cross-marfim-ac-3d-120x120"),
      formato("120 × 270 cm", "7 mm", "eliane/palatino-cross-marfim-ac-3d-120x270", 6,
        "palatino-cross-marfim-ac-3d-120x270"),
    ],
  },
  {
    slug: "palatino-vein-corda-ac-3d",
    nombre: "Palatino Vein Corda AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Palatino",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/palatino-vein-corda-ac-3d.webp"],
    formatos: [formato("120 × 120 cm", "8,5 mm", "eliane/palatino-vein-corda-ac-3d-120x120", 14)],
  },
  {
    slug: "palatino-vein-marfim-ac-3d",
    nombre: "Palatino Vein Marfim AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Palatino",
    formatos: [
      formato("120 × 270 cm", "7 mm", "eliane/palatino-vein-marfim-ac-3d-120x270", 6,
        "palatino-vein-marfim-ac-3d-120x270"),
      formato("160 × 160 cm", "7 mm", "eliane/palatino-vein-marfim-ac-3d-160x160", 6,
        "palatino-vein-marfim-ac-3d-160x160"),
    ],
  },
  {
    slug: "oris-brut-ac-3d",
    nombre: "Oris Brut AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Oris",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/oris-brut-ac-3d.webp"],
    formatos: [
      formato("120 × 120 cm", "8,5 mm", "eliane/oris-brut-ac-3d-120x120", 10,
        "oris-brut-ac-3d-120x120"),
      formato("120 × 270 cm", "7 mm", "eliane/oris-brut-ac-3d-120x270", 6,
        "oris-brut-ac-3d-120x270"),
      formato("160 × 160 cm", "7 mm", "eliane/oris-brut-ac-3d-160x160", 6,
        "oris-brut-ac-3d-160x160"),
    ],
  },
  {
    slug: "oris-brut-ext-3d",
    nombre: "Oris Brut EXT 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Oris",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/oris-brut-ext-3d.webp"],
    formatos: [formato("120 × 120 cm", "8,5 mm", "eliane/oris-brut-ext-3d-120x120", 10)],
  },
  {
    slug: "oris-gris-ac-3d",
    nombre: "Oris Gris AC 3D",
    tipo: "PORCELANATO",
    tono: "Gris",
    marca: "Eliane",
    coleccion: "Oris",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/oris-gris-ac-3d.webp"],
    formatos: [
      formato("120 × 120 cm", "8,5 mm", "eliane/oris-gris-ac-3d-120x120", 10,
        "oris-gris-ac-3d-120x120"),
      formato("120 × 270 cm", "7 mm", "eliane/oris-gris-ac-3d-120x270", 6,
        "oris-gris-ac-3d-120x270"),
      formato("160 × 160 cm", "7 mm", "eliane/oris-gris-ac-3d-160x160", 6,
        "oris-gris-ac-3d-160x160"),
    ],
  },
  {
    slug: "aura-corda-ac-3d",
    nombre: "Aura Corda AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Aura",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/aura-corda-ac-3d.webp"],
    formatos: [
      formato("120 × 120 cm", "8,5 mm", "eliane/aura-corda-ac-3d-120x120", 10,
        "aura-corda-ac-3d-120x120"),
      formato("160 × 160 cm", "7 mm", "eliane/aura-corda-ac-3d-160x160", 6,
        "aura-corda-ac-3d-160x160"),
    ],
  },
  {
    slug: "mahal-cristal-po",
    nombre: "Mahal Cristal PO",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Mahal",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/mahal-cristal-po.webp"],
    formatos: [formato("120 × 120 cm", "8,5 mm", "eliane/mahal-cristal-po-120x120", 10)],
  },
  {
    slug: "mahal-cristal-ac",
    nombre: "Mahal Cristal AC",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Mahal",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/mahal-cristal-ac.webp"],
    formatos: [formato("120 × 120 cm", "8,5 mm", "eliane/mahal-cristal-ac-120x120", 10)],
  },
  {
    slug: "mos-palatino-vein-marfim-ac",
    nombre: "Mos Palatino Vein Marfim AC",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Palatino",
    formatos: [formato("30 × 30 cm", "8,5 mm", "eliane/mos-palatino-vein-marfim-ac-30x30", 3)],
  },
  {
    slug: "oris-petra-brut-ext",
    nombre: "Oris Petra Brut EXT",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Oris",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/oris-petra-brut-ext.webp"],
    formatos: [formato("20 × 20 cm", "7,4 mm", "eliane/oris-petra-brut-ext-20x20", 52)],
  },
  {
    slug: "flow-carbono-mesh-sim-br",
    nombre: "Flow Carbono Mesh Sim BR",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Flow",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/flow-carbono-flow-corda.webp"],
    formatos: [formato("7,5 × 7,5 cm", "6 mm", "eliane/flow-carbono-mesh-sim-br-7-5x7-5", 8)],
  },
  {
    slug: "flow-gris-mesh-sim-br",
    nombre: "Flow Gris Mesh Sim BR",
    tipo: "PORCELANATO",
    tono: "Gris",
    marca: "Eliane",
    coleccion: "Flow",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/flow-gris-mesh-sim-br.webp"],
    formatos: [formato("7,5 × 7,5 cm", "6 mm", "eliane/flow-gris-mesh-sim-br-7-5x7-5", 8)],
  },
  {
    slug: "flow-corda-mesh-sim-br",
    nombre: "Flow Corda Mesh Sim BR",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Eliane",
    coleccion: "Flow",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/flow-carbono-flow-corda.webp"],
    formatos: [formato("7,5 × 7,5 cm", "6 mm", "eliane/flow-corda-mesh-sim-br-7-5x7-5", 8)],
  },

  // ── PORCELANATOS DECORTILES ──────────────────────────────────────────
  // Mismo criterio que Eliane: nombre, medida, espesor, colección y fotos.
  // Sin tono confirmado todavía.
  {
    slug: "sena-bamboo-gesso-ac",
    nombre: "Sena Bamboo Gesso AC",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Decortiles",
    coleccion: "Marmol",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/sena-bamboo-gesso-ac.webp"],
    formatos: [formato("120 × 280 cm", "6 mm", "decortiles/sena-bamboo-gesso-ac-120x280", 4)],
  },
  {
    slug: "orbi-trufa-ma",
    nombre: "Orbi Trufa MA",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Decortiles",
    coleccion: "Marmol",
    imagenesAplicadas: [
      "/imagenes/productos/material-colocado/orbi-trufa-ma.webp",
      "/imagenes/productos/material-colocado/orbi-trufa-ma-2.webp",
    ],
    formatos: [formato("120 × 280 cm", "6 mm", "decortiles/orbi-trufa-ma-120x280", 3)],
  },
  {
    slug: "flotan-osso-ac-3d",
    nombre: "Flotan Osso AC 3D",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Decortiles",
    coleccion: "Piedra",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/flotan-osso-ac-3d.webp"],
    formatos: [formato("160 × 160 cm", "7 mm", "decortiles/flotan-osso-ac-3d-160x160", 8)],
  },
  {
    slug: "aria-gelo-ac-3d",
    nombre: "Aria Gelo AC 3d",
    tipo: "PORCELANATO",
    tono: "Sin especificar",
    marca: "Decortiles",
    coleccion: "Ceppo",
    imagenesAplicadas: ["/imagenes/productos/material-colocado/aria-gelo-ac-3d.webp"],
    formatos: [formato("120 × 120 cm", "8,5 mm", "decortiles/aria-gelo-ac-3d-120x120", 14)],
  },
];

// La portada de cada pieza es la primera foto de su primer formato.
export const piezas: Pieza[] = catalogo.map((p) => {
  const imagen = p.imagen ?? p.formatos[0]?.imagen;
  const thumb = p.thumb ?? p.formatos[0]?.thumb;
  return { ...p, ...(imagen ? { imagen } : {}), ...(thumb ? { thumb } : {}) };
});

/** Busca la pieza agrupada que contiene un formato con este slug viejo. */
export function buscarPorSlugAnterior(slug: string) {
  for (const pieza of piezas) {
    const f = pieza.formatos.find((f) => f.slugAnterior === slug);
    if (f) return { pieza, formato: f };
  }
  return undefined;
}
