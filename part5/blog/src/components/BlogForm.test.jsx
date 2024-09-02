import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("form calls the event handler it received as props with the right details when a new blog is created", async () => {
  const mockHandler = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createNewBlog={mockHandler} />);

  const titleInput = screen.getByTestId("title");
  const authorInput = screen.getByTestId("author");
  const urlInput = screen.getByTestId("url");
  const submitBtn = screen.getByText("Create");

  await user.type(titleInput, "Test title...");
  await user.type(authorInput, "Test author...");
  await user.type(urlInput, "Test url...");
  await user.click(submitBtn);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("Test title...");
  expect(mockHandler.mock.calls[0][0].author).toBe("Test author...");
  expect(mockHandler.mock.calls[0][0].url).toBe("Test url...");
});
