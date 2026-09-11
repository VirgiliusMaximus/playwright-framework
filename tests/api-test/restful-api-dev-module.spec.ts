import {test,expect} from '../../fixtures/hooks-fixture';
import apiDevPathData from '../../data/api-data/api-dev-path-data.json';
import restfulDevApiData from '../../data/api-data/restful-dev-api-data.json';


test('API testing GET collection ', { 
    tag: ['@API','@UAT'],
    annotation: [
        {
            type: 'Test Case link 7',
            description: 'http://qmetry.com/testrail/link-to-test-case/7'
        }
    ] 

}, async ({request}) => {
    const responseIds = await request.get(restfulDevApiData.apiDevBaseUrl + apiDevPathData.collections_path);
    const jsonFormatRsp: any = await responseIds.json();
        console.log(jsonFormatRsp);
        expect(responseIds.status()).toBe(200);
        expect(responseIds.statusText()).toBe('OK');
        expect(responseIds).toBeTruthy();
        expect(responseIds.headers()).toHaveProperty('content-type');
        expect(responseIds.headers()['content-type']).toBe(restfulDevApiData.contentTypeRsp);

});

