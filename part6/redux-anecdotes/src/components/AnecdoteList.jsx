import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

export default function AnecdoteList() {
  const filter = useSelector((state) => state.filter);
  const unsortedList = useSelector((state) => state.anecdotes);

  const list = [...unsortedList].sort((a, b) => b.votes - a.votes);

  const anecdotes =
    filter && filter !== "ALL"
      ? list.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : list;

  const dispatch = useDispatch();

  const doVote = (id) => {
    const anecdoteWantToVote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(voteAnecdote(anecdoteWantToVote));

    dispatch(
      showNotification(`You voted for '${anecdoteWantToVote.content}'`, 5)
    );
  };

  console.log(anecdotes);

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
