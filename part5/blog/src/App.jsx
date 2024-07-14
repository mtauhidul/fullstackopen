import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
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
      const response = await loginService.login(credentials);
      const loggedUser = response.data;

      setUser(loggedUser);
      setUsername("");
      setPassword("");

      blogService.setToken(loggedUser.token);
      window.localStorage.setItem(
        "loggedInBlogUser",
        JSON.stringify(loggedUser)
      );
    } catch (error) {
      console.error("Error logging in:", error);
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
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div>
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
