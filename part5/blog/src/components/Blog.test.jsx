import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("checks the blog's title and author", () => {
  const blog = {
    title: "Test blog",
    author: "Test author",
    url: "https://example.com",
    likes: 50,
  };

  render(<Blog blog={blog} />);

  const title = screen.getByText("Test blog", { exact: false });
  const author = screen.getByText("Test author", { exact: false });

  expect(title).toBeDefined();
  expect(author).toBeDefined();

  const url = screen.queryByText("https://example.com");
  const likes = screen.queryByText("Likes: 50");

  expect(url).toBeNull();
  expect(likes).toBeNull();
});
