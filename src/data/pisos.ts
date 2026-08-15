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
  | "Azul";

export interface Pieza {
  slug: string;
  nombre: string;
  tipo: Material;
  tono: Tono;
  origen: string;
  tamaño: string;
  espesor: string;
  acabado: string;
  sku: string;
  descripcion: string;
  imagen: string;
  miniaturas: string[];
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
];

export const piezas: Pieza[] = [
  // ── MÁRMOLES (3) ──────────────────────────────────────────────────────────
  {
    slug: "calacatta",
    nombre: "Calacatta",
    tipo: "MÁRMOL",
    tono: "Dorado",
    origen: "Italia",
    tamaño: "120 × 60 cm",
    espesor: "20 mm",
    acabado: "Pulido",
    sku: "VT-MAR-001",
    descripcion:
      "Calacatta es el mármol por excelencia: fondo blanco cegador atravesado por vetas doradas de gran expresividad. Extraído de las canteras de Carrara, es la elección de los proyectos que no admiten ningún compromiso estético.",
    imagen: "/images/pisos/calacatta.png",
    miniaturas: [
      "/images/pisos/calacatta.png",
      "/images/pisos/verde-xingu.png",
      "/images/pisos/clasico.png",
    ],
  },
  {
    slug: "statuario-venato",
    nombre: "Statuario Venato",
    tipo: "MÁRMOL",
    tono: "Blanco",
    origen: "Italia",
    tamaño: "180 × 90 cm",
    espesor: "20 mm",
    acabado: "Apomazado",
    sku: "VT-MAR-002",
    descripcion:
      "El Statuario Venato exhibe las vetas más largas y dramáticas de todas las variedades de mármol blanco de Carrara. Su acabado apomazado suaviza el brillo sin perder profundidad: la opción preferida de los interioristas de vanguardia.",
    imagen: "/images/pisos/calacatta.png",
    miniaturas: [
      "/images/pisos/calacatta.png",
      "/images/pisos/negro-marquina.png",
      "/images/pisos/azul-imperial.png",
    ],
  },
  {
    slug: "nero-desir",
    nombre: "Nero Désir",
    tipo: "MÁRMOL",
    tono: "Negro",
    origen: "Francia",
    tamaño: "60 × 60 cm",
    espesor: "20 mm",
    acabado: "Pulido",
    sku: "VT-MAR-003",
    descripcion:
      "Nero Désir es un mármol negro de grano muy fino con sutiles reflejos azulados que solo el pulido espejo revela. Originario de las canteras de los Pirineos franceses, es el contrapunto dramático perfecto a las superficies neutras.",
    imagen: "/images/pisos/negro-marquina.png",
    miniaturas: [
      "/images/pisos/negro-marquina.png",
      "/images/pisos/calacatta.png",
      "/images/pisos/azul-imperial.png",
    ],
  },

  // ── GRANITOS (3) ───────────────────────────────────────────────────────────
  {
    slug: "negro-marquina-granito",
    nombre: "Negro Marquina",
    tipo: "GRANITO",
    tono: "Negro",
    origen: "España",
    tamaño: "60 × 60 cm",
    espesor: "20 mm",
    acabado: "Pulido",
    sku: "VT-GRA-001",
    descripcion:
      "El Negro Marquina en granito ofrece un negro de grano fino con reflejos minerales que el pulido intensifica. Su uniformidad y dureza excepcional lo convierten en referencia para pisos y revestimientos de uso intenso.",
    imagen: "/images/pisos/negro-marquina.png",
    miniaturas: [
      "/images/pisos/negro-marquina.png",
      "/images/pisos/verde-xingu.png",
      "/images/pisos/clasico.png",
    ],
  },
  {
    slug: "verde-ubatuba",
    nombre: "Verde Ubatuba",
    tipo: "GRANITO",
    tono: "Verde",
    origen: "Brasil",
    tamaño: "60 × 60 cm",
    espesor: "30 mm",
    acabado: "Flameado",
    sku: "VT-GRA-002",
    descripcion:
      "Verde Ubatuba es un granito brasileño de fondo verde oscuro con cristales dorados y negros que centellean con la luz. Su acabado flameado, antideslizante y rugoso, lo hace ideal para pisos exteriores y zonas húmedas de alta exigencia.",
    imagen: "/images/pisos/verde-xingu.png",
    miniaturas: [
      "/images/pisos/verde-xingu.png",
      "/images/pisos/negro-marquina.png",
      "/images/pisos/azul-imperial.png",
    ],
  },
  {
    slug: "azul-bahia",
    nombre: "Azul Bahia",
    tipo: "GRANITO",
    tono: "Azul",
    origen: "Brasil",
    tamaño: "60 × 60 cm",
    espesor: "20 mm",
    acabado: "Pulido",
    sku: "VT-GRA-003",
    descripcion:
      "Azul Bahia es uno de los granitos más raros y cotizados del mundo. Su color azul lapislázuli con inclusiones blancas y doradas lo convierte en el gesto absoluto de un espacio. Disponible en stock limitado; cada placa es negociada directamente con la cantera.",
    imagen: "/images/pisos/azul-imperial.png",
    miniaturas: [
      "/images/pisos/azul-imperial.png",
      "/images/pisos/negro-marquina.png",
      "/images/pisos/verde-xingu.png",
    ],
  },

  // ── CUARCITAS (3) ──────────────────────────────────────────────────────────
  {
    slug: "verde-xingu",
    nombre: "Verde Xingu",
    tipo: "CUARCITA",
    tono: "Verde",
    origen: "Brasil",
    tamaño: "120 × 60 cm",
    espesor: "20 mm",
    acabado: "Apomazado",
    sku: "VT-CUA-001",
    descripcion:
      "Verde Xingu es una cuarcita brasileña de color verde profundo con venación plateada. Su aspecto exótico y su dureza extrema la hacen ideal para superficies de alto impacto visual. Cada placa es única: la veta nunca se repite.",
    imagen: "/images/pisos/verde-xingu.png",
    miniaturas: [
      "/images/pisos/verde-xingu.png",
      "/images/pisos/azul-imperial.png",
      "/images/pisos/calacatta.png",
    ],
  },
  {
    slug: "azul-imperial",
    nombre: "Azul Imperial",
    tipo: "CUARCITA",
    tono: "Azul",
    origen: "Brasil",
    tamaño: "120 × 60 cm",
    espesor: "20 mm",
    acabado: "Apomazado",
    sku: "VT-CUA-002",
    descripcion:
      "Azul Imperial es una cuarcita de Brasil de tonalidad azul profunda con venas grises y plateadas. Su rareza geológica la convierte en la elección más audaz del catálogo: ideal para el gesto principal de un espacio que quiere ser único en el mundo.",
    imagen: "/images/pisos/azul-imperial.png",
    miniaturas: [
      "/images/pisos/azul-imperial.png",
      "/images/pisos/verde-xingu.png",
      "/images/pisos/negro-marquina.png",
    ],
  },
  {
    slug: "pandora-white",
    nombre: "Pandora White",
    tipo: "CUARCITA",
    tono: "Blanco",
    origen: "Brasil",
    tamaño: "150 × 60 cm",
    espesor: "20 mm",
    acabado: "Apomazado",
    sku: "VT-CUA-003",
    descripcion:
      "Pandora White es una cuarcita blanca con venas grises y doradas de gran finura. Su estructura mineral extremadamente densa la hace prácticamente impermeable: la alternativa técnicamente superior al mármol blanco para zonas de uso intenso.",
    imagen: "/images/pisos/calacatta.png",
    miniaturas: [
      "/images/pisos/calacatta.png",
      "/images/pisos/verde-xingu.png",
      "/images/pisos/clasico.png",
    ],
  },

  // ── TRAVERTINOS (3) ────────────────────────────────────────────────────────
  {
    slug: "travertino-clasico",
    nombre: "Clásico",
    tipo: "TRAVERTINO",
    tono: "Beige",
    origen: "Italia",
    tamaño: "60 × 40 cm",
    espesor: "20 mm",
    acabado: "Irregular",
    sku: "VT-TRA-001",
    descripcion:
      "Travertino Clásico es la piedra de la Roma eterna: poros naturales abiertos, tonos cálidos de crema y beige, y una textura que el tiempo sólo mejora. El acabado irregular conserva la rugosidad original de la cantera italiana.",
    imagen: "/images/pisos/clasico.png",
    miniaturas: [
      "/images/pisos/clasico.png",
      "/images/pisos/calacatta.png",
      "/images/pisos/verde-xingu.png",
    ],
  },
  {
    slug: "travertino-noce",
    nombre: "Noce",
    tipo: "TRAVERTINO",
    tono: "Beige",
    origen: "Turquía",
    tamaño: "60 × 40 cm",
    espesor: "20 mm",
    acabado: "Rústico",
    sku: "VT-TRA-002",
    descripcion:
      "El Travertino Noce es la variedad más oscura y cálida de la familia: tonos nuez y tabaco que crean una atmósfera íntima y envolvente. Su acabado rústico deja los poros abiertos para un resultado auténtico y táctil.",
    imagen: "/images/pisos/clasico.png",
    miniaturas: [
      "/images/pisos/clasico.png",
      "/images/pisos/negro-marquina.png",
      "/images/pisos/calacatta.png",
    ],
  },
  {
    slug: "travertino-silver",
    nombre: "Silver",
    tipo: "TRAVERTINO",
    tono: "Gris",
    origen: "Turquía",
    tamaño: "120 × 60 cm",
    espesor: "20 mm",
    acabado: "Apomazado",
    sku: "VT-TRA-003",
    descripcion:
      "El Travertino Silver es una variedad gris-plata de canteras turcas seleccionadas. Su paleta fría y su acabado apomazado crean una estética contemporánea y serena, perfecta junto al hormigón visto, el acero y las maderas claras.",
    imagen: "/images/pisos/azul-imperial.png",
    miniaturas: [
      "/images/pisos/azul-imperial.png",
      "/images/pisos/clasico.png",
      "/images/pisos/negro-marquina.png",
    ],
  },

  // ── PORCELANATOS (3) ───────────────────────────────────────────────────────
  {
    slug: "lux-white",
    nombre: "Lux White",
    tipo: "PORCELANATO",
    tono: "Blanco",
    origen: "España",
    tamaño: "120 × 120 cm",
    espesor: "8 mm",
    acabado: "Pulido",
    sku: "VT-POR-001",
    descripcion:
      "Lux White es un porcelanato de gran formato en blanco puro con microvetas que evocan el mármol. Su espesor reducido lo hace ideal para proyectos donde el peso importa. Resistencia máxima a manchas, rayados y agentes químicos.",
    imagen: "/images/pisos/calacatta.png",
    miniaturas: [
      "/images/pisos/calacatta.png",
      "/images/pisos/clasico.png",
      "/images/pisos/negro-marquina.png",
    ],
  },
  {
    slug: "slate-nero",
    nombre: "Slate Nero",
    tipo: "PORCELANATO",
    tono: "Negro",
    origen: "Italia",
    tamaño: "120 × 60 cm",
    espesor: "10 mm",
    acabado: "Mate natural",
    sku: "VT-POR-002",
    descripcion:
      "Slate Nero es un porcelanato negro de textura pizarra con acabado mate natural y antideslizante. Su estética industrial refinada lo hace perfecto para pisos de alta circulación, cocinas abiertas y exteriores contemporáneos.",
    imagen: "/images/pisos/negro-marquina.png",
    miniaturas: [
      "/images/pisos/negro-marquina.png",
      "/images/pisos/azul-imperial.png",
      "/images/pisos/calacatta.png",
    ],
  },
  {
    slug: "cemento-natural",
    nombre: "Cemento Natural",
    tipo: "PORCELANATO",
    tono: "Gris",
    origen: "España",
    tamaño: "90 × 90 cm",
    espesor: "10 mm",
    acabado: "Mate satinado",
    sku: "VT-POR-003",
    descripcion:
      "Cemento Natural reproduce la estética del hormigón pulido con la precisión y la consistencia del porcelanato. Sus tonos grises neutros y su acabado satinado lo convierten en el fondo ideal para cualquier proyecto contemporáneo de alta gama.",
    imagen: "/images/pisos/clasico.png",
    miniaturas: [
      "/images/pisos/clasico.png",
      "/images/pisos/negro-marquina.png",
      "/images/pisos/azul-imperial.png",
    ],
  },
];
