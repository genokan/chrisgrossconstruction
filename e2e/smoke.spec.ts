import { test, expect, type Page } from "@playwright/test";

const routes = ["/", "/work/", "/services/", "/about/", "/contact/"];

// Scroll the whole page to trigger any lazy-loaded (below-the-fold) images
// before we assert they loaded.
async function scrollThroughPage(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let total = 0;
      const step = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 40);
    });
  });
}

for (const route of routes) {
  test(`${route} renders, loads its images, and throws no JS errors`, async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));

    // Use domcontentloaded, not networkidle: the /contact/ Google Maps embed
    // streams tiles indefinitely, so the network never goes idle.
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.ok(), `HTTP status for ${route}`).toBeTruthy();

    // Something rendered — a top-level heading is visible.
    await expect(page.locator("h1, h2").first()).toBeVisible();

    // Trigger lazy images, then poll until every page image has loaded.
    await scrollThroughPage(page);
    await expect
      .poll(
        () =>
          page.evaluate(
            () =>
              Array.from(document.images).filter(
                (img) => !img.complete || img.naturalWidth === 0,
              ).length,
          ),
        { message: `images failed to load on ${route}`, timeout: 15000 },
      )
      .toBe(0);

    // No uncaught JavaScript errors on the page.
    expect(pageErrors, `page errors on ${route}`).toEqual([]);
  });
}

test("home page exposes a valid click-to-call link", async ({ page }) => {
  await page.goto("/");
  const tel = page.locator('a[href^="tel:"]').first();
  await expect(tel).toBeVisible();
  await expect(tel).toHaveAttribute("href", /^tel:\+1\d{10}$/);
});

test("primary navigation links to the main pages are present", async ({
  page,
}) => {
  await page.goto("/");
  for (const name of ["Our Work", "What We Build", "Contact"]) {
    await expect(
      page.getByRole("link", { name, exact: true }).first(),
    ).toBeVisible();
  }
});
