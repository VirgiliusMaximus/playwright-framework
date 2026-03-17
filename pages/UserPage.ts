import { Locator, Page } from "@playwright/test";

export class UserPage {
    readonly page: Page;
    readonly usermenuButton: Locator;
    readonly logoutButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.usermenuButton = page.locator('.oxd-userdropdown-tab');
        this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });

    }

    async logoutSite() {

        await this.usermenuButton.click();
        await this.logoutButton.click();
    }


}