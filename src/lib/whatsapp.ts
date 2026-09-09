// WhatsApp compartido — número único de la marca y helper para prellenar el
// mensaje según el punto del sitio desde el que se dispara el CTA.

export const WHATSAPP_NUMERO = "5491167150344";

/** Construye un link wa.me con el mensaje ya redactado. */
export function waLink(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}
