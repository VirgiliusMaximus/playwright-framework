import { Client } from 'pg';
import { test, expect } from '../../fixtures/hooks-fixture';

test.use({
    ignoreHTTPSErrors: true


});

test('Connect to PostgreSQL Database using Credentials', async ({ page, commonUtils }) => {
    const decriptedPass = commonUtils.decryptData(process.env.DB_PASSWORD!);
    const decriptedHost = commonUtils.decryptData(process.env.DB_HOST!);
    const decriptedPort = commonUtils.decryptData(process.env.DB_PORT!);
    const decriptedName = commonUtils.decryptData(process.env.DB_NAME!);
    const decriptedUser = commonUtils.decryptData(process.env.DB_USER!);
    const dbConfig = {
        host: decriptedHost,
        port: Number(decriptedPort || 5432),
        database: decriptedName,
        user: decriptedUser,
        password: decriptedPass,
    };

    page.on('console', msg => {
        if (msg.type() === 'error')
            console.log(`Error text: "${msg.text()}"`);
    });
    const client = new Client(dbConfig);
    await page.goto(process.env.DB_URL!);
    try {
        // Connect to the database
        await client.connect();
        // Execute a query
        const result = await client.query('SELECT name FROM users');
        console.log('Query result:', result);
        
        if (result.rows.length > 0) {
            console.log('Name:', result.rows[0].name);
            await page.goto(process.env.DB_URL! + '&name=' + result.rows[0].name);
            // Validate url and response
            await expect(page).toHaveURL(process.env.DB_URL! + '&name=' + result.rows[0].name);
            const response = await page.locator('body').innerText();
            await expect(response).toContain('200');
            await expect(response).toContain('token');
            await expect(response).toContain('email');
            //console.log('RESPONSE:' + response);
        } else {
            // throw error
            console.log('No status found in the page result.');
            throw new Error('No status found in the page result.');
        }
    } finally {
        await client.end();
    }
});