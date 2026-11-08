import { z } from "zod";

export const normalizePhone = (value: string) =>
  value
    .replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 1632))
    .replace(/[۰-۹]/g, (c) => String(c.charCodeAt(0) - 1776))
    .replace(/[\s()\-]/g, "");
export const requestSchema = z.object({
  parent_name: z.string().trim().min(2, "من فضلك اكتب اسم ولي الأمر").max(100),
  phone: z
    .string()
    .transform(normalizePhone)
    .pipe(z.string().regex(/^\+?[0-9]{8,15}$/, "رقم الهاتف غير صحيح")),
  child_age: z.coerce
    .number()
    .int()
    .min(4, "البرامج تبدأ من عمر 4 سنوات")
    .max(15, "البرامج حتى عمر 15 سنة"),
  current_level: z.string().trim().max(80).optional(),
  preferred_contact: z.enum(["whatsapp", "phone"]),
  note: z.string().trim().max(600).optional(),
  consent: z.boolean().refine((value) => value, "لازم توافق على سياسة الخصوصية"),
});
export const stages = [
  "new",
  "contacted",
  "trial_scheduled",
  "attended",
  "enrolled",
  "lost",
] as const;
export const stageLabels: Record<(typeof stages)[number], string> = {
  new: "جديد",
  contacted: "تم التواصل",
  trial_scheduled: "التجربة متحددة",
  attended: "حضر التجربة",
  enrolled: "اشترك",
  lost: "مش هيكمل",
};
export type TrialRequest = z.infer<typeof requestSchema>;
export type Lead = TrialRequest & {
  id: string;
  created_at: string;
  updated_at: string;
  status: (typeof stages)[number];
  assigned_to: string | null;
  follow_up_at: string | null;
  trial_at: string | null;
  staff_note: string;
  revision: number;
};
export type StaffMember = { user_id: string; display_name: string };
export type LeadEvent = {
  id: string;
  created_at: string;
  actor_id: string | null;
  changes: Record<string, { from: string | null; to: string | null }>;
};
