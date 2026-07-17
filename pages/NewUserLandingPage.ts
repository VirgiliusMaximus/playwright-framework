import { Locator, Page } from "@playwright/test";

export class NewUserLandingPage {
    readonly page: Page;
    readonly landingPageAutomationExercise: Locator;
   

    constructor(page: Page) {
        this.page = page;
        this.landingPageAutomationExercise = page.getByText('Logged in as FaneGatu')
    }
    


}