import { Locator, Page } from "@playwright/test";

export class NewSignupLoginPageAutomationExercise {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly fnameInput: Locator;
    readonly lnameInput: Locator;
    readonly adressInput: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly passwordInput: Locator;
    readonly emailInput: Locator;
    readonly loginButton: Locator;
    readonly signupButton: Locator;
    readonly createAccountButton: Locator;
    readonly consentCheckbox: Locator;
    readonly accountInformation: Locator;
    readonly loginLandingPage: Locator;
    readonly emailLoginInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.consentCheckbox = page.getByRole('button', { name: 'Consent' })
        this.nameInput = page.getByRole('textbox', { name: 'Name' })
        this.fnameInput = page.getByRole('textbox', { name: 'First Name' })
        this.lnameInput = page.getByRole('textbox', { name: 'Last Name' })
        this.adressInput = page.getByRole('textbox', { name: 'Address * (Street address, P.' })
        this.stateInput = page.getByRole('textbox', { name: 'State' })
        this.cityInput = page.getByRole('textbox', { name: 'City' })
        this.zipcodeInput = page.locator('#zipcode')
        this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.emailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
        this.emailLoginInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address')
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
        this.accountInformation = page.getByText('Enter Account Information')
        this.loginLandingPage = page.getByRole('heading', { name: 'Full-Fledged practice website' })

    }
    /**
     * URL to site
     */
    async gotoNewSiteLink() {

        await this.page.goto(`${process.env.AUTOMATION_EXERCISE_BASE_URL}/login`);
    }
    /**  Login to site parameters
    *    @param userName    
    *    @param email
    */
    async newSignupSite(userName: string, email: string) {

        await this.nameInput.fill(userName);
        await this.emailInput.fill(email);
        await this.signupButton.click();
    }

    async newLoginSite(email: string, password: string) {

        await this.emailLoginInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async createAccount(fname: string, lname: string, password: string, address: string, state: string, city: string, zipcode: string, mobileNumber: string) {

        await this.fnameInput.fill(fname);
        await this.lnameInput.fill(lname);
        await this.passwordInput.fill(password);
        await this.adressInput.fill(address);
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipcodeInput.fill(zipcode);
        await this.mobileNumberInput.fill(mobileNumber);
        await this.createAccountButton.click();
    }


}