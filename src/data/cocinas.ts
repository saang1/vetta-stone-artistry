// Catálogo de superficies de ingeniería — generado a partir de public/images/cocinas.
// nombre: extraído del archivo (sin el código de producto). imagen: ruta pública.
export type SwatchPieza = {
  nombre: string;
  slug: string;
  imagen: string;
  /** Foto del material instalado en un espacio real (cocina, baño, etc.). */
  imagenAplicada?: string;
};

// Filtro de color derivado del nombre del producto. No hay ficha técnica todavía
// (terminación, espesor, aplicación, estilo, bookmatch), así que solo Color es
// funcional por ahora — el resto de las categorías de la referencia queda pendiente.
// Nombres sin ninguna palabra de color reconocible caen en "Efecto mármol".
const COLOR_KEYWORDS: [string, string[]][] = [
  ["Blanco", ["blanco", "white", "bianco", "alba", "nube", "artic", "ivory"]],
  ["Negro", ["negro", "black", "nero", "obsession", "noir"]],
  [
    "Gris",
    ["gris", "grey", "gray", "greyge", "fosil", "topo", "concrete", "cement", "cemento", "beton"],
  ],
  [
    "Beige",
    ["beige", "crema", "cream", "sand", "desert", "taj", "limestone", "travertino", "pisa"],
  ],
  ["Dorado", ["dorado", "gold", "oro", "bronze", "armani"]],
  ["Verde", ["verde", "green", "selva"]],
];

export function deriveColor(nombre: string): string {
  const lower = nombre.toLowerCase();
  for (const [label, keywords] of COLOR_KEYWORDS) {
    if (keywords.some((k) => lower.includes(k))) return label;
  }
  return "Efecto mármol";
}

export const NEOLITH: SwatchPieza[] = [
  {
    nombre: "Abu Dhabi White",
    slug: "abu-dhabi-white",
    imagen: "/images/cocinas/Neolith/Abu_Dhabi_White_PC4ABUK061_F1.jpg",
  },
  {
    nombre: "Artic White",
    slug: "artic-white",
    imagen: "/images/cocinas/Neolith/Artic_White_PC4AWHN061_F1.jpg",
  },
  {
    nombre: "Basalt Black",
    slug: "basalt-black",
    imagen: "/images/cocinas/Neolith/Basalt_Black_PC4BBLS061_F1.jpeg",
  },
  {
    nombre: "Basalt Grey",
    slug: "basalt-grey",
    imagen: "/images/cocinas/Neolith/Basalt_Grey_PC4BGRS031_F1.jpg",
  },
  { nombre: "Beton", slug: "beton", imagen: "/images/cocinas/Neolith/Beton_PC4BETK061_F1.jpg" },
  {
    nombre: "Black Obsession",
    slug: "black-obsession",
    imagen: "/images/cocinas/Neolith/Black_Obsession_PC4BLOK061_F6.png",
  },
  {
    nombre: "Calacatta C01",
    slug: "calacatta-c01",
    imagen: "/images/cocinas/Neolith/Calacatta_C01_PC4C1DK062_F1.jpg",
  },
  {
    nombre: "Calacatta C01r",
    slug: "calacatta-c01r",
    imagen: "/images/cocinas/Neolith/Calacatta_C01R_PC4C1RK121_F1.jpg",
  },
  {
    nombre: "Calacatta Luxe",
    slug: "calacatta-luxe",
    imagen: "/images/cocinas/Neolith/Calacatta_Luxe_PC4L1DU061_F1.jpg",
  },
  {
    nombre: "Calatorao",
    slug: "calatorao",
    imagen: "/images/cocinas/Neolith/Calatorao_PC4CALK061_F1.jpg",
  },
  { nombre: "Cement", slug: "cement", imagen: "/images/cocinas/Neolith/Cement_PC4CEMS061_F1.jpg" },
  {
    nombre: "Estatuario E01",
    slug: "estatuario-e01",
    imagen: "/images/cocinas/Neolith/Estatuario_E01_PC4E1DP061_F1.jpg",
  },
  {
    nombre: "Himalaya Cristal",
    slug: "himalaya-cristal",
    imagen: "/images/cocinas/Neolith/Himalaya_Cristal_PC4HIMU061_F1.jpg",
  },
  {
    nombre: "Iron Frost",
    slug: "iron-frost",
    imagen: "/images/cocinas/Neolith/Iron_Frost_PC4IFRS061_F1.jpg",
  },
  {
    nombre: "Iron Grey",
    slug: "iron-grey",
    imagen: "/images/cocinas/Neolith/Iron_Grey_PC4IGRS121_F1.jpg",
  },
  { nombre: "Krater", slug: "krater", imagen: "/images/cocinas/Neolith/Krater_PC4KRAR061_F1.jpg" },
  { nombre: "Layla", slug: "layla", imagen: "/images/cocinas/Neolith/Layla_PC4LAYE121_F1.jpg" },
  {
    nombre: "Mont Blanc",
    slug: "mont-blanc",
    imagen: "/images/cocinas/Neolith/Mont_Blanc_PC4MBLK061_F1.jpg",
  },
  { nombre: "Nero", slug: "nero", imagen: "/images/cocinas/Neolith/Nero_PC4NERS061_F1.jpeg" },
  {
    nombre: "New York New York",
    slug: "new-york-new-york",
    imagen: "/images/cocinas/Neolith/New_York_New_York_PC4NYNK061_F1.jpg",
  },
  { nombre: "Perla", slug: "perla", imagen: "/images/cocinas/Neolith/Perla_PC4PERS061_F1.jpg" },
  {
    nombre: "Pierre Bleue",
    slug: "pierre-bleue",
    imagen: "/images/cocinas/Neolith/Pierre_Bleue_PC4PBLK061_F1.jpg",
  },
  {
    nombre: "Pietra Di Luna",
    slug: "pietra-di-luna",
    imagen: "/images/cocinas/Neolith/Pietra_di_luna_PC4PDLK061_F1.jpg",
  },
  {
    nombre: "Pietra Di Piombo",
    slug: "pietra-di-piombo",
    imagen: "/images/cocinas/Neolith/Pietra_Di_Piombo_PC4PDPK061_F1.jpg",
  },
  {
    nombre: "Strata Argentum",
    slug: "strata-argentum",
    imagen: "/images/cocinas/Neolith/Strata_Argentum_PC4SARR061_F1.jpeg",
  },
];

