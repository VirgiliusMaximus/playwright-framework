import { test as baseTest } from "./pom-fixture"
import CommonUtils from "../utils/common-util";
import CommonApiUtils from "../utils/commonApiUtil";


type CommonFixtureType = {

    commonUtils: CommonUtils,
    commonApiUtils: CommonApiUtils

}

export const test = baseTest.extend<CommonFixtureType>({

    commonUtils: async ({ }, use) => {

        await use(new CommonUtils());
    },
    commonApiUtils: async ({ request }, use) => {

        await use(new CommonApiUtils(request));
    }


})