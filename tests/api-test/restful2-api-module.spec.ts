import { test, expect } from '../../fixtures/hooks-fixture';
import apiDevPathData from '../../data/api-data/api-dev-path-data.json';
import restfulDevApiData from '../../data/api-data/restful-dev-api-data.json';


test('API testing GET collection ', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 7',
            description: 'http://qmetry.com/testrail/link-to-test-case/7'
        }
    ]

}, async ({ request }) => {
    const responseIds = await request.get(restfulDevApiData.apiDevBaseUrl + apiDevPathData.collections_path);
    const jsonFormatRsp: any = await responseIds.json();
    //console.log(jsonFormatRsp);
    expect(responseIds.status()).toBe(200);
    expect(responseIds.statusText()).toBe('OK');
    expect(responseIds).toBeTruthy();
    expect(responseIds.headers()).toHaveProperty('content-type');
    expect(responseIds.headers()['content-type']).toBe(restfulDevApiData.contentTypeRsp);

});


test('API testing POST Login data', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 7',
            description: 'http://qmetry.com/testrail/link-to-test-case/8'
        }
    ]

}, async ({ request, commonUtils }) => {
    const password = commonUtils.decryptData(process.env.API_PROD_PASSWORD!);
    const email = commonUtils.decryptData(process.env.API_PROD_EMAIL!);
    const responseIds = await request.post(restfulDevApiData.apiDevBaseUrl + apiDevPathData.login_path, {
        data: {
            email: email,
            password: password,

        }
    });
    const jsonFormatRsp: any = await responseIds.json();
    const token = jsonFormatRsp.token;
    expect(responseIds.status()).toBe(200);
    expect(responseIds.statusText()).toBe('OK');
    expect(responseIds).toBeTruthy();
    expect(responseIds.headers()).toHaveProperty('content-type');
    expect(jsonFormatRsp).toMatchObject(restfulDevApiData.login_rsp);
    expect(jsonFormatRsp).toHaveProperty('token');
    expect(jsonFormatRsp.token).toBe(token);

});

test('API testing POST new collection', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 7',
            description: 'http://qmetry.com/testrail/link-to-test-case/8'
        }
    ]

}, async ({ request, commonUtils }) => {

    const responseIds = await request.post(restfulDevApiData.apiDevBaseUrl + apiDevPathData.collections_path + '/' + apiDevPathData.collections_name + '/' + apiDevPathData.objects_path, {
        data: {
            "name": "Laptop Dell XPS 15",
            "data": {
                "year": 2026,
                "price": 2500,
                "CPU model": "Intel Core i9",
                "Hard disk size": "2 TB"
            }
        }

    });
    const jsonFormatRsp: any = await responseIds.json();
    const idrsp = jsonFormatRsp.id;
    //console.log('The id of the new collection is: ' + idrsp);
    expect(responseIds.status()).toBe(200);
    expect(responseIds.statusText()).toBe('OK');
    expect(responseIds).toBeTruthy();
    expect(responseIds.headers()).toHaveProperty('content-type');
    expect(jsonFormatRsp).toMatchObject(restfulDevApiData.post_response);
    const deleteIds = await request.delete(restfulDevApiData.apiDevBaseUrl + apiDevPathData.collections_path + '/' + apiDevPathData.collections_name + '/' + apiDevPathData.objects_path + '/' + idrsp, {

    });
    expect(deleteIds.status()).toBe(200);
    expect(deleteIds.statusText()).toBe('OK');
    expect(deleteIds).toBeTruthy();
    expect(deleteIds.headers()).toHaveProperty('content-type');
    expect(deleteIds.headers()['content-type']).toBe(restfulDevApiData.contentTypeRsp);
    const deleteResponse: any = await deleteIds.json();
    expect(deleteResponse).toHaveProperty('message');
    expect(deleteResponse.message).toBe('Object with id = ' + idrsp + ' has been deleted.');


});