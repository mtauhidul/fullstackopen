/* eslint-disable no-case-declarations */
export const initialState = [
  {
    content: "If it hurts, do it more often",
    id: "34236",
    votes: 0,
  },
  {
    content: "Adding manpower to a late software project makes it later!",
    id: "79548",
    votes: 0,
  },
  {
    content:
      "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    id: "22845",
    votes: 0,
  },
  {
    content:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    id: "87346",
    votes: 0,
  },
  {
    content: "Premature optimization is the root of all evil.",
    id: "44968",
    votes: 0,
  },
  {
    content:
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    id: "5527",
    votes: 0,
  },
];

export function vote(id) {
  return {
    type: "VOTE",
    payload: {
      id,
    },
  };
}

export function add(anecdote) {
  return {
    type: "ADD",
    payload: {
      content: anecdote,
    },
  };
}

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.payload.id;
      const anecdote = state.find((item) => item.id === id);
      const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      const updatedState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
      return updatedState;
    case "ADD":
      const newAnecdote = {
        content: action.payload.content,
        id: getId(),
        votes: 0,
      };
      return [...state, newAnecdote];
    default:
      return state;
  }
};

export default anecdoteReducer;
