import { Locator, Page } from "@playwright/test";

export class NewUserPage {
    readonly page: Page;
    readonly logoutButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByRole('link', { name: ' Logout' })

    }

    async logoutSiteAutomationExercise() {

        await this.logoutButton.click();
    }


}