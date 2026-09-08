import { test, expect } from "../../fixtures/hooks-fixture";
import loginData from "../../data/ui-data/login-module-data.json";
import CommonUtils from "../../utils/common-util";
import { NewUserPage } from "../../pages/NewUserPage";

test.use({ storageState: "./authentication/.auth/auth3.json" });

test("Edit last order", { tag: ['@ui', '@smoke'] }, async ({ page,newLoginPage,newLandingPage}: any) => {
   await newLoginPage.gotoSiteLinkTwo();
   await page.locator('[data-test="nav-menu"]').click();
   await page.locator('[data-test="nav-admin-categories"]').click();

})