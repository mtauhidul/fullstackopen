import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useNotificationDispatch } from "./NotificationContext";
import { getAllAnecdotes, voteAnecdote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "anecdotes" });
      dispatch({ type: "SHOW", payload: "Successfully voted!" });
      setTimeout(() => {
        dispatch({ type: "CLEAR", payload: "" });
      }, 3000);
    },
    onError: (error) => {
      dispatch({
        type: "SHOW",
        payload: `${error.message} || Something went wrong!`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR", payload: "" });
      }, 3000);
    },
  });

  const result = useQuery({
    queryKey: "anecdotes",
    queryFn: getAllAnecdotes,
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote);
  };

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
