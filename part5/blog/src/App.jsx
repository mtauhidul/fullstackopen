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
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const credentials = {
        username,
        password,
      };
      const response = await loginService.login(credentials);
      setUser(response.data);
      setUsername("");
      setPassword("");

      blogService.setToken(response.data.token);

      window.localStorage.setItem(
        "loggedInBlogUser",
        JSON.stringify(response.data)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedInBlogUser");
    setUser(null);
  };

  const createNewBlog = async (event) => {
    event.preventDefault();

    const blogObject = { ...newBlog, userId: user.id };

    const savedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(savedBlog));
  };

  return (
    <div>
      {user && (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in{" "}
            <button onClick={logoutHandler}>logout</button>
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
      )}
      {!user && (
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
