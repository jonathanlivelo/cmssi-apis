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

async function getOne(id:number) {
    const response: AxiosResponse<User> = await axiosInstance.request({
              method: "GET",
              url: `/user/get/${id}`
          });
      const responseData: User = response.data;
      return responseData;
}

async function createUpdate(user:User) {
    await axiosInstance.request({
              method: "POST",
              headers: {
                      'Content-Type': 'application/json'
                  },
              url: `/user/createUpdate`,
              data: JSON.stringify(user),
          });
}

export const UserAPI = {
  getAll,deleteOne,createUpdate,getOne
};