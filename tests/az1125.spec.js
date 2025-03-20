import { test, expect } from "@playwright/test";

test("Economic feasibility module - User Story Az1125", async ({ page }) => {
  // Step 1: Go to the page and check title
  await page.goto("https://coollifedev.hevs.ch/map");
  await expect(page).toHaveTitle(/CoolLIFE - Toolbox/);

  // Step 1.5: Accept cookies if the cookie banner is visible
  const cookieBanner = await page.locator('text="Accept all cookies"');
  if (await cookieBanner.isVisible()) {
    await cookieBanner.click();
  }

  // Step 2.5: Zoom in on Geneva
  await page.click('text=+'); // Adjust selector to match the Geneva region on the map
  await page.click('text=+'); // Adjust selector to match the Geneva region on the map
  await page.click('text=Switzerland'); // Adjust selector to match the Geneva region on the map
  await page.click('button[aria-label="Zoom in"]'); // Example: Click zoom in button (adjust selector as needed)

  
  // Step 2.5: Zoom in on Geneva
  await page.click('text=+'); // Adjust selector to match the Geneva region on the map
  await page.click('text=Geneva'); // Adjust selector to match the Geneva region on the map
  await page.click('button[aria-label="Zoom in"]'); // Example: Click zoom in button (adjust selector as needed)

    // Step 2: Select "LAU 2" area
    await page.click('text=LAU 2');

  // Step 3: Select a neighborhood in Genève
  await page.click('text=Pregny');

  // Step 4: Click on "Calculation modules"
  await page.click('text=Calculation modules');

  // Step 5: Click on "Economic feasibility" module
  await page.click('text=CM - Economic feasibility');

  // (Optional) Add additional assertions to verify the module's functionality
});