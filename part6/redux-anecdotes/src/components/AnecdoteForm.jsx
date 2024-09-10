import { useDispatch } from "react-redux";
import { add } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const addNew = (event) => {
    event.preventDefault();
    const anecdote = event.target.content.value;
    event.target.content.value = "";
    if (anecdote) {
      dispatch(add(anecdote));
      dispatch(setNotification(`Just added new anecdote "${anecdote}"`));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input type="text" name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
