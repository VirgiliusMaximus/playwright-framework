import { test, expect } from "../../fixtures/hooks-fixture";
import { Dialog } from "@playwright/test";
import loginData from "../../data/ui-data/signup-module-data.json";
import CommonUtils from "../../utils/common-util";


test.skip("Sign up new user.Skipped, need only once ", { tag: ['@ui', '@smoke'] }, async ({ page, newSignupLoginPage, commonUtils,}: any) => {
    const decriptedPassword = commonUtils.decryptData(process.env.AUTOMATION_EXERCISE_PASSWORD!);
    const decriptedEmail = commonUtils.decryptData(process.env.AUTOMATION_EXERCISE_EMAIL!);
    await newSignupLoginPage.gotoNewSiteLink();
    page.on('dialog', (dialog: Dialog) => dialog.accept());
    await newSignupLoginPage.consentCheckbox.click();
    await newSignupLoginPage.newSignupSite(loginData.name, decriptedEmail);
    await expect(newSignupLoginPage.accountInformation).toBeVisible();
    await newSignupLoginPage.createAccount(loginData.first_name, loginData.last_name, decriptedPassword, loginData.adress, loginData.state, loginData.city, loginData.zip_code, loginData.mobile_number);

})
