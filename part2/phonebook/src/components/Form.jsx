const Form = ({ submitHandler, newName, newNumber, onChangeHandler }) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={submitHandler}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => onChangeHandler(event, "name")}
          />
          <br />
          number:{" "}
          <input
            value={newNumber}
            onChange={(event) => onChangeHandler(event, "number")}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Form;
