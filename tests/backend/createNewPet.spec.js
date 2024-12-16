import { test, expect } from "@playwright/test";
import { newPet } from "../../data/petData";

test("POST /pet - Create New Pet", async ({ request }) => {
  // Initialize POST request with headers and body
  const response = await request.post(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id: 100,
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

  const responseBody = await response.json();

  // Assert response details
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  expect(responseBody.id).toBe(100);
  expect(responseBody.category.name).toBe(newPet.category);
  expect(responseBody.name).toBe(newPet.name);
  expect(responseBody.tags[0].name).toBe(newPet.tag);
  expect(responseBody.status).toBe(newPet.status);
});