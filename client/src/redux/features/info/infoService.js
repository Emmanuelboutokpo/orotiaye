import axios from "axios";
import { API} from "../../../api";
 

 const token = window.localStorage.getItem('token');
 const api_url = API;

export const axiosIntance = axios.create({
    baseURL: api_url,
    headers: {
        "Authorization": token ? `Bearer ${token}` : ""
    }
});


export const getAllInfo = () => axiosIntance.get("/getAllInfo");
export const getInfo = (infoId) => axiosIntance.get("/getInfo/" + infoId);
export const postInfo = (formValue) => axiosIntance.post("/addInfo",formValue);
