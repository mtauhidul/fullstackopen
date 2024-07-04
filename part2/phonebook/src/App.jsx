import axios from "axios";
import { useEffect, useState } from "react";

const Filter = ({ filter, filterChangeHandler }) => {
  return (
    <>
      filter shown with <input value={filter} onChange={filterChangeHandler} />
    </>
  );
};

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

const Persons = ({ shownPersons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {shownPersons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </>
  );
};

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const onChangeHandler = (event, type) => {
    if (type == "name") {
      setNewName(event.target.value);
    }

    if (type == "number") {
      setNewNumber(event.target.value);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const isDuplicate = persons.find((person) => person.name == newName);

    if (!isDuplicate) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`Name "${newName}" already exists!`);
    }
  };

  const filterChangeHandler = (event) => {
    setFilter(event.target.value);
  };

  const shownPersons = !filter
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLocaleLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChangeHandler={filterChangeHandler} />
      <Form
        submitHandler={submitHandler}
        newName={newName}
        newNumber={newNumber}
        onChangeHandler={onChangeHandler}
      />
      <Persons shownPersons={shownPersons} />
    </div>
  );
};

export default App;
