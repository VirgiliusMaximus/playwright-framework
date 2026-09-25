import { test, expect } from "../../fixtures/hooks-fixture";
import loginData from "../../data/ui-data/login-module-data.json";
import CommonUtils from "../../utils/common-util";
import { NewUserPage } from "../../pages/NewUserPage";

test.use({ storageState: "./authentication/.auth/auth3.json" });

test("Edit last order site 3", { tag: ['@ui', '@smoke'] }, async ({ page, newLoginPage, newLandingPage }: any) => {
   test.setTimeout(200000)
   await newLoginPage.gotoSiteLinkTwo();
   await page.locator('[data-test="nav-menu"]').click();
   await page.locator('[data-test="nav-admin-categories"]').click();
   await page.locator('[data-test="category-add"]').click();
   await page.locator('[data-test="parent-id"]').selectOption({ label: "Power Tools" });
   await page.locator('[data-test="name"]').fill("Power Tools Test2");
   await page.locator('[data-test="slug"]').fill("power-tools-test2");
   await page.locator('[data-test="category-submit"]').click();
   await page.locator('[data-test="back"]').click();
   //await page.getByRole('cell', { name: 'Power Tools Test2' }).waitFor({ state: 'visible', timeout: 190000 });
   //await expect(page.getByRole('cell', { name: 'Power Tools Test2' })).toBeVisible({ timeout: 8000 });

});

