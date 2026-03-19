import { Locator, Page } from "@playwright/test";

export class LeftNavigationPage {
    readonly page: Page;
    readonly pimLink: Locator;
    readonly orangeHRMLogo: Locator;
    readonly leftSideNavi: Locator;    


    constructor(page: Page) {
        this.page = page;
        this.pimLink = page.getByRole('link', { name: 'PIM' });
        this.orangeHRMLogo = page.getByRole('link', { name: 'client brand banner' })
        this.leftSideNavi = page.locator('div.oxd-sidepanel-body')
    }
/**
 * Open PIM module
 */
    async openPimModule() {
        await this.pimLink.click();
    }

}