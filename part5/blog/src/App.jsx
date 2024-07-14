import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInBlogUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      if (loggedUser) {
        setUser(loggedUser);
        blogService.setToken(loggedUser.token);
      }
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs.sort((a, b) => b.likes - a.likes));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const credentials = { username, password };
      const loggedUser = await loginService.login(credentials);

      setUser(loggedUser);
      setUsername("");
      setPassword("");

      console.log(loggedUser);

      blogService.setToken(loggedUser.token);
      window.localStorage.setItem(
        "loggedInBlogUser",
        JSON.stringify(loggedUser)
      );

      setSuccessMessage(`Welcome ${loggedUser.name}`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error logging in:", error);

      setErrorMessage(`Error: ${error.message}`);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedInBlogUser");
    setUser(null);
  };

  const createNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      const blogObject = { ...newBlog, userId: user.id };
      const savedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(savedBlog));

      setSuccessMessage(
        `Successfully created ${savedBlog.title} by ${savedBlog.author}`
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error creating blog:", error);
      setErrorMessage(`Error: ${error.message}`);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const likesHandler = async (updatingBlog) => {
    try {
      const updatedBlog = { ...updatingBlog, likes: updatingBlog.likes + 1 };
      const response = await blogService.update(updatedBlog, updatedBlog.id);

      const modifiedBlog = { ...updatingBlog, likes: response.likes };

      setBlogs(
        blogs.map((blog) => (blog.id === updatingBlog.id ? modifiedBlog : blog))
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const deleteHandler = async (blog) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to remove "${blog.title}" by ${blog.author}?`
    );

    if (isConfirmed) {
      try {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));

        setSuccessMessage(
          `Successfully deleted "${blog.title}" by ${blog.author}`
        );
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error deleting blog:", error);
        setErrorMessage(`Error: ${error.message}`);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  return (
    <div>
      {successMessage && (
        <Notification message={successMessage} type="success" />
      )}
      {errorMessage && <Notification message={errorMessage} type="error" />}
      {user ? (
        <>
          <h2>Blogs</h2>

          <p>
            {user.name} logged in{" "}
            <button onClick={logoutHandler}>Logout</button>
          </p>
          <Togglable
            buttonLabelShow="Create new blog"
            buttonLabelHide="cancel creating new blog"
            ref={blogFormRef}
          >
            <BlogForm createNewBlog={createNewBlog} />
          </Togglable>

          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likesHandler={likesHandler}
              deleteHandler={deleteHandler}
            />
          ))}
        </>
      ) : (
        <LoginForm
          loginHandler={loginHandler}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
    </div>
  );
};

export default App;
