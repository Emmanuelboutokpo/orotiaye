import {configureStore} from "@reduxjs/toolkit"
import  authSlice  from "../features/auth/authSlice";
import categorySlice  from "../features/category/categorySlice";
import commentSlice from "../features/comment/commentSlice";
import infoSlice from "../features/info/infoSlice";
import likeSlice from "../features/like/likeSlice";
import postSlice from "../features/Post/postSlice";


export const store = configureStore({
     reducer : {
        auth : authSlice,
        cat : categorySlice,
        post : postSlice,
        comments : commentSlice,
        like : likeSlice,
        info:infoSlice
     }
})