import { Locator, Page } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly landingPage: Locator;
   

    constructor(page: Page) {
        this.page = page;
        this.landingPage = page.getByRole('heading', { name: 'Dashboard' });
    }
    


}