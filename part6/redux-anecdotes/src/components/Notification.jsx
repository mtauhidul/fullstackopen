import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  console.log(notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: "10px",
  };
  return <div>{notification && <div style={style}>{notification}</div>}</div>;
};

export default Notification;