export const PURASTONE_PRIMA: SwatchPieza[] = [
  {
    nombre: "Absolute Black",
    slug: "absolute-black",
    imagen: "/images/cocinas/Purastone Prima/Absolute_Black__PC4PPBM121_T2.webp",
  },
  {
    nombre: "Alpinus White",
    slug: "alpinus-white",
    imagen: "/images/cocinas/Purastone Prima/Alpinus_White_PC4PAWM121_T2.webp",
  },
  {
    nombre: "Arabescato Wow",
    slug: "arabescato-wow",
    imagen: "/images/cocinas/Purastone Prima/Arabescato_Wow__PC4PWOM121_T2.webp",
  },
  {
    nombre: "Aria",
    slug: "aria",
    imagen: "/images/cocinas/Purastone Prima/Aria_PC4PARM12A_T2.webp",
  },
  {
    nombre: "Aria 25",
    slug: "aria-25",
    imagen: "/images/cocinas/Purastone Prima/Aria_25_PC4PA2P12A_T2.webp",
  },
  {
    nombre: "Aurora",
    slug: "aurora",
    imagen: "/images/cocinas/Purastone Prima/Aurora_PC4PABP121_T2.webp",
  },
  {
    nombre: "Bianco Lasa",
    slug: "bianco-lasa",
    imagen: "/images/cocinas/Purastone Prima/Bianco-Lasa_PC4PBLM12A_T2.webp",
  },
  {
    nombre: "Blanco Jade",
    slug: "blanco-jade",
    imagen: "/images/cocinas/Purastone Prima/Blanco_Jade_PC4PBJM121_T2.webp",
  },
  {
    nombre: "Blanco Zen",
    slug: "blanco-zen",
    imagen: "/images/cocinas/Purastone Prima/Blanco-Zen_PC4PBZM121_T2.webp",
  },
  {
    nombre: "Brescia Imperiale",
    slug: "brescia-imperiale",
    imagen: "/images/cocinas/Purastone Prima/Brescia_Imperiale_PC4PBIM121_F4.webp",
  },
  {
    nombre: "Bronze Armani",
    slug: "bronze-armani",
    imagen: "/images/cocinas/Purastone Prima/Bronze_Armani_PC4PBAM121_T2.webp",
  },
  {
    nombre: "Calacatta Antico",
    slug: "calacatta-antico",
    imagen: "/images/cocinas/Purastone Prima/Calacatta_Antico_PC4PCAM12A_T2.webp",
  },
  {
    nombre: "Calacatta Borghini",
    slug: "calacatta-borghini",
    imagen: "/images/cocinas/Purastone Prima/Calacatta_Borghini_PC4PCBM12A_T2.webp",
  },
  {
    nombre: "Calacatta Vagli",
    slug: "calacatta-vagli",
    imagen: "/images/cocinas/Purastone Prima/Calacatta_Vagli_PC4PCVP121_T2.webp",
  },
  {
    nombre: "Calacatta Viola",
    slug: "calacatta-viola",
    imagen: "/images/cocinas/Purastone Prima/Calacatta_Viola_PC4PVIL12A_T2.webp",
  },
  {
    nombre: "Camouflage",
    slug: "camouflage",
    imagen: "/images/cocinas/Purastone Prima/Camouflage_PC4PCMN121_T2.webp",
  },
  {
    nombre: "Camouflaje Light",
    slug: "camouflaje-light",
    imagen: "/images/cocinas/Purastone Prima/Camouflaje light.jpg",
  },
  {
    nombre: "Ceppo Carabelas",
    slug: "ceppo-carabelas",
    imagen: "/images/cocinas/Purastone Prima/Ceppo Carabelas.webp",
  },
  {
    nombre: "Ceppo Di Gre",
    slug: "ceppo-di-gre",
    imagen: "/images/cocinas/Purastone Prima/Ceppo_di_Gre_PC4PCGM121_T2.jpeg",
  },
  {
    nombre: "Coralina",
    slug: "coralina",
    imagen: "/images/cocinas/Purastone Prima/Coralina_PC4PCOM121_T2.jpeg",
  },
  {
    nombre: "Dalmata",
    slug: "dalmata",
    imagen: "/images/cocinas/Purastone Prima/Dalmata_PC4PDML12A_T2.webp",
  },
  {
    nombre: "Dazzle",
    slug: "dazzle",
    imagen: "/images/cocinas/Purastone Prima/Dazzle_PC4PDAM12A_T2.webp",
  },
  {
    nombre: "Desert Black",
    slug: "desert-black",
    imagen: "/images/cocinas/Purastone Prima/Desert_Black_PC4PDBM121_T2.webp",
  },
  { nombre: "Ember", slug: "ember", imagen: "/images/cocinas/Purastone Prima/Ember.webp" },
  {
    nombre: "Fior Di Bosco",
    slug: "fior-di-bosco",
    imagen: "/images/cocinas/Purastone Prima/Fior_di_Bosco_PC4PFBM12A_T2.webp",
  },
  {
    nombre: "Gris Manhattan",
    slug: "gris-manhattan",
    imagen: "/images/cocinas/Purastone Prima/Gris_Manhattan_PC4PGMM12A_T2.webp",
  },
  {
    nombre: "Ivory Desert",
    slug: "ivory-desert",
    imagen: "/images/cocinas/Purastone Prima/Ivory_Desert_PC4PIDM121_T2.webp",
  },
  {
    nombre: "Lava Black",
    slug: "lava-black",
    imagen: "/images/cocinas/Purastone Prima/Lava_Black_PC4PIDM121_T2.webp",
  },
  {
    nombre: "Limestone",
    slug: "limestone",
    imagen: "/images/cocinas/Purastone Prima/Limestone_PC4PLSM121_T2.webp",
  },
  {
    nombre: "Macchia Vecchia",
    slug: "macchia-vecchia",
    imagen: "/images/cocinas/Purastone Prima/Macchia_Vecchia_PC4PMVM12B_T2.webp",
  },
  {
    nombre: "Marquina",
    slug: "marquina",
    imagen: "/images/cocinas/Purastone Prima/Marquina_PC4PMAP12A_T2.webp",
  },
  {
    nombre: "Metro Cream",
    slug: "metro-cream",
    imagen: "/images/cocinas/Purastone Prima/Metro_Cream_PC4PMCM121_T2.webp",
  },
  {
    nombre: "Metro Grey",
    slug: "metro-grey",
    imagen: "/images/cocinas/Purastone Prima/Metro_Grey_PC4PBZM121_T2.webp",
  },
  { nombre: "Negresco", slug: "negresco", imagen: "/images/cocinas/Purastone Prima/Negresco.webp" },
  {
    nombre: "Onyx Black",
    slug: "onyx-black",
    imagen: "/images/cocinas/Purastone Prima/Onyx_Black_PC4POBM12A_T2.webp",
  },
  {
    nombre: "Onyx White",
    slug: "onyx-white",
    imagen: "/images/cocinas/Purastone Prima/Onyx_White_PC4POWM12A_T2.webp",
  },
  {
    nombre: "Ora Gold",
    slug: "ora-gold",
    imagen: "/images/cocinas/Purastone Prima/Ora_Gold_PC4PDGM12A_T2.webp",
  },
  {
    nombre: "Patagonia Gold",
    slug: "patagonia-gold",
    imagen: "/images/cocinas/Purastone Prima/Patagonia_Gold_PC4PPGM12A_T2.webp",
  },
  {
    nombre: "Summer Calm",
    slug: "summer-calm",
    imagen: "/images/cocinas/Purastone Prima/Summer_Calm_PC4PSCM121_T2.webp",
  },
  {
    nombre: "Taj Mahal",
    slug: "taj-mahal",
    imagen: "/images/cocinas/Purastone Prima/Taj_Mahal_PC4PTMM121_T2.webp",
  },
  {
    nombre: "Titanium Black",
    slug: "titanium-black",
    imagen: "/images/cocinas/Purastone Prima/Titanium_Black_PC4PTBM121_T2.webp",
  },
  {
    nombre: "Toscana Vena",
    slug: "toscana-vena",
    imagen: "/images/cocinas/Purastone Prima/Toscana_Vena_PC4PTVM12A_T2.webp",
  },
  {
    nombre: "Travertino Navona",
    slug: "travertino-navona",
    imagen: "/images/cocinas/Purastone Prima/Travertino_Navona_PC4PTNM121_T2.webp",
  },
  {
    nombre: "Tundra Dark",
    slug: "tundra-dark",
    imagen: "/images/cocinas/Purastone Prima/Tundra_Dark_PC4PTDM121_T2.jpeg",
  },
  {
    nombre: "Vena Oro",
    slug: "vena-oro",
    imagen: "/images/cocinas/Purastone Prima/Vena_Oro_PC4PVOM12A_T2.webp",
  },
  {
    nombre: "Verde Selva",
    slug: "verde-selva",
    imagen: "/images/cocinas/Purastone Prima/Verde_Selva_PC4PVSP121_T2.webp",
  },
];

