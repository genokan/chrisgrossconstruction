import { test, expect } from "@playwright/test";

test.describe("work gallery", () => {
  test("renders project cards", async ({ page }) => {
    await page.goto("/work/");
    const cards = page.locator("section button:has(img)");
    expect(await cards.count()).toBeGreaterThan(1);
  });

  test("lightbox opens on click and closes with Escape", async ({ page }) => {
    await page.goto("/work/");

    // Open the first project card.
    await page.locator("section button:has(img)").first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    // The dialog shows an enlarged image.
    await expect(dialog.locator("img").first()).toBeVisible();

    // Escape closes it.
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});
