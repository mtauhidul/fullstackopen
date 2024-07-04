import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([]);

  if (!vote.length) {
    (function voteInitialize() {
      const votes = [...vote];
      for (let anecdote of anecdotes) {
        votes.push(0);
        console.log(votes);
      }
      setVote(votes);
    })();
  }

  const change = () => {
    const min = 0;
    const max = Math.floor(anecdotes.length) - 1;
    setSelected(Math.floor(Math.random() * (max - min + 1)) + min);
  };

  const updateVote = () => {
    const votes = [...vote];
    votes[selected] += 1;
    console.log(votes);
    setVote(votes);
  };

  function getRandomMaxIndex(arr) {
    let maxValue = Math.max(...arr);
    let maxIndices = [];
    arr.forEach((value, index) => {
      if (value === maxValue) {
        maxIndices.push(index);
      }
    });
    let randomIndex = Math.floor(Math.random() * maxIndices.length);
    return maxIndices[randomIndex];
  }

  let randomMaxIndex = getRandomMaxIndex(vote);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <p>has {vote[selected] || 0} votes</p>
      <button onClick={updateVote}>vote</button>
      <button onClick={change}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[randomMaxIndex]}</p>
      <p>has {vote[randomMaxIndex]} votes</p>
    </>
  );
};

export default App;
