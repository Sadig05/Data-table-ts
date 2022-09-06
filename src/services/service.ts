import axios from "axios";
import { IFilter, IUser } from "../models/User";
const baseUrl = `http://localhost:3004/users`;

class UserService {
  getData = async (params: IFilter) => {
    const request = await axios.get(baseUrl, {
      params,
    });
    return request;
  };

  postData = async (user: IUser) => {
    const response = await axios.post(baseUrl, user);
    return response;
  }

  editData = async(user: IUser) => {
    const response = await axios.put(`${baseUrl}/${user.id}`, {...user})
    return response
  }

  deleteData = async(id: number) => {
   const response = await axios.delete(`${baseUrl}/${id}`);
   return response
  }

}

export default UserService;
