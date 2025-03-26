import { test, expect } from "@playwright/test";

test('User Story Az 1122: Utilisation du module de calcul "Space Cooling Demand"', async ({
  page,
}) => {
  await page.goto("https://coollifedev.hevs.ch/");

  await page.getByRole("button", { name: "GO TO APP" }).click();

  if (await page.isVisible("button:has-text('Accept all cookies')")) {
    await page.getByRole("button", { name: "Accept all cookies" }).click();
  }

  const lau2Option = page.locator(
    ".leaflet-control-layers-list label:has-text('LAU 2')"
  );
  await lau2Option.waitFor();
  await lau2Option.click();

  await page.fill('input[id="place-input"]', "Geneva");
  await page.press('input[id="place-input"]', "Enter");
  await page.waitForLoadState("networkidle");

  await page.mouse.click(600, 400);

  await page.locator("#funct-test-cms").click();
  await page.locator('button:has-text("CM - Space cooling Demand")').click();
  await page.locator("#funct-test-run-cm-button").click();

  const resultPanel = page.locator("app-right-side-panel");
  await expect(resultPanel).toBeVisible();

  const valueElement = resultPanel.locator("td.value-column");
  const valueText = await valueElement.innerText();
  const value = parseFloat(valueText.replace("GWh", "").trim());

  expect(value).toBe(472);
});
