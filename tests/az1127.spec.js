import { test, expect } from "@playwright/test";

test("Demand-side management/Demand response module - User Story Az1127", async ({ page }) => {
  // Step 1: Go to the page and check title
  await page.goto("https://coollifedev.hevs.ch/map");
  await expect(page).toHaveTitle(/CoolLIFE - Toolbox/);

  // Step 1.5: Accept cookies if the cookie banner is visible
  const cookieBanner = await page.locator('text="Accept all cookies"');
  if (await cookieBanner.isVisible()) {
    await cookieBanner.click();
  }

  // Step 2: Select "LAU 2" area
  await page.click('text=LAU 2');

  // Step 3: Select a neighborhood in Genève 
  await page.click('text=Pregny');

  // Step 4: Click on "Calculation modules"
  await page.click('text=Calculation modules');

  // Step 5: Click on "Demand-side management/Demand response" module
  await page.click('text=CM - Demand-side management/Demand response');

  // (Optional) Add additional assertions to verify the module's functionality
});
