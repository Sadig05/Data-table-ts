import axios from "axios";
import { IFilter } from "../models/User";
const baseUrl = `http://localhost:3004/users`;

class UserService {
  getData = async (params: IFilter) => {
    const request = await axios.get(baseUrl, {
      params,
    });
    return request;
  };
}

export default UserService;
