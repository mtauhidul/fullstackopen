import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
    console.log(persons);
  }, []);

  const onChangeHandler = (event, type) => {
    if (type === "name") {
      setNewName(event.target.value);
    }

    if (type === "number") {
      setNewNumber(event.target.value);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const isDuplicate = persons.find((person) => person.name === newName);

    if (!isDuplicate) {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .createPerson(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessage("Person created successfully!");
          setTimeout(() => setMessage(""), 5000);
        })
        .catch((error) => {
          console.log(error.message);
          setError("Something went wrong! Try again.");
          setTimeout(() => setError(""), 5000);
        });
    } else {
      const decision = window.confirm(
        `Name "${newName}" already exists! Do you want to replace new number with the old number?`
      );

      if (decision) {
        const updatingPerson = { ...isDuplicate, number: newNumber };
        personService
          .updatePerson(updatingPerson.id, updatingPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setMessage("Number updated successfully!");
            setTimeout(() => setMessage(""), 5000);
          })
          .catch((error) => {
            console.log(error.message);
            setError(`Person ${newName} Something went wrong!`);
            setTimeout(() => setError(""), 5000);
          });
      }
    }
  };

  const filterChangeHandler = (event) => {
    setFilter(event.target.value);
  };

  const shownPersons = !filter
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  const remove = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage("Person deleted successfully!");
          setTimeout(() => setMessage(""), 5000);
        })
        .catch((error) => {
          console.log(error.message);
          setError(`Person not available on server!`);
          setTimeout(() => setError(""), 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterChangeHandler={filterChangeHandler} />
      {message && <Notification message={message} type="success" />}
      {error && <Notification message={error} type="error" />}
      <Form
        submitHandler={submitHandler}
        newName={newName}
        newNumber={newNumber}
        onChangeHandler={onChangeHandler}
      />
      <Persons shownPersons={shownPersons} remove={remove} />
    </div>
  );
};

export default App;
