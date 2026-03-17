//import {test} from "../fixtures/pom-fixture"; //remove after creating fixture common-fixtures.ts
import { expect } from "@playwright/test";
import { test } from "../fixtures/hooks-fixture";
import { LoginPage } from "../pages/LoginPage";
import { beforeEach } from "node:test";
import { UserPage } from "../pages/UserPage";
// import CommonUtils from "../utils/common-util"; //remove after creating fixture common-fixtures.ts


// test.beforeEach("Login each time", async ({ loginPage }) => {
//     await loginPage.gotoSiteLink();

// });

// test.afterEach("Login each time", async ({ userPage }) => {
//     await userPage.logoutSite();

// });

test("Temp test 1", async ({ page, gotoUrl }) => {
    // console.log(process.env.BASE_URL);
    // console.log(process.env.USER_NAME);
    // console.log(process.env.PASSWORD);
    // await loginPage.gotoSiteLink();
    // await loginPage.loginSite('Admin', 'admin123');
    //Encode the user and pass one after another
    //const commonUtilsObj = new CommonUtils(); //remove after creating fixture common-fixtures.ts
    //commonUtilsObj.encryptData("Admin");
    //commonUtilsObj.encryptData("admin123");
    //const decrepteU = commonUtils.decryptData(process.env.USER_NAME!);
    //const decreptedP = commonUtils.decryptData(process.env.PASSWORD!);
    //await loginPage.gotoSiteLink();
    //await loginPage.loginSite(decrepteU, decreptedP);
    console.log(await page.title());

})

test("Login test 2 @smoke", async ({ page, gotoUrl, logout }) => {

    expect(page).toHaveTitle("OrangeHRM");




});