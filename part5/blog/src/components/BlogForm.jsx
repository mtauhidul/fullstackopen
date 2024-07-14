import React, { useState } from "react";

export default function BlogForm({ createNewBlog }) {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const formHandler = (event) => {
    event.preventDefault();
    createNewBlog(newBlog);
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={formHandler}>
        title
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />
        <br />
        author
        <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
        <br />
        url
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
