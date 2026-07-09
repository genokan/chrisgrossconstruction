import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { site } from "../lib/site";
import { projects, services } from "../lib/data";

const publicDir = join(process.cwd(), "public");

describe("site config", () => {
  it("has a valid click-to-call href", () => {
    expect(site.phoneHref).toMatch(/^tel:\+1\d{10}$/);
  });

  it("phone href digits match the displayed number", () => {
    const hrefDigits = site.phoneHref.replace(/\D/g, "").replace(/^1/, "");
    const displayDigits = site.phoneDisplay.replace(/\D/g, "");
    expect(hrefDigits).toBe(displayDigits);
  });

  it("serves its home base of Holton", () => {
    expect(site.serviceArea).toContain("Holton");
    expect(site.address.city).toBe("Holton");
  });

  it("has non-empty nav with root-relative hrefs", () => {
    expect(site.nav.length).toBeGreaterThan(0);
    for (const item of site.nav) {
      expect(item.href.startsWith("/")).toBe(true);
    }
  });
});

describe("content data", () => {
  it("every project references a photo that exists on disk", () => {
    for (const p of projects) {
      expect(p.image.startsWith("/photos/")).toBe(true);
      expect(existsSync(join(publicDir, p.image))).toBe(true);
    }
  });

  it("every service references a photo that exists on disk", () => {
    for (const s of services) {
      expect(existsSync(join(publicDir, s.image))).toBe(true);
    }
  });

  it("project slugs are unique", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
