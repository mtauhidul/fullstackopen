import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, statistic }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{statistic}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = `${(good / all) * 100}%`;

  return (
    <>
      <h1>statistics</h1>
      {all > 0 ? (
        <table>
          <tbody>
            <StatisticLine text="good" statistic={good} />
            <StatisticLine text="neutral" statistic={neutral} />
            <StatisticLine text="bad" statistic={bad} />
            <StatisticLine text="all" statistic={all} />
            <StatisticLine text="average" statistic={average} />
            <StatisticLine text="positive" statistic={positive} />
          </tbody>
        </table>
      ) : (
        <p>no feedback given</p>
      )}
    </>
  );
};

const App = () => {
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
        <Button text="good" onClick={onGood} />
        <Button text="neutral" onClick={onNeutral} />
        <Button text="bad" onClick={onBad} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
