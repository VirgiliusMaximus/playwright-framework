import cryptoJS from "crypto-js"; //import name can be any name location matters, or package in this case

export default class CommonUtils {

    private secretKey: string;
    /**
     * Initialize encription
     */
    constructor() {
        //this.secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";
        if (process.env.SECRET_KEY) {
            this.secretKey = process.env.SECRET_KEY
        } else {
            throw new Error("Please provide Secret Key for execution")
        }
    }
    /**
     * Provide encripted data
     * @param data 
     * @returns encryptedData
     */
    public encryptData(data: string) {

        const encryptedData = cryptoJS.AES.encrypt(data, this.secretKey).toString();
        //console.log(encryptedData);
        return encryptedData;

    }
    /**
     * Provide decripted data
     * @param encData 
     * @returns decryptedData
     */
    public decryptData(encData: string) {
        const decryptedData = cryptoJS.AES.decrypt(encData, this.secretKey).toString(cryptoJS.enc.Utf8);
        //console.log(decryptedData);
        return decryptedData;
    }

}