import { test, expect } from "../../fixtures/hooks-fixture";
import loginData from "../../data/ui-data/login-module-data.json";
import CommonUtils from "../../utils/common-util";

test("Login with incorrect username", { tag: ['@ui', '@smoke'] }, async ({ newSignupLoginPage, commonUtils,}: any) => {
    const decriptedPassword = commonUtils.decryptData(process.env.AUTOMATION_EXERCISE_PASSWORD!);
    await newSignupLoginPage.gotoNewSiteLink();
    await newSignupLoginPage.consentCheckbox.click();
    await newSignupLoginPage.newLoginSite(loginData.wrong_email_automationexercise, decriptedPassword);
    await expect(newSignupLoginPage.loginErrorText).toHaveText(loginData.invalid_credentials_automationexercise);
    await expect(newSignupLoginPage.loginErrorText).toBeVisible();
})
test("Login with incorrect password", { tag: ['@ui', '@smoke'] }, async ({ newSignupLoginPage, commonUtils,}: any) => {
    const decriptedEmail = commonUtils.decryptData(process.env.AUTOMATION_EXERCISE_EMAIL!);
    await newSignupLoginPage.gotoNewSiteLink();
    await newSignupLoginPage.consentCheckbox.click();
    await newSignupLoginPage.newLoginSite(decriptedEmail, loginData.wrong_password);
    await expect(newSignupLoginPage.loginErrorText).toHaveText(loginData.invalid_credentials_automationexercise);
    await expect(newSignupLoginPage.loginErrorText).toBeVisible();
})