import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const addNew = async (event) => {
    event.preventDefault();
    const anecdote = event.target.content.value;
    event.target.content.value = "";
    if (anecdote) {
      dispatch(createAnecdote(anecdote));
      dispatch(showNotification(`You just created '${anecdote}'`, 5));
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
