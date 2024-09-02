import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogDetails from "./BlogDetails";

test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const blog = {
    title: "Test blog",
    author: "Test author",
    url: "https://example.com",
    likes: 50,
    user: {
      name: "MIR",
    },
  };

  const mockHandler = vi.fn();

  render(<BlogDetails blog={blog} likesHandler={mockHandler} />);

  const user = userEvent.setup();
  await user.click(screen.getByText("like"));
  await user.click(screen.getByText("like"));

  expect(mockHandler).toHaveBeenCalledTimes(2);
});
