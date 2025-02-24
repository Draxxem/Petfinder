import { test, expect } from '@playwright/test';
const bearerToken = require('../functions/createToken.js');
let display = require('../functions/listAllTypes.js');
let accessToken = '';

test.beforeAll(async ({ request }) => {
  let token = await bearerToken.getToken(request);
  accessToken = token;
})

test('Retrieve a list of all animal types available on Petfinder | @workflow', async ({ request }) => {
  const response = await request.get('https://api.petfinder.com/v2/types', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  let json = JSON.parse((await response.body()));
  display.printAllTypes(json);
  expect(await response.status()).toBe(200);
});


test('Verify that dog is one of the animal types | @workflow', async ({ request }) => {
  const response = await request.get('https://api.petfinder.com/v2/types', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  let json = JSON.parse((await response.body()));
  const isDogPresent = json.types.some(type => type.name === 'Dog');
  expect(isDogPresent).toBe(true);
});


test('Retrieve a list of all dog breeds available on Petfinder | @workflow', async ({ request }) => {
  let type = 'Dog'
  let count = 1;

  const response = await request.get(`https://api.petfinder.com/v2/types/${type}/breeds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  let json = JSON.parse(await response.body());

  json.breeds.forEach(breed => {
    console.log(`${count++}` + ': ' + `${breed.name}`);
  })
});


test('Perform a search for dogs of the "Golden Retriever" breed and verify that at least one result is returned | @workflow', async ({ request }) => {
  let type = 'Dog'

  const response = await request.get(`https://api.petfinder.com/v2/types/${type}/breeds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  let json = JSON.parse(await response.body());

  let regex = /Golden\s*Retriever/;
  const filteredBreeds = json.breeds.filter(breed => regex.test(breed.name));

  console.log('Found: ' + filteredBreeds[0].name);

  expect(filteredBreeds[0].name).toContain('Golden');
});


test('Return 404 error when providing non-existent breed type', async ({ request }) => {
  let type = 'Snail'

  const response = await request.get(`https://api.petfinder.com/v2/types/${type}/breeds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  let json = JSON.parse(await response.body());

  console.log(json);
  expect(await response.status()).toBe(404);
  expect(json.status).toBe(404);
  expect(json.title).toBe('Not Found');
  expect(json.detail).toBe('Not Found');
});


test('Return 401 error and verify response body when providing invalid access_token', async ({ request }) => {
  const response = await request.get('https://api.petfinder.com/v2/types', {
    headers: {
      Authorization: `Bearer 12345`
    }
  });

  let json = JSON.parse((await response.body()));

  console.log(json);
  expect(await response.status()).toBe(401);
  expect(json.status).toBe(401);
  expect(json.title).toBe('Unauthorized');
  expect(json.detail).toBe('Access token invalid or expired');
});
