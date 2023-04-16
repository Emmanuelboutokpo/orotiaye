import axios from "axios";
import { API} from "../../../api";

const token = window.localStorage.getItem('token');
const api_url = API;

export const axiosIntance = axios.create({
   baseURL: api_url,
   headers: {
       "Authorization": token ? `Bearer ${token}` : "",
   }
});

export const getAllComment = () => axiosIntance.get("/comment/getAllComment");
export const getComment = (commentId) => axiosIntance.get("/comment/getComment/" + commentId);
export const postComment = (form) => axiosIntance.post("/comment/create",form);
export const deleteComment = (commentId) => axiosIntance.delete("/comment/deleteComment/" + commentId);