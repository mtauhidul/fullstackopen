import BlogDetails from "./BlogDetails";
import Togglable from "./Togglable";

const Blog = ({ blog, likesHandler, deleteHandler }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  console.log(blog);

  return (
    <div style={blogStyle} data-testid="blog">
      {blog.title} by {blog.author}
      <Togglable buttonLabelShow="view details" buttonLabelHide="hide details">
        <BlogDetails
          blog={blog}
          likesHandler={likesHandler}
          deleteHandler={deleteHandler}
        />
      </Togglable>
    </div>
  );
};

export default Blog;
