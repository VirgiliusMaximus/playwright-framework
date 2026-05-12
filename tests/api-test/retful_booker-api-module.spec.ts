import {test} from '../../fixtures/hooks-fixture';

test('Retful Booker API Module', async ({request}) => {
   const bookingIDS = await request.get('booking');
    console.log(await bookingIDS.json());

});

test('Retful Booker API Module - get Booking IDs', async ({request}) => {
    
    const booking1 = await request.get('booking/2');
     console.log(await booking1.json());
});