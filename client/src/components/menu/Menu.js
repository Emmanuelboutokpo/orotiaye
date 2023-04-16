import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import { API } from "../../api";
import "./menu.css"
const Menu = ({cat}) => {
const [posts, setPosts] = useState([]);

   //-----------------Get All Post ----------------------------
useEffect(() => {
    const fetchData = async () => {
      try {
       const api = API
         if (cat !== undefined) {
            const res = await axios.get(`${api}/post/getAllPost?catName=${cat }`)
            setPosts(res.data.result);
         }  
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menuCat">
      <h1>Voir d'autre publication</h1>
      {
           posts.map((post,id) => (
      <div className="postDetail" key={id}>
          <img className="imgDetail" src={post.imgPost} alt={post.titlePost}/>
           <div className="detail"> 
           <Link className="titleDetail" to={`/post/${post.idpost}`}>
                <h1>{post.titlePost}</h1>
             </Link>
            <p className="aboutPara">{post.catName}</p>
           </div>
        </div>         
          ))
      }    
    </div>
  );
};

export default Menu;
