const Filter = ({ filter, filterChangeHandler }) => {
  return (
    <>
      filter shown with <input value={filter} onChange={filterChangeHandler} />
    </>
  );
};

export default Filter;
