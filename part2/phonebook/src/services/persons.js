import axios from "axios";

const baseURL = "http://localhost:3001/persons";

function getAll() {
  return axios
    .get(baseURL)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching persons:", error);
      throw error; // Rethrow the error
    });
}

function createPerson(person) {
  return axios
    .post(baseURL, person)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating person:", error);
      throw error; // Rethrow the error
    });
}

function updatePerson(id, person) {
  return axios
    .put(`${baseURL}/${id}`, person)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating person:", error);
      throw error; // Rethrow the error
    });
}

function deletePerson(id) {
  return axios
    .delete(`${baseURL}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting person:", error);
      throw error; // Rethrow the error
    });
}

export default { getAll, createPerson, updatePerson, deletePerson };
