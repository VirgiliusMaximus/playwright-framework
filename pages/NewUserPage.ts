import { Locator, Page } from "@playwright/test";

export class NewUserPage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly usermenuButton: Locator;
    readonly landingPagePracticesoftwaretesting: Locator;



    constructor(page: Page) {
        this.page = page;
        this.usermenuButton = page.locator('[data-test="nav-menu"]');
        this.logoutButton = page.locator('[data-test="nav-sign-out"]');
        this.landingPagePracticesoftwaretesting = page.locator('[data-test="page-title"]');

    }

    async logoutPracticesoftwaretesting() {
        await this.usermenuButton.click();
        await this.logoutButton.click();
    }

}