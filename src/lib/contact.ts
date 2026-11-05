export const OPERATIONS_WHATSAPP_NUMBER = "201022986424";

export function whatsappLink(message: string) {
  return `https://wa.me/${OPERATIONS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
