import { expect } from "@playwright/test";
import { test } from "../../fixtures/common-fixture";
import dotenv from "dotenv";

test("Global setup for auto login OrangeHRM site", { tag: ['@ui'] }, async ({ page, loginPage, commonUtils, dashboardPage }) => {
    test.setTimeout(90000);
    const decrepteU = commonUtils.decryptData(process.env.USER_NAME!);
    const decreptedP = commonUtils.decryptData(process.env.PASSWORD!);
    await loginPage.gotoSiteLink();
    await loginPage.loginSite(decrepteU, decreptedP);
    await page.waitForURL(process.env.BASE_URL + 'web/index.php/dashboard/index');
    await expect(dashboardPage.landingPage).toHaveText('Dashboard');
    await page.context().storageState({ path: "./authentication/.auth/auth.json" });
})

test("Global setup for auto login AutomationExercise site", { tag: ['@ui'] }, async ({ page, newSignupLoginPage, commonUtils,newUserLandingPage }) => {
    test.setTimeout(60000);
    const decriptedPassword = commonUtils.decryptData(process.env.AUTOMATION_EXERCISE_PASSWORD!);
    const decriptedEmail = commonUtils.decryptData(process.env.AUTOMATION_EXERCISE_EMAIL!);
    await newSignupLoginPage.gotoNewSiteLink();
    await newSignupLoginPage.consentCheckbox.click();
    await newSignupLoginPage.newLoginSite(decriptedEmail, decriptedPassword);
    await expect(newUserLandingPage.landingPageAutomationExercise).toHaveText('Logged in as FaneGatu');
    await page.context().storageState({ path: "./authentication/.auth/auth2.json" });

})