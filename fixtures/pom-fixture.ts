import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { UserPage } from "../pages/UserPage";
import { LeftNavigationPage } from "../pages/LeftNavigationPage.ts";
import { PimPage } from "../pages/PimPage.ts";
import { NewSignupLoginPageAutomationExercise } from "../pages/NewSignupLoginPageAutomationExercise.ts";
import { NewUserLandingPage } from "../pages/NewUserLandingPage.ts";

type PomFixtureType = {

    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    userPage: UserPage;
    leftNavigationPage: LeftNavigationPage;
    pimPage: PimPage;
    newSignupLoginPage: NewSignupLoginPageAutomationExercise;
    newUserLandingPage: NewUserLandingPage;
}
export const test = baseTest.extend<PomFixtureType>({

    loginPage: async ({ page }, use) => {

        const loginPageObj = new LoginPage(page); // use(new LoginPage(page));
        await use(loginPageObj);
    },

    dashboardPage: async ({ page }, use) => {

        await use(new DashboardPage(page));

    },

    userPage: async ({ page }, use) => {

        await use(new UserPage(page));

    },

    leftNavigationPage: async ({ page }, use) => {

        await use(new LeftNavigationPage(page));


    },
    pimPage: async ({ page }, use) => {

        await use(new PimPage(page));


    },
    newSignupLoginPage: async ({ page }, use) => {

        await use(new NewSignupLoginPageAutomationExercise(page));

    },
    newUserLandingPage: async ({ page }, use) => {

        await use(new NewUserLandingPage(page));

    }

})


