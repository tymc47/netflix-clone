import axios from "axios";
import { Show, User } from "../types";
const BASE_URL = "/api/users";

interface userRequest {
  username: string;
  password: string;
}

let token: string;

const createUser = async (newUser: userRequest): Promise<User> => {
  console.log("creating user");

  const response = await axios.post(BASE_URL, newUser);
  return response.data;
};

const setToken = (newToken: string) => {
  console.log("token", newToken);
  token = `bearer ${newToken}`;
};

const toggleMyList = async (input: Show): Promise<{ newList: Show[] }> => {
  console.log("target", input);
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(BASE_URL, { showToToggle: input }, config);
  return response.data;
};

const userService = {
  createUser,
  setToken,
  toggleMyList,
};

export default userService;
