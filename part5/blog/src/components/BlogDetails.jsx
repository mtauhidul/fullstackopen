import React from "react";

export default function BlogDetails({ blog, likesHandler, deleteHandler }) {
  const { url, likes } = blog;

  return (
    <div>
      <p>{url}</p>
      <p>
        {likes} likes <button onClick={() => likesHandler(blog)}>like</button>
      </p>
      <strong>{blog.user.name}</strong>
      <br />
      <button
        style={{ padding: "5px 10px", color: "red" }}
        onClick={() => deleteHandler(blog)}
      >
        remove
      </button>
    </div>
  );
}
