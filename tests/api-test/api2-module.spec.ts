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
    const responseObj = await request.get(restfulDevApiData.apiDevBaseUrl + apiDevPathData.collections_path + '/' + apiDevPathData.collections_name + '/' + apiDevPathData.objects_path);
    const jsonFormatObj: any = await responseObj.json();
    console.log(jsonFormatRsp);
    console.log(jsonFormatObj);
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
            type: 'Test Case link 8',
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

test('API testing POST/DELETE new collection', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 9',
            description: 'http://qmetry.com/testrail/link-to-test-case/9'
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
    console.log('The id of the new collection is: ' + idrsp);
    expect(responseIds.status()).toBe(200);
    expect(responseIds.statusText()).toBe('OK');
    expect(responseIds).toBeTruthy();
    expect(responseIds.headers()).toHaveProperty('content-type');
    expect(jsonFormatRsp).toMatchObject(restfulDevApiData.post_request);
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

test('API testing POST/PUT/PATCH new collection', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 10',
            description: 'http://qmetry.com/testrail/link-to-test-case/10'
        }
    ]

}, async ({ request, commonUtils }) => {

    const responseIds = await request.post(restfulDevApiData.apiDevBaseUrl + apiDevPathData.collections_path + '/' + apiDevPathData.collections_name + '/' + apiDevPathData.objects_path, {
        data: restfulDevApiData.post_request_2

    });
    const jsonFormatRsp: any = await responseIds.json();
    const idrsp = jsonFormatRsp.id;
    //console.log('The id of the new collection is: ' + idrsp);
    expect(responseIds.status()).toBe(200);
    expect(responseIds.statusText()).toBe('OK');
    expect(responseIds).toBeTruthy();
    expect(responseIds.headers()).toHaveProperty('content-type');
    expect(jsonFormatRsp).toMatchObject(restfulDevApiData.post_request_2);
    const putIds = await request.put(restfulDevApiData.apiDevBaseUrl + apiDevPathData.collections_path + '/' + apiDevPathData.collections_name + '/' + apiDevPathData.objects_path + '/' + idrsp, {
        data: restfulDevApiData.put_request
    });
    expect(putIds.status()).toBe(200);
    expect(putIds.statusText()).toBe('OK');
    expect(putIds).toBeTruthy();
    expect(putIds.headers()).toHaveProperty('content-type');
    expect(putIds.headers()['content-type']).toBe(restfulDevApiData.contentTypeRsp);
    const putResponse: any = await putIds.json();
    expect(putResponse.data).toHaveProperty('put-new');
    expect(putResponse).toMatchObject(restfulDevApiData.put_request);
    const patchIds = await request.patch(restfulDevApiData.apiDevBaseUrl + apiDevPathData.collections_path + '/' + apiDevPathData.collections_name + '/' + apiDevPathData.objects_path + '/' + idrsp, {
        data: restfulDevApiData.patch_request
    });
    expect(patchIds.status()).toBe(200);
    expect(patchIds.statusText()).toBe('OK');
    expect(patchIds).toBeTruthy();
    expect(patchIds.headers()).toHaveProperty('content-type');
    expect(patchIds.headers()['content-type']).toBe(restfulDevApiData.contentTypeRsp);
    const patchResponse: any = await patchIds.json();
    expect(patchResponse).toHaveProperty('name');
    expect(patchResponse).toMatchObject(restfulDevApiData.patch_request);
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

test('API testing GET public objects ', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 11',
            description: 'http://qmetry.com/testrail/link-to-test-case/11'
        }
    ]

}, async ({ request }) => {
    const responseIds = await request.get(restfulDevApiData.apiDevBaseUrl + apiDevPathData.objects_path);
    const jsonFormatRsp: any = await responseIds.json();
    expect(responseIds.status()).toBe(200);
    expect(responseIds.statusText()).toBe('OK');
    expect(responseIds).toBeTruthy();
    expect(responseIds.headers()).toHaveProperty('content-type');
    expect(responseIds.headers()['content-type']).toBe(restfulDevApiData.contentTypeRsp);

});

test('API testing POST/PUT/PATCH public objects ', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 12',
            description: 'http://qmetry.com/testrail/link-to-test-case/12'
        }
    ]

}, async ({ request }) => {
    const responseIds = await request.post(restfulDevApiData.apiDevBaseUrl + apiDevPathData.objects_path, {
        data: JSON.stringify(restfulDevApiData.post_request_2),
    });
    const jsonFormatRsp: any = await responseIds.json();
    const idrsp2 = jsonFormatRsp.id;
    expect(responseIds.status()).toBe(200);
    expect(responseIds.statusText()).toBe('OK');
    expect(responseIds).toBeTruthy();
    expect(responseIds.headers()).toHaveProperty('content-type');
    expect(responseIds.headers()['content-type']).toBe(restfulDevApiData.contentTypeRsp);
    expect(jsonFormatRsp).toHaveProperty('id');
    expect(jsonFormatRsp).toMatchObject(restfulDevApiData.post_request_2);

    const responseIds2 = await request.put(restfulDevApiData.apiDevBaseUrl + apiDevPathData.objects_path + '/' + idrsp2, {
        data: JSON.stringify(restfulDevApiData.put_request),
    });
    const jsonFormatRsp2: any = await responseIds2.json();
    expect(responseIds2.status()).toBe(200);
    expect(responseIds2.statusText()).toBe('OK');
    expect(responseIds2).toBeTruthy();
    expect(responseIds2.headers()).toHaveProperty('content-type');
    expect(responseIds2.headers()['content-type']).toBe(restfulDevApiData.contentTypeRsp);
    expect(jsonFormatRsp2).toHaveProperty('id');
    expect(jsonFormatRsp2).toHaveProperty('data');
    expect(jsonFormatRsp2.data).toHaveProperty('put-new');
    expect(jsonFormatRsp2).toMatchObject(restfulDevApiData.put_request);

    const responseIds3 = await request.patch(restfulDevApiData.apiDevBaseUrl + apiDevPathData.objects_path + '/' + idrsp2, {
        data: JSON.stringify(restfulDevApiData.patch_request),
    });
    const jsonFormatRsp3: any = await responseIds3.json();
    expect(responseIds3.status()).toBe(200);
    expect(responseIds3.statusText()).toBe('OK');
    expect(responseIds3).toBeTruthy();
    expect(responseIds3.headers()).toHaveProperty('content-type');
    expect(responseIds3.headers()['content-type']).toBe(restfulDevApiData.contentTypeRsp);
    expect(jsonFormatRsp3).toHaveProperty('name');
    expect(jsonFormatRsp3).toMatchObject(restfulDevApiData.patch_request);

    const allData = await request.get(restfulDevApiData.apiDevBaseUrl + apiDevPathData.objects_path + '/' + idrsp2);
    const jsonFormatData: any = await allData.json();
    console.log('After Put/Patch Data: :' + JSON.stringify(jsonFormatData));

});

