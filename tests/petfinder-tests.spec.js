import { test, expect } from '@playwright/test';
const bearerToken = require('../functions/createToken.js');
let logger = require('../functions/typesLogger.js');
let accessToken = '';

test.beforeAll(async ({ request }) => {
  let token = await bearerToken.getToken(request);
  accessToken = token;
})

test('Retrieve a list of all animal types available on Petfinder', async ({ request }) => {
  const response = await request.get('https://api.petfinder.com/v2/types', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  let json = JSON.parse((await response.body()));
  logger.logAllTypes(json);
  expect(await response.status()).toBe(200);
});


test('Verify that dog is one of the animal types', async ({ request }) => {
  const response = await request.get('https://api.petfinder.com/v2/types', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  let json = JSON.parse((await response.body()));
  const isDogPresent = json.types.some(type => type.name === 'Dog');
  expect(isDogPresent).toBe(true);
});
