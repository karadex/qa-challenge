import { test, expect } from "@playwright/test";

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
        name: "Swiss shepherd",
      },
      name: "Zeus",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "White",
        },
      ],
      status: "available",
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
        name: "Swiss shepherd update",
      },
      name: "Zeus",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "White update",
        },
      ],
      status: "Not available",
    },
  });

  const putResponseBody = await putResponse.json();

  // Assert response details
  expect(putResponse.ok()).toBeTruthy();
  expect(putResponse.status()).toBe(200);
  expect(putResponseBody.id).toBe(102);
  expect(putResponseBody.category.name).toBe("Swiss shepherd update");
  expect(putResponseBody.tags[0].name).toBe("White update");
  expect(putResponseBody.status).toBe("Not available");
});