import { Locator, Page } from "@playwright/test";

export class LeftNavigationPage {
    readonly page: Page;
    readonly pimLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.pimLink = page.getByRole('link', { name: 'PIM' });
    }
/**
 * Open PIM module
 */
    async openPimModule() {
        await this.pimLink.click();
    }

}