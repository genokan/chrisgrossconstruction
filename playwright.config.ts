import { defineConfig, devices } from "@playwright/test";

// Serve the built static export on a dedicated port so it never clashes with
// a local `next dev` on 3000/3001.
const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Build the site and serve the static `out/` directory. Testing the real
  // production export (not `next dev`) catches export-only and layout issues.
  webServer: {
    command: `npm run build && npx serve out -l ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
