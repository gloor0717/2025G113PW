import { test, expect } from "@playwright/test";

test('User Story Az 1125: Utilisation du module de calcul "Economic feasability"', async ({ page }) => {
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
  await page.locator('button:has-text(" CM - Economic Feasibility")').click();
  await page.locator("#funct-test-run-cm-button").click();

  const resultPanel = page.locator("app-right-side-panel");
  await expect(resultPanel).toBeVisible({ timeout: 30000 });

  // Wait for the "country" row to ensure the data has loaded
  await expect(resultPanel.locator('tr.table-level-two', { hasText: "country" })).toBeVisible({ timeout: 30000 });

  // Row 1: country -> FRA
  const rowCountry = resultPanel.locator('tr.table-level-two', { hasText: "country" });
  await expect(rowCountry).toContainText("FRA");

  // Row 2: Scenario Description:
  const rowScenario = resultPanel.locator('tr.table-level-two', { hasText: "Scenario Description:" });
  await expect(rowScenario).toContainText("In this scenario uptake of high efficiency packages of passive measure along with high diffusion levels of supply technology and high efficiency level of active technology improvement rates are expected for France");

  // Row 3: Baseline Seasonal Energy Efficiency Ratio (SEER)
  const rowBaselineSEER = resultPanel.locator('tr.table-level-two', { hasText: "Baseline Seasonal Energy Efficiency Ratio (SEER)" });
  await expect(rowBaselineSEER).toContainText("3.92");

  // Row 4: Improved Seasonal Energy Efficiency Ratio (SEER) in the Scenario
  const rowImprovedSEER = resultPanel.locator('tr.table-level-two', { hasText: "Improved Seasonal Energy Efficiency Ratio (SEER) in the Scenario" });
  await expect(rowImprovedSEER).toContainText("7.92");

  // Row 5: Base year Useful energy demand for Base Scenario
  const rowBaseYearDemand = resultPanel.locator('tr.table-level-two', { hasText: "Base year Useful energy demand for Base Scenario" });
  await expect(rowBaseYearDemand).toContainText("88 430.88");
  await expect(rowBaseYearDemand).toContainText("GWh");

  // Row 6: 2050 Useful energy demand for Base Scenario
  const row2050BaseDemand = resultPanel.locator('tr.table-level-two', { hasText: "2050 Useful energy demand for Base Scenario" });
  await expect(row2050BaseDemand).toContainText("219 760.78");
  await expect(row2050BaseDemand).toContainText("GWh");

  // Row 7: 2050 Useful Energy Demand for Selected Scenario
  const row2050SelectedDemand = resultPanel.locator('tr.table-level-two', { hasText: "2050 Useful Energy Demand for Selected Scenario" });
  await expect(row2050SelectedDemand).toContainText("85 118.05");
  await expect(row2050SelectedDemand).toContainText("GWh");

  // Row 8: Savings in the Useful Energy Demand by 2050
  const rowSavingsDemand = resultPanel.locator('tr.table-level-two', { hasText: "Savings in the Useful Energy Demand by 2050" });
  await expect(rowSavingsDemand).toContainText("61.27");
  await expect(rowSavingsDemand).toContainText("%");

  // Row 9: 2050 Final Energy Demand for Base Scenario
  const row2050FinalBase = resultPanel.locator('tr.table-level-two', { hasText: "2050 Final Energy Demand for Base Scenario" });
  await expect(row2050FinalBase).toContainText("56 063.57");
  await expect(row2050FinalBase).toContainText("GWh");

  // Row 10: 2050 Final Energy Demand for Selected Scenario
  const row2050FinalSelected = resultPanel.locator('tr.table-level-two', { hasText: "2050 Final Energy Demand for Selected Scenario" });
  await expect(row2050FinalSelected).toContainText("8 580.58");
  await expect(row2050FinalSelected).toContainText("GWh");

  // Row 11: Final Energy Demand savings estimated in this scenario by 2050
  const rowFinalSavings = resultPanel.locator('tr.table-level-two', { hasText: "Final Energy Demand savings estimated in this scenario by 2050" });
  await expect(rowFinalSavings).toContainText("84.69");
  await expect(rowFinalSavings).toContainText("%");

  // Row 12: Levelized Cost of Energy Saving from selected passive measure per unit useful energy saved
  const rowLCOESaving = resultPanel.locator('tr.table-level-two', { hasText: "Levelized Cost of Energy Saving from selected passive measure per unit useful energy saved" });
  await expect(rowLCOESaving).toContainText("34.31");
  await expect(rowLCOESaving).toContainText("EUR/MWh");

  // Row 13: Levelized Cost of Energy of the scenario measure per unit useful energy supplied
  const rowLCOEScenario = resultPanel.locator('tr.table-level-two', { hasText: "Levelized Cost of Energy of the scenario measure per unit useful energy supplied" });
  await expect(rowLCOEScenario).toContainText("81.54");
  await expect(rowLCOEScenario).toContainText("EUR/MWh");
});
