import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly invalidCredentialsErorr : Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidCredentialsErorr = page.getByText('Invalid credentials');
    
    }
    /**
     * URL to site
     */
    async gotoSiteLink() {

        await this.page.goto(`${process.env.BASE_URL}web/index.php/auth/login`);
    }
    /**  Login to site parameters
    *    @param userName
    *    @param password
    */
    async loginSite(userName: string, password: string) {

        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password)
        await this.loginButton.click();
    }



}