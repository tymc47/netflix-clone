import axios from "axios";
import { User } from "../types";
const BASE_URL = "/api/login";

interface Credentials {
  username: string;
  password: string;
}

const login = async (credentials: Credentials): Promise<User> => {
  const response = await axios.post<User>(BASE_URL, credentials);
  return response.data;
};

export default {
  login,
};
