import { test, expect } from "../fixtures/hooks-fixture";
import loginData from "../data/login-module-data.json"; //import name can be any name location matters

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
})

test("Verify user cannot login with invalid pass ", { tag: ['@ui', '@smoke'] }, async ({ gotoUrl, loginPage, commonUtils, }) => {
    test.slow();
    const username = commonUtils.decryptData(process.env.USER_NAME!);
    await loginPage.loginSite(username, loginData.wrong_password);
    await expect(loginPage.invalidCredentialsErorr).toHaveText(loginData.invalid_credentials_text, { timeout: 90000 });
    await expect(loginPage.userNameInput).toBeVisible();

})

test("Verify user cannot login with invalid user ", {
    tag: ['@ui', '@regression'],
    annotation: {
        type: 'Link to the TC form Azure or other platform',
        description: 'https://dev.azure.com/ngro/BATS/_workitems/edit/31053/'
    }
}, async ({ gotoUrl, loginPage, commonUtils, }) => {
    test.slow();
    const password = commonUtils.decryptData(process.env.PASSWORD!);
    await loginPage.loginSite(loginData.wrong_user, password);
    await expect(loginPage.invalidCredentialsErorr).toHaveText(loginData.invalid_credentials_text, { timeout: 90000 });
    await expect(loginPage.userNameInput).toBeVisible();

})
test("Verify user cannot login with both invalid user and pass ", { tag: ['@ui'] }, async ({ gotoUrl, loginPage, commonUtils, }) => {
    test.slow();
    await loginPage.loginSite(loginData.wrong_user, loginData.wrong_password);
    await expect(loginPage.invalidCredentialsErorr).toHaveText(loginData.invalid_credentials_text, { timeout: 90000 });
    await expect(loginPage.userNameInput).toBeVisible();

})