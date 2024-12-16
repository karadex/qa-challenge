import { test, expect } from "@playwright/test";

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

  const responseBody = await response.json();

  // Assert response details
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  expect(responseBody.id).toBe(100);
  expect(responseBody.category.name).toBe("Swiss shepherd");
  expect(responseBody.tags[0].name).toBe("White");
  expect(responseBody.status).toBe("available");
});