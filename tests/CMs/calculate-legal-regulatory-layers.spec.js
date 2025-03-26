import { test, expect } from "@playwright/test";

test('User Story Az 1126: Utilisation du module de calcul "Legal and regulatory layers"', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto("https://coollifedev.hevs.ch/");

  await page.getByRole("button", { name: "GO TO APP" }).click();

  if (await page.isVisible("button:has-text('Accept all cookies')")) {
    await page.getByRole("button", { name: "Accept all cookies" }).click();
  }

  const lau2Option = page.locator(".leaflet-control-layers-list label:has-text('NUTS 3')");
  await lau2Option.waitFor();
  await lau2Option.click();

  await page.fill('input[id="place-input"]', "Paris");
  await page.press('input[id="place-input"]', "Enter");
  await page.waitForLoadState("networkidle");

  await page.mouse.click(600, 400);

  await page.locator("#funct-test-cms").click();
  await page.locator('button:has-text(" Mapping of Legal and Regulatory Information")').click();
  await page.locator("#funct-test-run-cm-button").click();

  const resultPanel = page.locator("app-right-side-panel");
  await expect(resultPanel).toBeVisible({ timeout: 30000 });

  const rowNational = resultPanel.locator('tr.table-level-two', { hasText: "National background and strategy" });
  await expect(rowNational).toBeVisible({ timeout: 30000 });
  await expect(rowNational).toContainText("France does not have a specific cooling strategy");
  await expect(rowNational).toContainText("National Heat Wave Plan published in 2023");

  const rowInfo = resultPanel.locator('td.info-column', { hasText: /^Info$/ }).locator('..');
  await expect(rowInfo).toBeVisible({ timeout: 30000 });
  await expect(rowInfo).toContainText("Detailed country description excel sheet can be downloaded from the Export Extra Files button.");
});
