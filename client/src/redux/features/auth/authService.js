import axios from "axios";
import { API } from "../../../api";

const token = window.localStorage.getItem("token");
const api_url = API;

export const axiosInstance = axios.create({
    baseURL : api_url,
    headers : {
         "Authorization" : token ? `Bearer${token}` : ""
    }
});

export const signIn = (formValue) => axiosInstance.post("/signin", formValue);
export const signUp = (formData) => axiosInstance.post("/signup", formData);
export const getUser = (userId) => axiosInstance.get("/getUser/" + userId);
