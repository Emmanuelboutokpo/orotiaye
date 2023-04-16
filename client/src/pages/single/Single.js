import React, { useState, useEffect } from "react";
import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { API } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Menu from "../../components/menu/Menu";
import Navbars from "../../components/navbar/Navbars";
import Comment from "../../components/comment/Comment";
import { deletePosts, getPosts } from "../../redux/features/Post/postSlice";
import DOMPurify from "dompurify";
import { FaRegHeart,FaHeart,FaShareAlt,FaFacebook,FaYoutube,FaInstagram,FaTwitter} from "react-icons/fa";
import "./single.css"
import {createLike} from "../../redux/features/like/likeSlice";
import Loader from "../../components/loader/Loader";
import BackTop from "../../components/backToTop/BackTop";

const Single = () => {
  const [showButtonComment, setshowButtonComment] = useState(false);
  const handleComment = () => setshowButtonComment(!showButtonComment);
  const [showShare, setshowShare] = useState(false);
  const handleShare = () => setshowShare(!showShare);
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")
  const [postDetail, setPostDetail] = useState({});
   const [likeIt, setLikeIt] = useState([]);
  const dispatch = useDispatch();
  const { singlePost, isLoading } = useSelector((state) => ({ ...state.post }));
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  moment.locale("fr")
  //-----------------Get All Post ----------------------------
  useEffect(() => {
    dispatch(getPosts(postId));
  }, [dispatch, postId])
 
 useEffect(() => {
    const fetchData = async () => {
      try {
       const api = API
            const res = await axios.get(`${api}/like?post_idpost=${postId}`)
            setLikeIt(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId ]);

  useEffect(() => {
    if (singlePost) {
      setPostDetail(singlePost.result !== undefined && singlePost.result);
    } else {
      setPostDetail([]);
    }
  }, [singlePost]);

  //-------------------------Delete Post ------------------------
  const handleDelete = () => {
    const isDelete = window.confirm("Voulez vous supprimer cette catégorie ?");
    if (isDelete === true) {
      dispatch(deletePosts(postId));
    }
    navigate("/")
  }

  //-------------------------Like && Dislike feature -------------------------
  const handleLike = (id) => {
    if (user !==null) {
     let user_iduser = user.iduser
      let post_idpost = parseInt(id)
      dispatch(createLike({post_idpost, user_iduser}))
    }
    window.location.reload()
};
    
  //------------------- Loading ---------------------------------------------------
  if (isLoading) {
    return   <Loader />
  }

  return (
    <>
      <Navbars />
      <div className="container">
        <div className="single">
          <div className="contentSingle">
            <img className="imgSingle" src={postDetail.imgPost} alt={postDetail.catName} />
            <h1 className="titleUser">{postDetail.titlePost}</h1>
            <p
              className="descUser"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(postDetail.description),
              }}
            >
            </p>
            <div className="userSingle">
              <div className="infoUser">
                <p>il y a  {moment(postDetail.dates).fromNow()}  </p>
              </div>

              {
                (token === null || user === null) ?
                  <Outlet /> :
                  (token && user.role === "ADMIN") ?
                    <div className="editUser">
                      <Link to={`/write?edit=2`} state={postDetail} title="Modifier">
                        <img src={Edit} alt="" className="imgEditDelUser" />
                      </Link>
                      <img onClick={handleDelete} className="imgEditDelUser" src={Delete} alt="" title="Supprimer" />
                    </div> :
                    <Outlet />
              }

            </div>
            <div className="likeIt">
              <div className="like" onClick={() => handleLike(postDetail.idpost)}>
                {likeIt.length !== 0 ? <FaHeart color="red" /> : <FaRegHeart />} {likeIt.length && likeIt.length}
              </div>
              <div className="like" onClick={handleShare}>
                <FaShareAlt /> Partager
              </div>
              <div className="like" onClick={handleComment} title='Commentaires'>
                &#128172;
              </div>
            </div>
            <hr className="clearTrait" />
              {showShare &&  <div className="header-top-first clearfix">
                  <ul className="social-links circle small clearfix hidden-sm-down">
                    <li className="twitter"> <a href='https://mobile.twitter.com'  title="Twitter" target="_blank" rel="noreferrer"><FaTwitter /></a></li>
                    <li className="youtube"> <a href='https://m.youtube.com' title="YouTube"  target="_blank" rel="noreferrer"><FaYoutube /></a></li>
                    <li className="facebook"> <a href='https://m.facebook.com'  title="Facebook" target="_blank"rel="noreferrer" ><FaFacebook/></a></li>
                    <li className="instagram"> <a href='https://www.instagram.com'  title="Instagram" target="_blank" rel="noreferrer"><FaInstagram/></a></li>
                  </ul>
              </div>}
            {showButtonComment && <><hr className="trait1" /> <Comment /><hr className="trait" /></>}
          </div>
        {  <Menu cat={postDetail.catName} />}  
        </div>
      </div>
        <hr />
        <BackTop />
        <Footer />
    </>
  );
};

export default Single;
