import axios from "axios";
import { Show, User } from "../types";
const BASE_URL = "/api/users";

interface userRequest {
  username: string;
  password: string;
}

let token: string;

const createUser = async (newUser: userRequest): Promise<User> => {
  const response = await axios.post(BASE_URL, newUser);
  return response.data;
};

const checkUserExist = async (username: string): Promise<boolean> => {
  const response = await axios.post(`${BASE_URL}/check`, { username });
  return response.data;
};

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const toggleMyList = async (input: Show): Promise<{ newList: Show[] }> => {
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
  checkUserExist,
};

export default userService;
