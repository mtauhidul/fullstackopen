import React from "react";

export default function Notification({ message, type }) {
  const errorMessageStyle = {
    border: "1px solid red",
    color: "red",
    padding: "15px 10px",
    margin: "10px",
  };

  const successMessageStyle = {
    border: "1px solid green",
    color: "green",
    padding: "15px 10px",
    margin: "10px",
  };
  return (
    <div style={type === "error" ? errorMessageStyle : successMessageStyle}>
      <p>{message}</p>
    </div>
  );
}
