import { describe, it, expect } from "vitest";
import { generateReference, parseRecipients } from "../functions/api/quote";

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

describe("recipient parsing", () => {
  const fallback = "chrisgrossconstruction@gmail.com";

  it("returns a single address as a one-element array", () => {
    expect(parseRecipients("chris@example.com", fallback)).toEqual(["chris@example.com"]);
  });

  it("splits a comma-separated list and trims whitespace", () => {
    expect(parseRecipients("chris@example.com, cgtech@example.com", fallback)).toEqual([
      "chris@example.com",
      "cgtech@example.com",
    ]);
  });

  it("drops empty entries from trailing or doubled commas", () => {
    expect(parseRecipients("a@example.com,, b@example.com,", fallback)).toEqual([
      "a@example.com",
      "b@example.com",
    ]);
  });

  it("falls back to the default when unset or empty", () => {
    expect(parseRecipients(undefined, fallback)).toEqual([fallback]);
    expect(parseRecipients("   ", fallback)).toEqual([fallback]);
  });
});
