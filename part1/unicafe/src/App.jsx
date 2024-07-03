import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  function averageScore() {
    const points = {
      good: 1,
      neutral: 0,
      bad: -1,
    };

    const goodPoints = good * points.good;
    const neutralPoints = neutral * points.neutral;
    const badPoints = bad * points.bad;

    const totalPoints = goodPoints + neutralPoints + badPoints;

    const averagePoints = totalPoints / all;

    return averagePoints;
  }

  function positivePercentage() {
    const percentage = (good / all) * 100;

    return percentage;
  }
  return (
    <>
      <h1>statistics</h1>
      {all > 0 ? (
        <>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {all}</p>
          <p>average {averageScore() || 0}</p>
          <p>positive {positivePercentage() || 0}%</p>
        </>
      ) : (
        <p>no feedback given</p>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function onGood() {
    const updatedCount = good + 1;
    setGood(updatedCount);
  }

  function onNeutral() {
    const updatedCount = neutral + 1;
    setNeutral(updatedCount);
  }

  function onBad() {
    const updatedCount = bad + 1;
    setBad(updatedCount);
  }

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => onGood()}>good</button>
        <button onClick={() => onNeutral()}>neutral</button>
        <button onClick={() => onBad()}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
