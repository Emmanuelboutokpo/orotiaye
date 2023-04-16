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


export const getAllCat = () => axiosIntance.get("/getAllCategory");
export const postCat = (form) => axiosIntance.post("/addCat",form);
export const deleteCat = (catId) => axiosIntance.delete("/deleteCategory/" + catId);
