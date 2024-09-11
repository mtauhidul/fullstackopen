import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

export const getAllAnecdotes = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

export const createAnecdote = async (data) => {
  const response = await axios.post(baseURL, data);
  return response.data;
};

export const voteAnecdote = async (data) => {
  const response = await axios.put(`${baseURL}/${data.id}`, {
    ...data,
    votes: data.votes + 1,
  });
  return response.data;
};
