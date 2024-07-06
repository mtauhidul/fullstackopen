import Person from "./Person";

const Persons = ({ shownPersons, remove }) => {
  return (
    <>
      <h2>Numbers</h2>
      {shownPersons.map((person) => {
        if (!person) {
          console.error(
            "Found undefined person in shownPersons:",
            shownPersons
          );
          return null;
        }
        console.log("person =>>", person.id);
        return <Person key={person.id} person={person} remove={remove} />;
      })}
    </>
  );
};

export default Persons;
