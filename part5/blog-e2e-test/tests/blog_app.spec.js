const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "MIR ISLAM",
        username: "mislam",
        password: "aqsw1234",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Login to application")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("mislam");
      await page.getByTestId("password").fill("aqsw1234");
      await page.getByRole("button", { name: "Log in" }).click();
      await expect(page.getByText("MIR ISLAM logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("mislam");
      await page.getByTestId("password").fill("aqsw123");
      await page.getByRole("button", { name: "Log in" }).click();
      await expect(
        page.getByText("Error: Request failed with status code 401")
      ).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username").fill("mislam");
      await page.getByTestId("password").fill("aqsw1234");
      await page.getByRole("button", { name: "Log in" }).click();
      await expect(page.getByText("MIR ISLAM logged in")).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();
      await page.getByTestId("title").fill("Test blog...");
      await page.getByTestId("author").fill("Test author...");
      await page.getByTestId("url").fill("Test url...");
      await page.getByRole("button", { name: "Create" }).click();
      await expect(
        page.getByText("Successfully created Test blog... by Test author...")
      ).toBeVisible();

      const blogEntry = page
        .locator('[data-testid="blog"]')
        .filter({ hasText: "Test blog... by Test author..." });
      await expect(blogEntry).toBeVisible();
    });

    test("blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();
      await page.getByTestId("title").fill("Test blog...");
      await page.getByTestId("author").fill("Test author...");
      await page.getByTestId("url").fill("Test url...");
      await page.getByRole("button", { name: "Create" }).click();
      await expect(
        page.getByText("Successfully created Test blog... by Test author...")
      ).toBeVisible();

      const blogEntry = page
        .locator('[data-testid="blog"]')
        .filter({ hasText: "Test blog... by Test author..." });
      await expect(blogEntry).toBeVisible();

      await page.getByRole("button", { name: "view details" }).click();
      await expect(page.getByText("0 likes")).toBeVisible();

      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("1 likes")).toBeVisible();
    });

    test("a blog can be deleted by user", async ({ page }) => {
      await page.getByRole("button", { name: "Create new blog" }).click();
      await page.getByTestId("title").fill("Test blog...");
      await page.getByTestId("author").fill("Test author...");
      await page.getByTestId("url").fill("Test url...");
      await page.getByRole("button", { name: "Create" }).click();
      await expect(
        page.getByText("Successfully created Test blog... by Test author...")
      ).toBeVisible();

      const blogEntry = page
        .locator('[data-testid="blog"]')
        .filter({ hasText: "Test blog... by Test author..." });
      await expect(blogEntry).toBeVisible();

      await page.getByRole("button", { name: "view details" }).click();

      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toBe(
          'Are you sure you want to remove "Test blog..." by Test author...?'
        );
        await dialog.accept();
      });

      await page.getByRole("button", { name: "remove" }).click();

      await expect(
        page.getByText('remove "Test blog..." by Test author...')
      ).not.toBeVisible();
    });
  });
});