export const PURASTONE: SwatchPieza[] = [
  {
    nombre: "Arabescato Cervaiole",
    slug: "arabescato-cervaiole",
    imagen: "/images/cocinas/Purastone/Arabescato_Cervaiole_PC3P35P12J_T1.webp",
  },
  {
    nombre: "Arabescato Venatino",
    slug: "arabescato-venatino",
    imagen: "/images/cocinas/Purastone/Arabescato_Venatino_PC3P38P12J_T1.webp",
  },
  {
    nombre: "Basaltina",
    slug: "basaltina",
    imagen: "/images/cocinas/Purastone/Basaltina_PC3P16M20J_T1.webp",
  },
  {
    nombre: "Bianco Luxe",
    slug: "bianco-luxe",
    imagen: "/images/cocinas/Purastone/Bianco_Luxe_PC3P26P20JC_T2.webp",
  },
  {
    nombre: "Bianco Silver",
    slug: "bianco-silver",
    imagen: "/images/cocinas/Purastone/Bianco_Silver_PC3P27P20JC_T2.webp",
  },
  {
    nombre: "Blanco Glitter",
    slug: "blanco-glitter",
    imagen: "/images/cocinas/Purastone/Blanco_Glitter_PC3P03P201_T2.webp",
  },
  {
    nombre: "Blanco Icon",
    slug: "blanco-icon",
    imagen: "/images/cocinas/Purastone/Blanco_Icon_PC3P19P121_T2.webp",
  },
  {
    nombre: "Blanco Nube",
    slug: "blanco-nube",
    imagen: "/images/cocinas/Purastone/Blanco_Nube_PC3P00P201_T2.webp",
  },
  {
    nombre: "Blanco Paloma",
    slug: "blanco-paloma",
    imagen: "/images/cocinas/Purastone/Blanco_Paloma_PC3P09P201_T2.jpeg",
  },
  {
    nombre: "Calacatta Clasico",
    slug: "calacatta-clasico",
    imagen: "/images/cocinas/Purastone/Calacatta_Clasico_PC3P39M12J_T1.webp",
  },
  {
    nombre: "Calacatta Dor",
    slug: "calacatta-dor",
    imagen: "/images/cocinas/Purastone/Calacatta_Dor_PC3P48L20J_Tabla.webp",
  },
  {
    nombre: "Calacatta Gold",
    slug: "calacatta-gold",
    imagen: "/images/cocinas/Purastone/Calacatta_Gold_PC3P14P20J_PR_T1.webp",
  },
  {
    nombre: "Calacatta Versalles",
    slug: "calacatta-versalles",
    imagen: "/images/cocinas/Purastone/Calacatta_Versalles_PC3P47L20J_T2.webp",
  },
  {
    nombre: "Cemento",
    slug: "cemento",
    imagen: "/images/cocinas/Purastone/Cemento_PC3P18P201_T2.webp",
  },
  {
    nombre: "Concrete",
    slug: "concrete",
    imagen: "/images/cocinas/Purastone/Concrete_PC3P01L20J_T2.jpeg",
  },
  {
    nombre: "Concrete Dark",
    slug: "concrete-dark",
    imagen: "/images/cocinas/Purastone/Concrete_Dark_PC3P02L20J_T2.jpeg",
  },
  {
    nombre: "Concrete Sand",
    slug: "concrete-sand",
    imagen: "/images/cocinas/Purastone/Concrete_Sand_PC3P46L20J_T2.webp",
  },
  {
    nombre: "Crema Pisa",
    slug: "crema-pisa",
    imagen: "/images/cocinas/Purastone/Crema_Pisa_PC3P11P201_T2.jpeg",
  },
  {
    nombre: "Estatuario Venato",
    slug: "estatuario-venato",
    imagen: "/images/cocinas/Purastone/Estatuario_Venato_PC3P34P12J_T2.webp",
  },
  {
    nombre: "Greyge",
    slug: "greyge",
    imagen: "/images/cocinas/Purastone/Greyge_PC3P17P201_T2.webp",
  },
  {
    nombre: "Gris Fosil",
    slug: "gris-fosil",
    imagen: "/images/cocinas/Purastone/Gris_Fosil_PC3P04P20J_T2.webp",
  },
  {
    nombre: "Gris Topo",
    slug: "gris-topo",
    imagen: "/images/cocinas/Purastone/Gris_Topo_PC3P12P201_T2.webp",
  },
  {
    nombre: "Gris Zen",
    slug: "gris-zen",
    imagen: "/images/cocinas/Purastone/Gris_Zen_PC3P10P201_T2.webp",
  },
  {
    nombre: "Negro Betun",
    slug: "negro-betun",
    imagen: "/images/cocinas/Purastone/Negro_Betun_PC3P29P201_T2.webp",
  },
  {
    nombre: "Nero Marquina",
    slug: "nero-marquina",
    imagen: "/images/cocinas/Purastone/Nero_Marquina_PC3P22P20J_T2.webp",
  },
  { nombre: "Noir", slug: "noir", imagen: "/images/cocinas/Purastone/Noir_PC3P25P20JC_T2.webp" },
  {
    nombre: "Porfido Gris",
    slug: "porfido-gris",
    imagen: "/images/cocinas/Purastone/Porfido_Gris_PC3P23P201_T2.jpeg",
  },
  {
    nombre: "Statuarietto",
    slug: "statuarietto",
    imagen: "/images/cocinas/Purastone/Statuarietto_PC3P15P20J_T2.webp",
  },
  {
    nombre: "Statuario",
    slug: "statuario",
    imagen: "/images/cocinas/Purastone/Statuario_PC3P06M20J_T1.webp",
  },
  {
    nombre: "Terrazo White",
    slug: "terrazo-white",
    imagen: "/images/cocinas/Purastone/Terrazo_White_PC3P07P20J_T2.webp",
  },
  {
    nombre: "Venatino",
    slug: "venatino",
    imagen: "/images/cocinas/Purastone/Venatino_PC3P13P121_T2.webp",
  },
];

// Catálogo de cada marca, por slug — usado por /superficies/$marca y sus fichas.
export const CATALOGOS: Record<string, SwatchPieza[]> = {
  neolith: NEOLITH,
  purastone: PURASTONE,
  "purastone-prima": PURASTONE_PRIMA,
};
