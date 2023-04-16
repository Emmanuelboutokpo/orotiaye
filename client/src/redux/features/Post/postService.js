import axios from "axios";
import { API} from "../../../api";

const token = window.localStorage.getItem('token');
const api_url = API;

export const axiosIntance = axios.create({
   baseURL: api_url,
   headers: {
       "Authorization": token ? `Bearer ${token}` : "",
       "content-Type" : "multipart/form-data"
   }
});

export const getAllPost = () => axiosIntance.get("/post/getAllPost");
export const getPost = (postId) => axiosIntance.get("/post/getPost/" + postId);
export const deletePost = (postId) => axiosIntance.delete("/post/deletePost/" + postId);