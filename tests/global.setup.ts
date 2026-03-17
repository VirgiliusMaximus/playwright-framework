import { expect } from "@playwright/test";
import { test } from "../fixtures/common-fixture";

test("Global setup for auto login", async ({ page, loginPage, commonUtils, dashboardPage }) => {
    const decrepteU = commonUtils.decryptData(process.env.USER_NAME!);
    const decreptedP = commonUtils.decryptData(process.env.PASSWORD!);
    await loginPage.gotoSiteLink();
    await loginPage.loginSite(decrepteU, decreptedP);
    await page.waitForURL(process.env.BASE_URL + 'web/index.php/dashboard/index');
    await expect(dashboardPage.landingPage).toHaveText('Dashboard');
    await page.context().storageState({path: "./authentication/.auth/auth.json"});
    })