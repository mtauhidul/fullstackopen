import { useDispatch } from "react-redux";
import { add } from "../reducers/anecdoteReducer";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const addNew = (event) => {
    event.preventDefault();
    const anecdote = event.target.content.value;
    event.target.content.value = "";
    if (anecdote) {
      dispatch(add(anecdote));
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
