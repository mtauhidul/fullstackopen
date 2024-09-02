import React from "react";

export default function LoginForm({
  loginHandler,
  username,
  setUsername,
  password,
  setPassword,
}) {
  return (
    <div>
      <h3>Login to application</h3>
      <form onSubmit={loginHandler}>
        username
        <input
          type="text"
          data-testid="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        password
        <input
          type="password"
          data-testid="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
