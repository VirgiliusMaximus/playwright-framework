import { Locator, Page } from "@playwright/test";

export class NewLoginPage {
    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly invalidCredentialsErorr : Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-submit"]');
        this.invalidCredentialsErorr = page.getByText('Invalid email or password');
    
    }
    /**
     * URL to site
     */
    async gotoSiteLinkTwo() {

        await this.page.goto(`${process.env.PRODUCTION_BASE_URL}/auth/login`);
    }
    /**  Login to site parameters
    *    @param userName
    *    @param password
    */
    async loginSiteTwo(userName: string, password: string) {

        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password)
        await this.loginButton.click();
    }



}