import axios,{ AxiosResponse } from 'axios';
import {User} from '../models/User'
const axiosInstance = axios.create({
   baseURL: 'http://localhost:8080'
});

async function deleteOne(id:number) {
    await axiosInstance.request({
              method: "DELETE",
              url: `/user/delete/${id}`
          });
}

async function getAll() {
    const response: AxiosResponse<User[]> = await axiosInstance.request({
              method: "GET",
              url: `/user/list`
          });
      const responseData: User[] = response.data;
      return responseData;
}

export const UserAPI = {
  getAll,deleteOne
};