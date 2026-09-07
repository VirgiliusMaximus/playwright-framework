import { test, expect } from "../../fixtures/hooks-fixture";
import loginData from "../../data/ui-data/login-module-data.json";
import CommonUtils from "../../utils/common-util";
import { NewUserPage } from "../../pages/NewUserPage";

test.use({ storageState: "./authentication/.auth/auth2.json" });

test("Add item to cart", { tag: ['@ui', '@smoke'] }, async ({ page, newSignupLoginPage }: any) => {
 test.slow();
   await newSignupLoginPage.gotoNewSiteLink();
   await page.getByRole('link', { name: ' Products' }).click();
   await page.locator('iframe[name="aswift_3"]').contentFrame().getByRole('button', { name: 'Close ad' }).click();
   await page.getByRole('link', { name: ' View Product' }).nth(1).click();
   await page.getByRole('button', { name: ' Add to cart' }).click();
   await expect(page.getByRole('paragraph').filter({ hasText: 'View Cart' })).toBeVisible();
   await page.getByRole('paragraph').filter({ hasText: 'View Cart' }).click();
})