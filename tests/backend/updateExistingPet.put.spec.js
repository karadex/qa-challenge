import { test, expect } from "@playwright/test";
import { newPet, updatePet } from "../../data/petData";

test("PUT /pet - Update Existing Pet", async ({ request }) => {
  // Initialize POST request with headers and body
  const postResponse = await request.post(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id: 102,
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

  // Initialize PUT request with headers and body
  const putResponse = await request.put(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id: 102,
      category: {
        id: 0,
        name: updatePet.category,
      },
      name: updatePet.name,
      photoUrls: [updatePet.url],
      tags: [
        {
          id: 0,
          name: updatePet.tag,
        },
      ],
      status: updatePet.status,
    },
  });

  const putResponseBody = await putResponse.json();

  // Assert response details
  expect(putResponse.ok()).toBeTruthy();
  expect(putResponse.status()).toBe(200);
  expect(putResponseBody.id).toBe(102);
  expect(putResponseBody.category.name).toBe(updatePet.category);
  expect(putResponseBody.name).toBe(updatePet.name);
  expect(putResponseBody.tags[0].name).toBe(updatePet.tag);
  expect(putResponseBody.status).toBe(updatePet.status);
});