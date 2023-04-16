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

export const postLike = ({post_idpost, user_iduser}) => axiosIntance.post("/like",{post_idpost, user_iduser});
 