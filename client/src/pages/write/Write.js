import React, { useState } from "react";
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbars from "../../components/navbar/Navbars";
import { createPost, getAllPosts, updatePost } from "../../redux/features/Post/postSlice";
import "./write.css"
import Banner from "../../components/banner/Banner";
import BackTop from "../../components/backToTop/BackTop";

const Write = () => {
  const state = useLocation().state;
  const [titlePost, setTitlePost] = useState(state?.titlePost || "");
  const [value, setValue] = useState(state?.description || "");
  const [imgPost, setImgPost] = useState(null);
  const [readtime, setReadtime] = useState(state?.readtime || 1);
  const [category_idCat, setCategory_idCat] = useState(state?.idCat || "");
  const navigate = useNavigate()
  const { categorie } = useSelector((state) => ({ ...state.cat }));
  const dispatch = useDispatch();

  //------------------------  Create and edit Post ------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const getUserId = JSON.parse(localStorage.getItem("user"));

    if (getUserId !== null) {
      const user_iduser = getUserId.iduser;
      const formData = new FormData();
      console.log(readtime);
      if (!titlePost || !value || !category_idCat || !imgPost || !user_iduser || !readtime) {
        toast.error("Veuillez renseigner le champs !")
      } else if (!state) {
        formData.append("titlePost", titlePost);
        formData.append("description", value);
        formData.append("category_idCat", category_idCat);
        formData.append("imgPost", imgPost);
        formData.append("readtime", readtime);
        formData.append("user_iduser", user_iduser)
        dispatch(createPost(formData));
        toast.success("votre post a été crééé avec succès !")
        navigate("/")
      } else {
        let idPost = state.idpost;
        dispatch(updatePost({ idPost, titlePost, value, category_idCat, imgPost,readtime, user_iduser }));
        toast.success("votre post a été modifiée avec succès !")
        navigate("/")
      }
      dispatch(getAllPosts());
    }
  }
//----------------------------Render ------------------------------------------
  return (
    <>
      <Navbars />
      <Banner />
      <div className="container contPost">
        <div >
         <h2 className="postArticle">Poster un article</h2>
          <form className="add" onSubmit={handleSubmit}>
            <div className="contents">
              <input
                type="text"
                placeholder="Title"
                value={titlePost}
                onChange={(e) => { setTitlePost(e.target.value) }}
              />
              <div className="editorContainer">
                <ReactQuill
                  className="editor"
                  theme="snow"
                  value={value}
                  onChange={setValue}
                />
              </div>
            </div>
            <div className="menu">
              <div className="item">
                <h1>Categories</h1>
                <div className="cat">
                  <select value={category_idCat} onChange={(e) => setCategory_idCat(e.target.value)}>
                    <option>Selectionner une catégorie</option>

                    {
                      categorie.map((item, id) => (
                        <option key={id} value={item.idCat}>{item.catName}</option>
                      ))
                    }
                  </select>
                   <input type="number" value={readtime} min={1} className="readTime"  onChange={(e) => setReadtime(e.target.value)} />
                </div>
              </div>
              <div className="item">
                <h1>Publier</h1>
                <span>
                  <b>Statut: </b> Brouillon
                </span>
                <span>
                  <b>Visibilité: </b> Publique
                </span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  name=""
                  onChange={(e) => {setImgPost(e.target.files[0]) }}
                />
                <label className="file" htmlFor="file">
                  Uploader une image
                </label>
                <div className="buttons">
                  <button className="button1">Brouillon</button>
                  <button className="button2" type="submit">{state ? "Modifier" : "Publier"}</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
        <hr />
        <BackTop />
        <Footer />
    </>
  );
};

export default Write;
