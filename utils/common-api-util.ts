import { APIRequestContext } from "@playwright/test";
import apiPathData from "../data/api-data/api-path-data.json";
import CommonUtils from "./common-util";

export default class CommonApiUtils {

    private request: APIRequestContext;
    /**
     * Initialize encription
     */
    constructor(request : APIRequestContext) {
        this.request = request;          
    }
    /**
     */
    public async createToken(){
        const commonUtilObj = new CommonUtils();
        const tokenReq = await this.request.post(apiPathData.auth_path,{
            data: {
                username: commonUtilObj.decryptData(process.env.API_USER_NAME!),
                password: commonUtilObj.decryptData(process.env.API_PASSWORD!)
            }
        });
        const tokenJson = await tokenReq.json();
        return tokenJson.token;
    }
}