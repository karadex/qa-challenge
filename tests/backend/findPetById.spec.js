import { test, expect } from "@playwright/test";

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

  const postResponseBody = await postResponse.json();

  const petId = postResponseBody.id;

  // Initialize GET request
  const getResponse = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);

  const getResponseBody = await getResponse.json();

  // Assert response details
  expect(postResponse.ok()).toBeTruthy();
  expect(postResponse.status()).toBe(200);
  expect(getResponseBody.id).toBe(101);
  expect(getResponseBody.category.name).toBe("Swiss shepherd");
  expect(getResponseBody.tags[0].name).toBe("White");
  expect(getResponseBody.status).toBe("available");
});