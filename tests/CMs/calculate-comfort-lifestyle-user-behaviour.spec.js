import { test, expect } from "@playwright/test";

test('User Story Az 1124: Utilisation du module de calcul "Comfort, lifestyle and user behaviour"', async ({ page }) => {
  // Increase the timeout for this test to 30 seconds
  test.setTimeout(30000);

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
  await page.locator('button:has-text("CM - Comfort, Lifestyle and User Behaviour")').click();
  await page.locator("#funct-test-run-cm-button").click();

  const resultPanel = page.locator("app-right-side-panel");
  await expect(resultPanel).toBeVisible({ timeout: 30000 });

  // Wait for a specific known row to appear
  await expect(resultPanel.locator('tr.table-level-two', { hasText: "Traditional practices adopted to limit the need for active space cooling" }))
    .toBeVisible({ timeout: 30000 });

  // 1. Traditional practices adopted to limit the need for active space cooling
  const rowAdopted = resultPanel.locator('tr.table-level-two', {
    hasText: 'Traditional practices adopted to limit the need for active space cooling'
  });
  await expect(rowAdopted).toContainText('Passive cooling by nigh-time ventilation');

  // 2. Traditional practices continued (first occurrence)
  const rowsContinued = resultPanel.locator('tr.table-level-two', { hasText: 'Traditional practices continued' });
  await expect(rowsContinued.nth(0)).toContainText('Use of natural ventilation and heat recovery systems');

  // 3. Traditional practices continued (second occurrence)
  await expect(rowsContinued.nth(1)).toContainText('Evening activities: people can schedule outdoor activities for the evening when temperatures are cooler');

  // 4. Traditional practices continued (third occurrence)
  await expect(rowsContinued.nth(2)).toContainText('Window shading: blinds, curtains, or shutters to block out the sun during the hottest parts of the day');

  // 5. Summer setpoint for conditioned buildings, new buildings in France
  const rowSetpoint = resultPanel.locator('tr.table-level-two', {
    hasText: 'Summer setpoint for conditioned buildings, new buildings in France'
  });
  await expect(rowSetpoint).toContainText('26 °C');

  // 6. Overheating limit, thermal comfort in France
  const rowOverheating = resultPanel.locator('tr.table-level-two', {
    hasText: 'Overheating limit, thermal comfort in France'
  });
  await expect(rowOverheating).toContainText('26-28 °C');

  // 7. Limit for activating cooling systems, existing buildings in France
  const rowLimit = resultPanel.locator('tr.table-level-two', {
    hasText: 'Limit for activating cooling systems, existing buildings in France'
  });
  await expect(rowLimit).toContainText('26 °C');

  // 8. Successful intervention strategy
  const rowIntervention = resultPanel.locator('tr.table-level-two', {
    hasText: 'Successful intervention strategy'
  });
  await expect(rowIntervention).toContainText('Feedback & gamification through an App');

  // 9. Behaviour changed
  const rowBehaviour = resultPanel.locator('tr.table-level-two', {
    hasText: 'Behaviour changed'
  });
  await expect(rowBehaviour).toContainText('Thermostat-adjustment behaviours to increase summer indoor temperatures');

  // 10. Geographical context
  const rowGeo = resultPanel.locator('tr.table-level-two', {
    hasText: 'Geographical context'
  });
  await expect(rowGeo).toContainText('US');

  // 11. Successful case study reference
  const rowCaseStudy = resultPanel.locator('tr.table-level-two', {
    hasText: 'Successful case study reference'
  });
  await expect(rowCaseStudy).toContainText('https://doi.org/10.1016/j.buildenv.2022.109252');
});
