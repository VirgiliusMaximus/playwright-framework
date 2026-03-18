import { Locator, Page } from "@playwright/test";

export class PimPage {
    readonly page: Page;
    readonly addPimButton: Locator;
    readonly firstNameText: Locator;
    readonly middleNameText: Locator;
    readonly lastnameText: Locator;
    readonly saveButton: Locator;
    readonly newEmployeeName: Locator;


    constructor(page: Page) {
        this.page = page;
        this.addPimButton = page.getByRole('button', { name: ' Add' });
        this.firstNameText = page.getByRole('textbox', { name: 'First Name' });
        this.middleNameText = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastnameText = page.getByRole('textbox', { name: 'Last Name' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.newEmployeeName = page.locator(".orangehrm-edit-employee-name");
    }
/**
 * Add new employee
 * @param firstName 
 * @param middleName 
 * @param lastname 
 */
     async addEmployee(firstName: string,middleName: string,lastname: string) {
        await this.addPimButton.click();
        await this.firstNameText.fill(firstName);
        await this.middleNameText.fill(middleName);
        await this.lastnameText.fill(lastname);
        await this.saveButton.click();
         
     }

}