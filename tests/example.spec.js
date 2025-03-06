// @ts-check
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://citiwattsdev.hevs.ch/");
  await expect(page).toHaveTitle(/citiwatts - Toolbox/);
});

test("Cookies popup shows", async ({ page }) => {
  await page.goto("https://citiwattsdev.hevs.ch/");
  await page.getByRole("button", { name: "GO TO APP" }).click();
  await expect(
    page.getByRole("button", { name: "Decline statistics cookies" })
  ).toBeVisible();
});
