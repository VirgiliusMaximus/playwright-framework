import { test, expect } from "../fixtures/hooks-fixture";
import loginData from "../data/login-module-data.json"; //import name can be any name location matters


test("Visual test for logo and left side menu ", { tag: ['@ui'] }, async ({ gotoUrl, loginPage, commonUtils,leftNavigationPage }) => {
    test.slow();
//const username = commonUtils.decryptData(process.env.USER_NAME!);
//const password = commonUtils.decryptData(process.env.PASSWORD!);
//await loginPage.loginSite(username, password);
await expect(leftNavigationPage.orangeHRMLogo).toHaveScreenshot('OrangeHRMLogo.png');
await expect(leftNavigationPage.leftSideNavi).toHaveScreenshot('LeftNavMenu.png');
})

