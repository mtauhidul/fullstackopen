import { createSlice } from "@reduxjs/toolkit";
import anecdotes from "../services/anecdotes";

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

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
      return state;
    },
    vote(state, action) {
      const id = action.payload.id;

      const updatedState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.payload
      );

      return updatedState;
    },
    addAll(state, action) {
      return action.payload;
    },
  },
});

export const { add, vote, addAll } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotesList = await anecdotes.getAll();
    dispatch(addAll(anecdotesList));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotes.createNew(content);
    dispatch(add(newAnecdote));
  };
};

export const voteAnecdote = (data) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotes.vote(data);
    dispatch(vote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
