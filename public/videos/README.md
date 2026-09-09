# Videos de secciones

Dejá acá los tres videos de fondo de la home. El componente `SectionVideo`
los busca por nombre exacto:

| Sección                         | Archivo (ideal)  | Respaldo         |
| ------------------------------- | ---------------- | ---------------- |
| El oficio (`#taller`)           | `oficio.mp4`     | `oficio.mov`     |
| Proceso (`#seleccion`)          | `proceso.mp4`    | `proceso.mov`    |
| Showroom (`#showroom`)          | `encuentro.mp4`  | `encuentro.mov`  |

## Recomendaciones

- **Subí `.mp4` (códec H.264 + AAC).** Es el único formato que reproduce en
  Chrome, Firefox, Edge y Safari. El `.mov` solo lo decodifica Safari; en el
  resto de los navegadores se ve la imagen `poster` en lugar del video.
- Si solo tenés el `.mov`, dejalo igual: el sitio no se rompe, cae al poster.
  Para convertirlo sin recomprimir:
  `ffmpeg -i oficio.mov -c copy oficio.mp4`
- Son videos de fondo: sin audio, en loop. Mantené el peso por debajo de
  ~8–10 MB y una duración de 8–20 s.
- Resolución sugerida: 1920×1080 o 1280×720. Se recortan con `object-cover`.
- La imagen `poster` (lo que se ve mientras carga) sigue siendo la foto actual
  de cada sección en `public/images/`.
