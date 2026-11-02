export const OPERATIONS_WHATSAPP_NUMBER = "201000000000";

export function whatsappLink(message: string) {
  return `https://wa.me/${OPERATIONS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
