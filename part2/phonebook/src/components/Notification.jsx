const Notification = ({ message, type }) => {
  const notificationStyle = {
    color: type == "success" ? "green" : "red",
    fontWeight: "bold",
    backgroundColor: "lightgray",
    border: type == "success" ? "2px solid green" : "2px solid red",
    padding: "3px 10px",
    margin: "10px 0px",
  };

  if (!message) {
    return null;
  }

  return (
    <div style={notificationStyle}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
