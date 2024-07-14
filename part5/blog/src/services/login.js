import axios from "axios";

const baseURL = "/api/login";

const login = async (credentials) => {
  const loggedInUser = await axios.post(baseURL, credentials);
  return loggedInUser;
};

export default { login };
