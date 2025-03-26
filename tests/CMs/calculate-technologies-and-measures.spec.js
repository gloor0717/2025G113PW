import { test, expect } from "@playwright/test";

test('User Story Az 1123: Utilisation du module de calcul "Technologies and measures"', async ({
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
  await page.locator('button:has-text("CM - Technologies & Measures")').click();
  await page.locator("#funct-test-run-cm-button").click();

  const resultPanel = page.locator("app-right-side-panel");

  // Wait for a known result row to appear before proceeding.
  await expect(resultPanel.locator('tr.table-level-two', { hasText: "Residential cooled area" })).toBeVisible({ timeout: 20000 });

  // Residential cooled area
  const row1 = resultPanel.locator('tr.table-level-two', { hasText: 'Residential cooled area' });
  await expect(row1).toContainText('845 901');
  await expect(row1).toContainText('m2');

  // Cooling demand - residential
  const row2 = resultPanel.locator('tr.table-level-two', { hasText: 'Cooling demand - residential' });
  await expect(row2).toContainText('6 488.35');
  await expect(row2).toContainText('MWh/y');

  // Cooling demand with measures- residential
  const row3 = resultPanel.locator('tr.table-level-two', { hasText: 'Cooling demand with measures- residential' });
  await expect(row3).toContainText('6 488.35');
  await expect(row3).toContainText('MWh/y');

  // SC Final energy consumption - residential
  const row4 = resultPanel.locator('tr.table-level-two', { hasText: 'SC Final energy consumption - residential' });
  await expect(row4).toContainText('1 380.5');
  await expect(row4).toContainText('MWh/y');

  // Cooling capacity - residential
  const row5 = resultPanel.locator('tr.table-level-two', { hasText: 'Cooling capacity - residential' });
  await expect(row5).toContainText('69.14');
  await expect(row5).toContainText('MW');

  // Cooling power capacity - residential
  const row6 = resultPanel.locator('tr.table-level-two', { hasText: 'Cooling power capacity - residential' });
  await expect(row6).toContainText('14.71');
  await expect(row6).toContainText('MW');
});
