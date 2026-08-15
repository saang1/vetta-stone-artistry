export type Formato = "pano" | "vert";

export interface ProyectoGaleria {
  id: number;
  nombre: string;
  material: string;
  imagen: string;
  formato: Formato;
}

export const proyectos: ProyectoGaleria[] = [
  {
    id: 1,
    nombre: "Escalera Flotante",
    material: "Mármol Calacatta",
    imagen: "/images/proyectos/proyecto-01-escalera-flotante-pano.png",
    formato: "pano",
  },
  {
    id: 2,
    nombre: "Escalera en Travertino",
    material: "Travertino Romano",
    imagen: "/images/proyectos/proyecto-02-escalera-travertino-pano.png",
    formato: "pano",
  },
  {
    id: 3,
    nombre: "Muro Book-matched",
    material: "Statuario Venato",
    imagen: "/images/proyectos/proyecto-03-muro-bookmatched-pano.png",
    formato: "pano",
  },
  {
    id: 4,
    nombre: "Hogar en Travertino",
    material: "Travertino Clásico",
    imagen: "/images/proyectos/proyecto-04-hogar-travertino-pano.png",
    formato: "pano",
  },
  {
    id: 5,
    nombre: "Isla Monolítica",
    material: "Mármol Calacatta",
    imagen: "/images/proyectos/proyecto-05-isla-marmol-pano.png",
    formato: "pano",
  },
  {
    id: 6,
    nombre: "Vanitory Book-matched",
    material: "Statuario Venato",
    imagen: "/images/proyectos/proyecto-06-vanitory-bookmatched-vert.png",
    formato: "vert",
  },
  {
    id: 7,
    nombre: "Banco de Travertino",
    material: "Travertino Romano",
    imagen: "/images/proyectos/proyecto-07-banco-travertino-pano.png",
    formato: "pano",
  },
  {
    id: 8,
    nombre: "Backsplash Book-matched",
    material: "Mármol Calacatta",
    imagen: "/images/proyectos/proyecto-08-backsplash-bookmatched-pano.png",
    formato: "pano",
  },
];
