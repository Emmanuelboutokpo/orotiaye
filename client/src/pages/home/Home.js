import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbars from "../../components/navbar/Navbars";
import Post from "../../components/post/Post";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import {   useLocation } from "react-router-dom";
import { API } from "../../api";
import axios from "axios";
import "./home.css"
import BackTop from "../../components/backToTop/BackTop";
const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);
  const [pages, setPages] = useState(0);

   //-----------------Get All Post ----------------------------
useEffect(() => {
  const fetchData = async () => {
    try {
     const api = API
          const res = await axios.get(`${api}/post/getAllPost${search?`${search}&page=${page}&limit=${limit}`:`?page=${page}&limit=${limit}`}`)
          setPosts(res.data); 
          setPage(res.data.page);
          setPages(res.data.totalPage);
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();
}, [search,setPosts,limit,page]);

posts.length === 0 && <p>Loading....</p>

  return (
    <>
       <Navbars />
         <div className="home">
          <Header />
           <div className="AllHome">
           <Post posts={posts} setPosts ={setPosts} pages={pages} setPages ={setPages} page={page} setPage={setPage} limit={limit} search = {search} />  
          <Sidebar />
           </div>
      </div>
      <hr />
      <BackTop />
      <Footer/>
    </>
  );
};

export default Home;
