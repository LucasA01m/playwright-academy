const { test, expect } = require('@playwright/test');

test.describe('API test suite', () => {
    const baseURL = 'https://simple-grocery-store-api.glitch.me';
    test('Validate endpoint response status is successful', async ({ request }) => {
        const response = await request.get(baseURL + '/status');
        expect(response.status()).toBe(200);
        console.log(response);
    });

    test('Validate endpoint is invalid', async ({ request }) => {
        const response = await request.get(baseURL + '/status1');
        expect(response.status()).toBe(404);
    });

    test('Validate the response body', async ({ request }) => {
        const response = await request.get(baseURL + '/status');
        expect(response.status()).toBe(200);

        const responseBody = JSON.parse(await response.text());
        expect(responseBody.status).toBe('UP')

        //console.log(responseBody);

    });

    test('Validate a single product response body', async ({ request }) => {
        const get_response = await request.get(baseURL + '/products/4643');
        expect(get_response.status()).toBe(200);

        const responseBody = await get_response.json();

        expect(responseBody.id).toBe(4643);
        expect(responseBody.category).toBe('coffee');
        expect(responseBody.name).toContain('Starbucks');
        expect(responseBody.manufactures).not.toBeTruthy();
        expect(responseBody.price).toBeGreaterThan(40);
        expect(responseBody['current-stock']).not.toBeNull;
        expect(responseBody.inStock).toBe(true);

        console.log(responseBody);

    });

    test('Add a new product to the cart - validate it got added', async ({ request }) => {
        const item_to_add = 4643;

        const post_response = await request.post(baseURL + "/carts/qK-e4FltGoSGqwaTZ_jL9/items", {
            data: {
                productId: item_to_add,
            }
        });

        const responseBody = await post_response.json();

        try {
            expect(post_response.status()).toBe(201);
        } catch (e) {
            // returns
            console.log(responseBody);
            // Checking if the right product is added to the cart
            console.log(await ((await request.get(baseURL + '/carts/qK-e4FltGoSGqwaTZ_jL9/items')).json()));
            expect((await (await request.get(baseURL + '/carts/qK-e4FltGoSGqwaTZ_jL9/items')).text())).toContain(String(item_to_add));
        }

    });

    test('Delete the added product - validate it got deleted', async ({ request }) => {
        const post_response = await request.post(baseURL + "/carts/qK-e4FltGoSGqwaTZ_jL9/items", {
            data: {
                productId: 2585,
            }
        });
        const postResponseBody = await post_response.json();
        const item_to_delete = postResponseBody.itemId

        const delete_response = await request.delete(baseURL + '/carts/qK-e4FltGoSGqwaTZ_jL9/items/' + item_to_delete);
        console.log(delete_response);
        //const responseBody2 = await delete_response.json();
        expect(delete_response.status()).toBe(204);

    });

    test('Create a new cart - validate it got created', async ({ request }) => {
        const post_response = await request.post(baseURL + '/carts');
        const postResponseBody = await post_response.json();
        expect(postResponseBody.created).toBe(true);

    });

});

