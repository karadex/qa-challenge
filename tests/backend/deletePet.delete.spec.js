import { test, expect } from "@playwright/test";
import { newPet } from "../../data/petData";

test("DELETE /pet/{petId} - Delete Pet", async ({ request }) => {
  // Initialize POST request with headers and body
  const postResponse = await request.post(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id: 103,
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

  const postResponseBody = await postResponse.json();

  const petId = postResponseBody.id;

  // Initialize DELETE request
  const deleteResponse = await request.delete(`https://petstore.swagger.io/v2/pet/${petId}`);

  // Assert response details
  expect(deleteResponse.status()).toBe(200);

  // Initialize GET request
  const getResponse = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);

  // Assert response details
  expect(getResponse.status()).toBe(404);
});