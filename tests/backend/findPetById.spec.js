import { test, expect } from "@playwright/test";
import { newPet } from "../../data/petData";

test("GET /pet/{petId} - Find Pet by ID", async ({ request }) => {
  // Initialize POST request with headers and body
  const postResponse = await request.post(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id: 101,
      category: {
        id: 0,
        name: newPet.category,
      },
      name: newPet.name,
      photoUrls: [newPet.url],
      tags: [
        {
          id: 0,
          name: newPet.tag,
        },
      ],
      status: newPet.status,
    },
  });

  // Assert response details
  expect(postResponse.ok()).toBeTruthy();
  expect(postResponse.status()).toBe(200);

  const postResponseBody = await postResponse.json();

  const petId = postResponseBody.id;

  // Initialize GET request
  const getResponse = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);

  const getResponseBody = await getResponse.json();

  // Assert response details
  expect(getResponse.ok()).toBeTruthy();
  expect(getResponse.status()).toBe(200);
  expect(getResponseBody.id).toBe(101);
  expect(getResponseBody.category.name).toBe(newPet.category);
  expect(getResponseBody.name).toBe(newPet.name);
  expect(getResponseBody.tags[0].name).toBe(newPet.tag);
  expect(getResponseBody.status).toBe(newPet.status);
});