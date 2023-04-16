import React, { useEffect, useState } from "react";
/* import axios from "axios"; */
import { Link} from "react-router-dom";
/* import { API } from "../../api"; */
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { getCat } from "../../redux/features/category/categorySlice";
import Loader from "../loader/Loader";
export default function Sidebar() {
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch() ;
  const {categorie, isLoading} = useSelector((state) => ({...state.cat}));
   //-----------------Get All Post ----------------------------
 useEffect(() => {
  dispatch(getCat());
}, [dispatch])

useEffect(() => {
  if (categorie) {
      const newCat = categorie.map((item) => {
          return item;
      });
      setCat(newCat);
  } else {
    setCat([]);
  }
}, [categorie]); 

isLoading && <Loader />
//-----------------------------Get cat -----------------------------------------
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        {cat && <span className="sidebarTitle">LES CATEGORIES D'ARTICLE</span>}
        <ul className="sidebarList">
        {cat.map((c, id) => (
          <li className="sidebarListItem" key={id}>
            <Link className="link"  to={`/?catName=${c.catName}`}>
                {c.catName}
            </Link>
          </li>
            ))}
           
        </ul>
      </div>
    </div>
  );
}
