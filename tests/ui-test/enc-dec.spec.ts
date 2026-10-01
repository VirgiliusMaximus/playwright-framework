import { test, expect } from "../../fixtures/hooks-fixture";
import loginData from "../../data/ui-data/login-module-data.json"; //import name can be any name location matters
import CommonUtils from "../../utils/common-util";

test.skip("Encript Data", { tag: ['@util'] }, async ({ gotoUrl, loginPage, commonUtils, }) => {

    const commonUtilsObj = new CommonUtils();
    const encryptedData = commonUtilsObj.encryptData("postgres");
    console.log("Encrypted data: " + encryptedData);

    // const decryptedData = commonUtilsObj.decryptData(encryptedData);
    // console.log("Decrypted data: " + decryptedData);
    // SECRET_KEY= npx playwright test enc-dec.spec.ts --project=chromium
})