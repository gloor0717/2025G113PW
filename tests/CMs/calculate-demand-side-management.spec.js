import { test, expect } from "@playwright/test";

test('User Story Az 1127: Utilisation du module de calcul "demand-side management/Demand response"', async ({
  page,
}) => {
  await page.goto("https://coollifedev.hevs.ch/");

  await page.getByRole("button", { name: "GO TO APP" }).click();

  if (await page.isVisible("button:has-text('Accept all cookies')")) {
    await page.getByRole("button", { name: "Accept all cookies" }).click();
  }

  await page.fill('input[id="place-input"]', "Luxembourg");
  await page.press('input[id="place-input"]', "Enter");
  await page.waitForLoadState("networkidle");

  await page.mouse.click(600, 400);

  await page.locator("#funct-test-cms").click();
  await page
    .locator('button:has-text(" CM - Demand-side Management/Demand Response")')
    .click();
  await page.locator("#funct-test-run-cm-button").click();

  const resultPanel = page.locator("app-right-side-panel");
  await expect(resultPanel).toBeVisible({ timeout: 60000 });

  // Wait for a known row to appear to ensure data is loaded
  await expect(
    resultPanel.locator('tr.table-level-two', { hasText: "Country" })
  ).toBeVisible({ timeout: 60000 });

  // 1. Country
  const rowCountry = resultPanel.locator('tr.table-level-two', {
    hasText: 'Country',
  });
  await expect(rowCountry).toContainText('Luxembourg');

  // 2. BAU (without PV)
  const rowBauNoPV = resultPanel.locator('tr.table-level-two', {
    hasText: 'Total Energy: Non-PV Cooling Demand - BAU (without PV)',
  });
  await expect(rowBauNoPV).toContainText('15.35');
  await expect(rowBauNoPV).toContainText('kWh');

  // 3. BAU (w/ PV, non-optimized)
  const rowBauWithPV = resultPanel.locator('tr.table-level-two', {
    hasText: 'Total Energy: Non-PV Cooling Demand - BAU (w/ PV, non-optimized)',
  });
  await expect(rowBauWithPV).toContainText('8.08');
  await expect(rowBauWithPV).toContainText('kWh');

  // 4. DR (PV-optimized)
  const rowDR = resultPanel.locator('tr.table-level-two', {
    hasText: 'Total Energy: Non-PV Cooling Demand - DR (PV-optimized)',
  });
  await expect(rowDR).toContainText('8.04');
  await expect(rowDR).toContainText('kWh');

  // 5. Note (currently empty, just ensure the row is present)
  const rowNote = resultPanel.locator('tr.table-level-two', {
    hasText: 'Note',
  });
  await expect(rowNote).toBeVisible();
});
