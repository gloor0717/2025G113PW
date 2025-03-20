import { test, expect } from "@playwright/test";

test('User Story Az 1122: Utilisation du module de calcul "Space Cooling Demand"', async ({
  page,
}) => {
  await page.goto("https://coollifedev.hevs.ch/");

  await page.getByRole("button", { name: "GO TO APP" }).click();

  if (await page.isVisible("button:has-text('Accept all cookies')")) {
    await page.getByRole("button", { name: "Accept all cookies" }).click();
  }

  // Enter "Geneve" in the search input
  const searchInput = page.locator("#place-input");
  await searchInput.fill("Geneve");

  // Wait for suggestions to load and press Enter to select the first suggestion
  await page.keyboard.press("Enter");

  // Wait for the map to update (adjust timeout as necessary)
  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "Layers" }).click();
  await page.getByLabel("LAU 2").check();

  // Click in the center of the page
  await page.mouse.click(500, 500);

  await page.locator("#funct-test-cms").click();

  await page.locator('button:has-text("CM - Space cooling Demand")').click();

  await page.locator("#funct-test-run-cm-button").click();

  const resultPanel = page.locator("app-right-side-panel");
  await expect(resultPanel).toBeVisible();

  const valueElement = resultPanel.locator("td.value-column");
  const valueText = await valueElement.textContent();
  const value = parseFloat(valueText.trim());

  expect(value).toBeGreaterThanOrEqual(0.1);
});
