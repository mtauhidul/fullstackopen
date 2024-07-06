import Person from "./Person";

const Persons = ({ shownPersons, remove }) => {
  return (
    <>
      <h2>Numbers</h2>
      {shownPersons.map((person) => {
        return <Person key={person.id} person={person} remove={remove} />;
      })}
    </>
  );
};

export default Persons;
