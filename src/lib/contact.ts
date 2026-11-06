export const OPERATIONS_WHATSAPP_NUMBER = "201022986424";

export function whatsappLink(message: string) {
  return `https://api.whatsapp.com/send?phone=${OPERATIONS_WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}
