import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => state).sort(
    (a, b) => b.votes - a.votes
  );
  const dispatch = useDispatch();

  const doVote = (id) => {
    dispatch(vote(id));
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has{" "}
            <span
              style={{
                color: "red",
                fontWeight: "700",
              }}
            >
              {anecdote.votes}
            </span>{" "}
            <button onClick={() => doVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
