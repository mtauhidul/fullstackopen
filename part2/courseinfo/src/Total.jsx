const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises;
  }, 0);

  return <strong>total of {sum} exercises</strong>;
};

export default Total;
