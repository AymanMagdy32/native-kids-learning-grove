export const OPERATIONS_WHATSAPP_NUMBER = "201022986424";

export function whatsappLink(message: string) {
  return `https://api.whatsapp.com/send?phone=${OPERATIONS_WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

export function bookingWhatsAppLink(program?: string) {
  const choice = program === "group" ? "جروب لحد ٦ أطفال" : program === "private" ? "برايفت" : "تجربة وتحديد مستوى";
  return whatsappLink(`أهلًا Native Kid Academy، عايز أعرف تفاصيل ${choice} لطفلي والمواعيد المتاحة.`);
}
