import { test, expect } from "../../fixtures/hooks-fixture";
import employeeNmaes from "../../data/ui-data/pim-module-data.json";



test("Add new employee under PIM module site 1", { tag: ['@ui'] }, async ({ gotoUrl, leftNavigationPage, pimPage }) => {
    test.setTimeout(200000);
    await test.step('Open PIM module', async () => {
        await leftNavigationPage.openPimModule();
    })
    await test.step('Add new employee and verify', async () => {
        await pimPage.addEmployee(employeeNmaes.first_name, employeeNmaes.middle_name, employeeNmaes.last_name);
        await expect(pimPage.newEmployeeName).toHaveText(`${employeeNmaes.first_name} ${employeeNmaes.last_name}`, { timeout: 150000 });

    })


})

