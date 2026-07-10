import { describe, it, expect } from "vitest";
import { generateReference } from "../functions/api/quote";

describe("quote reference", () => {
  it("formats as MMDDYYYY-NNNN", () => {
    const ref = generateReference(new Date(2026, 6, 9)); // July 9, 2026
    expect(ref).toMatch(/^07092026-\d{4}$/);
  });

  it("zero-pads single-digit month and day", () => {
    const ref = generateReference(new Date(2026, 0, 5)); // Jan 5, 2026
    expect(ref.startsWith("01052026-")).toBe(true);
  });

  it("always produces an 8-digit date and 4 random digits", () => {
    expect(generateReference()).toMatch(/^\d{8}-\d{4}$/);
  });
});
