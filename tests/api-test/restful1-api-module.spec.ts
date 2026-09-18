import { test, expect } from '../../fixtures/hooks-fixture';
import apiPathData from '../../data/api-data/api-path-data.json';
import restfulBookerApiData from '../../data/api-data/restful-booker-api-data.json';

var bookingIdPost: number = 7;


test('Restful Booker API - verify if user is able to fetch booking IDs', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 1',
            description: 'http://qmetry.com/testrail/link-to-test-case/1'
        }
    ]

}, async ({ request }) => {
    const responseIds = await request.get(apiPathData.booking_path);
    const jsonFormatRsp: any = await responseIds.json();
    console.log(jsonFormatRsp);
    expect(responseIds.status()).toBe(200);
    expect(responseIds.statusText()).toBe('OK');
    expect(responseIds).toBeTruthy();
    expect(responseIds.headers()).toHaveProperty('content-type');
    expect(responseIds.headers()['content-type']).toBe(restfulBookerApiData.contentType);

});

test('Restful Booker API(INTENTIONAL FAIL TC)- compare first name', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 2',
            description: 'http://qmetry.com/testrail/link-to-test-case/2'
        }
    ]

}, async ({ request }) => {
    const randomBookingId = Math.floor(Math.random() * 20) + 1
    const bookingID = await request.get(`${apiPathData.booking_path}/${randomBookingId}`);
    const jsonBookingRsp: any = await bookingID.json();
    //console.log(jsonBookingRsp);
    expect(bookingID.status()).toBe(200);
    expect(bookingID.statusText()).toBe('OK');
    expect(bookingID).toBeTruthy();
    expect(bookingID.headers()).toHaveProperty('content-type');
    expect(bookingID.headers()['content-type']).toBe(restfulBookerApiData.contentType);
    expect(jsonBookingRsp).toHaveProperty('firstname');
    expect(jsonBookingRsp.firstname).toBe(restfulBookerApiData.firstName); //intentional fail for firstName from data

});

test('Restful Booker API POST - verify if user is able to POST', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 3',
            description: 'http://qmetry.com/testrail/link-to-test-case/3'
        }
    ]

}, async ({ request }) => {
    const creteBookingReq = await request.post(apiPathData.booking_path, {
        data: restfulBookerApiData.createBookingPayLoad
    });
    const jsonCreateBookingRsp: any = await creteBookingReq.json();
    expect(creteBookingReq.status()).toBe(200);
    expect(creteBookingReq.statusText()).toBe('OK');
    expect(creteBookingReq).toBeTruthy();
    bookingIdPost = jsonCreateBookingRsp.bookingid;
    //console.log(`Booking ID created is : ${bookingIdPost}`);
    expect(creteBookingReq.headers()).toHaveProperty('content-type');
    expect(creteBookingReq.headers()['content-type']).toBe(restfulBookerApiData.contentType);
    expect(jsonCreateBookingRsp).toHaveProperty('bookingid');
    expect(jsonCreateBookingRsp.bookingid).toBeTruthy();

    expect(jsonCreateBookingRsp).toHaveProperty('booking');
    expect(jsonCreateBookingRsp.booking).toMatchObject(restfulBookerApiData.createBookingPayLoad);
    //console.log(jsonCreateBookingRsp);
});

test('Restful Booker API PUT- verify if user is able to PUT', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 4',
            description: 'http://qmetry.com/testrail/link-to-test-case/4'
        }
    ]

}, async ({ request }) => {
    //console.log(`Put1 ID is : ${bookingIdPost}`);
    const updateBookingReq = await request.put(`${apiPathData.booking_path}/${bookingIdPost}`, {
        data: restfulBookerApiData.updateBookingPayLoad,
        // headers: {
        //    Authorization : "Basic YWRtaW46cGFzc3dvcmQxMjM=" Can be putet here or in playwright.config.ts file as global header
        // }
    });
    //console.log(`Put1 request is : ${updateBookingReq}`);

    const jsonUpdateBookingRsp: any = await updateBookingReq.json();
    expect(updateBookingReq.status()).toBe(200);
    expect(updateBookingReq.statusText()).toBe('OK');
    expect(updateBookingReq).toBeTruthy();
    expect(updateBookingReq.headers()).toHaveProperty('content-type');
    expect(updateBookingReq.headers()['content-type']).toBe(restfulBookerApiData.contentType);
    expect(jsonUpdateBookingRsp).toMatchObject(restfulBookerApiData.updateBookingPayLoad);
    //console.log(jsonUpdateBookingRsp);
});

test('Restful Booker API PUT - verify if user is able to PUT with token', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 4-1',
            description: 'http://qmetry.com/testrail/link-to-test-case/4-1'
        }
    ]

}, async ({ request, commonApiUtils }) => {
    //console.log(`Put2 ID is : ${bookingIdPost}`);
    const updateBookingReq = await request.put(`${apiPathData.booking_path}/${bookingIdPost}`, {
        data: restfulBookerApiData.updateBookingPayLoad2,
        headers: {
            Cookie: `token=${await commonApiUtils.createToken()}`
        }
    });
    //console.log(`Put2 request is : ${updateBookingReq}`);
    const jsonUpdateBookingRsp = await updateBookingReq.json();
    //console.log(jsonUpdateBookingRsp);
    expect(updateBookingReq.status()).toBe(200);
    expect(jsonUpdateBookingRsp).toMatchObject(restfulBookerApiData.updateBookingPayLoad2);

});

test('Restful Booker API PATCH - verify if user is able to PATCH with token', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 5',
            description: 'http://qmetry.com/testrail/link-to-test-case/5'
        }
    ]

}, async ({ request, commonApiUtils }) => {
    //console.log(`Patch ID is : ${bookingIdPost}`);
    const patchBookingReq = await request.patch(`${apiPathData.booking_path}/${bookingIdPost}`, {
        data: restfulBookerApiData.patchBookingPayLoad,
        headers: {
            Cookie: `token=${await commonApiUtils.createToken()}`
        }
    });
    //console.log(`Patch request is : ${patchBookingReq}`);
    const jsonPatchBookingRsp = await patchBookingReq.json();
    //console.log(jsonPatchBookingRsp);
    expect(patchBookingReq.status()).toBe(200);
    expect(jsonPatchBookingRsp).toMatchObject(restfulBookerApiData.patchBookingPayLoad);

});

test('Restful Booker API DELETE - verify if user is able to DELETE with token', {
    tag: ['@API', '@UAT'],
    annotation: [
        {
            type: 'Test Case link 6',
            description: 'http://qmetry.com/testrail/link-to-test-case/6'
        }
    ]

}, async ({ request, commonApiUtils }) => {
    const randomBookingId = Math.floor(Math.random() * 10) + 1; // Generate a random booking ID between 1 and 115
    const deleteBookingReq = await request.delete(`${apiPathData.booking_path}/${randomBookingId}`, {
        headers: {
            Cookie: `token=${await commonApiUtils.createToken()}`
        }
    });
    expect(deleteBookingReq.status()).toBe(201);
    expect(deleteBookingReq.statusText()).toBe('Created');
    expect(deleteBookingReq).toBeTruthy();
    expect(deleteBookingReq.headers()).toHaveProperty('content-type');
    const getBookingReq = await request.get(`${apiPathData.booking_path}/${randomBookingId}`);
    expect(getBookingReq.status()).toBe(404);
    expect(getBookingReq.statusText()).toBe('Not Found');
});