import {test,expect} from '../../fixtures/hooks-fixture';
import apiPathData from '../../data/api-data/api-path-data.json';
import restfulBookerApiData from '../../data/api-data/restful-booker-api-data.json';


// test('Retful Booker API Module', async ({request}) => {
//    const bookingIDS = await request.get('booking');
//     console.log(await bookingIDS.json());

// });

// test('Retful Booker API Module - get Booking IDs', async ({request}) => {
    
//     const booking1 = await request.get('booking/2');
//      console.log(await booking1.json());
// });

test('Restful Booker API Module 1 - verify if user is able to fetch booking IDs', { 
    tag: ['@API','@UAT'],
    annotation: [
        {
            type: 'Test Case link 1',
            description: 'http://qmetry.com/testrail/link-to-test-case/1'
        }
    ] 

}, async ({request}) => {
    const responseIds = await request.get(apiPathData.booking_path);
    const jsonFormatRsp: any = await responseIds.json();
        console.log(jsonFormatRsp);
        expect(responseIds.status()).toBe(200);
        expect(responseIds.statusText()).toBe('OK');
        expect(responseIds).toBeTruthy();
        expect(responseIds.headers()).toHaveProperty('content-type');
        expect(responseIds.headers()['content-type']).toBe(restfulBookerApiData.contentType);

});

test('Restful Booker API Module 2- verify if user is able to fetch booking IDs 2', { 
    tag: ['@API','@UAT'],
    annotation: [
        {
            type: 'Test Case link 2',
            description: 'http://qmetry.com/testrail/link-to-test-case/2'
        }
    ] 

}, async ({request}) => {
    const bookingID = await request.get(`${apiPathData.booking_path}/22`);
    const jsonBookingRsp: any = await bookingID.json();
        console.log(jsonBookingRsp);
        expect(bookingID.status()).toBe(200);
        expect(bookingID.statusText()).toBe('OK');
        expect(bookingID).toBeTruthy();
        expect(bookingID.headers()).toHaveProperty('content-type');
        expect(bookingID.headers()['content-type']).toBe(restfulBookerApiData.contentType);
        expect(jsonBookingRsp).toHaveProperty('firstname');
        expect(jsonBookingRsp.firstname).toBe(restfulBookerApiData.firstName); //intentional fail for firstName from data

});

test('Restful Booker API Module 3- verify if user is able to POST(create)', { 
    tag: ['@API','@UAT'],
    annotation: [
        {
            type: 'Test Case link 3',
            description: 'http://qmetry.com/testrail/link-to-test-case/22'
        }
    ] 

}, async ({request}) => {
   const creteBookingReq= await request.post(apiPathData.booking_path,{
        data: restfulBookerApiData.createBookingPayLoad
    });
    const jsonCreateBookingRsp: any = await creteBookingReq.json();
    expect(creteBookingReq.status()).toBe(200);
    expect(creteBookingReq.statusText()).toBe('OK');
    expect(creteBookingReq).toBeTruthy();
    expect(creteBookingReq.headers()).toHaveProperty('content-type');
    expect(creteBookingReq.headers()['content-type']).toBe(restfulBookerApiData.contentType);
    expect(jsonCreateBookingRsp).toHaveProperty('bookingid');
    expect(jsonCreateBookingRsp.bookingid).toBeTruthy();
    expect(jsonCreateBookingRsp).toHaveProperty('booking');
    expect(jsonCreateBookingRsp.booking).toMatchObject(restfulBookerApiData.createBookingPayLoad);
    console.log(jsonCreateBookingRsp);
});

test('Restful Booker API Module 4- verify if user is able to PUT(update)', { 
    tag: ['@API','@UAT'],
    annotation: [
        {
            type: 'Test Case link 4',
            description: 'http://qmetry.com/testrail/link-to-test-case/4'
        }
    ] 

}, async ({request}) => {
   const updateBookingReq = await request.put(`${apiPathData.booking_path}/29`,{
        data: restfulBookerApiData.updateBookingPayLoad,
        // headers: {
        //    Authorization : "Basic YWRtaW46cGFzc3dvcmQxMjM=" Can be putet here or in playwright.config.ts file as global header
        // }
    });
    const jsonUpdateBookingRsp: any = await updateBookingReq.json();
    expect(updateBookingReq.status()).toBe(200);
    expect(updateBookingReq.statusText()).toBe('OK');
    expect(updateBookingReq).toBeTruthy();
    expect(updateBookingReq.headers()).toHaveProperty('content-type');
    expect(updateBookingReq.headers()['content-type']).toBe(restfulBookerApiData.contentType);
    expect(jsonUpdateBookingRsp).toMatchObject(restfulBookerApiData.updateBookingPayLoad);
    console.log(jsonUpdateBookingRsp);
});

test('Restful Booker API Module 4-1- verify if user is able to PUT(update) with token', { 
    tag: ['@API','@UAT'],
    annotation: [
        {
            type: 'Test Case link 4-1',
            description: 'http://qmetry.com/testrail/link-to-test-case/4-1'
        }
    ] 

}, async ({request, commonApiUtils}) => {
   const updateBookingReq = await request.put(`${apiPathData.booking_path}/29`,{
        data: restfulBookerApiData.updateBookingPayLoad,
        headers: {
            Cookie : `token=${await commonApiUtils.createToken()}`
         }
    });
    const jsonUpdateBookingRsp = await updateBookingReq.json();
    console.log(jsonUpdateBookingRsp);
    expect(updateBookingReq.status()).toBe(200);
    expect(jsonUpdateBookingRsp).toMatchObject(restfulBookerApiData.updateBookingPayLoad);
   
});

test('Restful Booker API Module 5- verify if user is able to PATCH(update) with token', { 
    tag: ['@API','@UAT'],
    annotation: [
        {
            type: 'Test Case link 5',
            description: 'http://qmetry.com/testrail/link-to-test-case/5'
        }
    ] 

}, async ({request, commonApiUtils}) => {
   const patchBookingReq = await request.patch(`${apiPathData.booking_path}/22`,{
        data: restfulBookerApiData.patchBookingPayLoad,
        headers: {
            Cookie : `token=${await commonApiUtils.createToken()}`
         }
    });
    const jsonPatchBookingRsp = await patchBookingReq.json();
    console.log(jsonPatchBookingRsp);
    expect(patchBookingReq.status()).toBe(200);
    expect(jsonPatchBookingRsp).toMatchObject(restfulBookerApiData.patchBookingPayLoad);
   
});

test('Restful Booker API Module 6- verify if user is able to DELETE with token', { 
    tag: ['@API','@UAT'],
    annotation: [
        {
            type: 'Test Case link 6',
            description: 'http://qmetry.com/testrail/link-to-test-case/6'
        }
    ] 

}, async ({request, commonApiUtils}) => {
   const deleteBookingReq = await request.delete(`${apiPathData.booking_path}/22`, {
        headers: {
            Cookie: `token=${await commonApiUtils.createToken()}`
        }
    });
    expect(deleteBookingReq.status()).toBe(201);
    expect(deleteBookingReq.statusText()).toBe('Created');
    expect(deleteBookingReq).toBeTruthy();
    expect(deleteBookingReq.headers()).toHaveProperty('content-type');
    const getBookingReq = await request.get(`${apiPathData.booking_path}/22`);
    expect(getBookingReq.status()).toBe(404);
    expect(getBookingReq.statusText()).toBe('Not Found');
});