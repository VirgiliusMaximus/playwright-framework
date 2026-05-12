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

test('Retful Booker API Module - verify if user is able to fetch booking IDs', { 
    tag: ['@API','@UAT'],
    annotation: [
        {
            type: 'Test Case link',
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