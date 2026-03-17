import { test as baseTest } from "./pom-fixture"
import CommonUtils from "../utils/common-util"

type CommonFixtureType = {

    commonUtils: CommonUtils

}

export const test = baseTest.extend<CommonFixtureType>({

    commonUtils: async ({ }, use) => {

        await use(new CommonUtils());
    }


})