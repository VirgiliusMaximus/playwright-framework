import { test, expect } from "../../fixtures/hooks-fixture";
import { Dialog } from "@playwright/test";
import loginData from "../../data/ui-data/login-module-data.json";
import CommonUtils from "../../utils/common-util";

test("Login with incorrect username site3", { tag: ['@ui', '@smoke'] }, async ({ page,newLoginPage,newLandingPage, commonUtils}: any) => {
    const decriptedPassword = commonUtils.decryptData(process.env.PRODUCTION_PASSWORD!);
    await newLoginPage.gotoSiteLinkTwo();
    await newLoginPage.loginSiteTwo(loginData.site3login.wrong_email_site3, decriptedPassword);
    await expect(newLoginPage.invalidCredentialsErorr).toHaveText(loginData.site3login.invalid_credentials_site3_text);
    await expect(newLoginPage.invalidCredentialsErorr).toBeVisible();
})
test("Login with incorrect password site3", { tag: ['@ui', '@smoke'] }, async ({ page, newLoginPage,newLandingPage, commonUtils}: any) => {
    const decriptedEmail = commonUtils.decryptData(process.env.PRODUCTION_EMAIL!);
    await newLoginPage.gotoSiteLinkTwo();
    await newLoginPage.loginSiteTwo(decriptedEmail, loginData.site3login.wrong_password_site3);
    await expect(newLoginPage.invalidCredentialsErorr).toHaveText(loginData.site3login.invalid_credentials_site3_text);
    await expect(newLoginPage.invalidCredentialsErorr).toBeVisible();
})