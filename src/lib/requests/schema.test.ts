import { describe, expect, it } from "vitest";
import { requestSchema } from "./schema";
const valid = {
  parent_name: "ولي أمر",
  phone: "٠١٠ ١٢٣٤ ٥٦٧٨",
  child_age: "7",
  preferred_contact: "phone",
  consent: true,
};
describe("Trial request validation", () => {
  it("normalizes Arabic digits and preserves a phone-call preference", () => {
    const result = requestSchema.parse(valid);
    expect(result.phone).toBe("01012345678");
    expect(result.preferred_contact).toBe("phone");
    expect(result.child_age).toBe(7);
  });
  it("requires explicit consent with an Arabic error", () => {
    const result = requestSchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.issues[0]?.message).toBe("لازم توافق على سياسة الخصوصية");
  });
  it.each([3, 16, 7.5])("rejects invalid child age %s", (age) => {
    expect(requestSchema.safeParse({ ...valid, child_age: age }).success).toBe(false);
  });
  it.each(["123", "+201000000000000000", "bad phone"])("rejects invalid phone %s", (phone) => {
    expect(requestSchema.safeParse({ ...valid, phone }).success).toBe(false);
  });
  it("does not accept pipeline or staff fields from a public request", () => {
    const result = requestSchema.parse({
      ...valid,
      status: "enrolled",
      assigned_to: "injected",
      staff_note: "injected",
    });
    expect(result).not.toHaveProperty("status");
    expect(result).not.toHaveProperty("assigned_to");
  });
});
