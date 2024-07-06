import axios from "axios";

const baseURL = "http://localhost:3001/persons";

function getAll() {
  return axios
    .get(baseURL)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating person:", error);
      return Promise.reject(error);
    });
}

function createPerson(person) {
  return axios
    .post(baseURL, person)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating person:", error);
      return Promise.reject(error);
    });
}

function updatePerson(id, person) {
  return axios
    .put(`${baseURL}/${id}`, person)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating person:", error);
      return Promise.reject(error);
    });
}

function deletePerson(id) {
  return axios
    .delete(`${baseURL}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting person:", error);
      return Promise.reject(error);
    });
}

export default { getAll, createPerson, updatePerson, deletePerson };
