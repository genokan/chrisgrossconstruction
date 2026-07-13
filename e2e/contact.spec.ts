import { test, expect } from "@playwright/test";

test.describe("quote request form", () => {
  test("blocks submission when required fields are empty", async ({ page }) => {
    await page.goto("/contact/");
    await expect(page.locator("form")).toBeVisible();

    await page.getByRole("button", { name: /request a quote/i }).click();

    // Native validation should stop the submit — no success panel appears.
    await expect(page.getByText(/request received/i)).toHaveCount(0);

    // ...and the browser flags the empty required field.
    const nameMissing = await page
      .locator('input[name="name"]')
      .evaluate((el: HTMLInputElement) => el.validity.valueMissing);
    expect(nameMissing).toBe(true);
  });

  test("shows the success panel with a reference on submit", async ({
    page,
  }) => {
    // The quote endpoint is a Cloudflare Pages Function (not served by the
    // static preview), so mock it to exercise the success UX deterministically.
    await page.route("**/api/quote", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, reference: "07122026-1234" }),
      });
    });

    await page.goto("/contact/");
    await page.locator('input[name="name"]').fill("Test User");
    await page.locator('input[name="phone"]').fill("785-555-0100");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page
      .locator('select[name="projectType"]')
      .selectOption("Shop or garage");

    await page.getByRole("button", { name: /request a quote/i }).click();

    await expect(page.getByText(/request received/i)).toBeVisible();
    await expect(page.getByText("07122026-1234")).toBeVisible();
  });
});
