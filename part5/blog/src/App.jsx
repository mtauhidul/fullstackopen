import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        setBlogs(blogs);
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

  const createNewBlog = async (event) => {
    event.preventDefault();

    try {
      const blogObject = { ...newBlog, userId: user.id };
      const savedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(savedBlog));
      setNewBlog({ title: "", author: "", url: "" });

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
          <BlogForm
            createNewBlog={createNewBlog}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
          />
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
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
