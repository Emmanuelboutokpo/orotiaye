import React, { useRef,useState, useEffect}from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createComment, deleteComments,  getComments, updateComment } from '../../redux/features/comment/commentSlice';
import { FaTrashAlt,FaEdit } from "react-icons/fa";
import userIcon from "../../img/userIcon.jpg"
import "./comment.css"
import moment from "moment";
 
const Comment = () => {
  const initial = {
    idcomment : "",
    content : "",
    user_iduser:"",
    post_idpost : "" 
  };  


  const [formValue, setFormValue] = useState(initial);
  const {content,idcomment} = formValue; 
  const textRef = useRef();
  const [err, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const {comment, isLoading} = useSelector((state)=>({...state.comments}));
  const location = useLocation();
  const post_idpost = location.pathname.split("/")[2];

  //--------------Get All Category ------------------------
  useEffect(() => {
      try {
          dispatch(getComments(post_idpost));
      } catch (error) {
           console.log(error);
      }
   
  }, [dispatch,post_idpost])
  
  useEffect(() => {

     if (comment) {
          const newCat = comment.map((item) => {
              return item;
          });
          setComments(newCat);
      } else {
        setComments([]);
      } 
  }, [comment]);
  
  //------------------------  Create and edit Category ------------------------

  const handleSubmit = (e) => {
      e.preventDefault();
    const getUserId = JSON.parse(localStorage.getItem("user"));
     
      if (getUserId !== null) {
        const user_iduser = getUserId.iduser;
         if (content === "" || content === undefined) {
                  setError("Veuillez renseigner le champs !")
              }
           else if (!idcomment || e.key === "Enter") {
                  dispatch(createComment({ content, user_iduser,post_idpost}));
              }else{
                   dispatch(updateComment(formValue));
              }  
              setFormValue(initial);
              dispatch(getComments(post_idpost));  
          }
 
      }
  
  const handleChange = (e) =>{
   let { name, value } = e.target;
   const target = e.target;
   textRef.current.style.height = "50px";
   textRef.current.style.height = `${target.scrollHeight}px`;
   setFormValue({ ...formValue, [name]: value })  
  }
  
    const editComment = (idcomment,content) =>{
      setFormValue({idcomment,content});
   }    
  
  //-------------------------Delete category ------------------------
   const delComment = (id) => {
      const  isDelete = window.confirm("Voulez vous supprimer votre commentaire ?");
       if (isDelete === true) {
           dispatch(deleteComments(id));
      }
      dispatch(getComments(post_idpost));
   }
  
    //-----------------Loading ---------------------------------------
    if (isLoading) {
      return <p>Loading....</p>
  }

  return (
    <div className='comment'>
         <h1 className="commentTitle">{ idcomment? "Modifier le commentaire":"Laisser un commentaire"}</h1>
           {err&& <p>Veuillez commenter</p>}
         <form onSubmit={handleSubmit}>
             <textarea name="content" className="textarea" placeholder='Votre commentaire...'  value={idcomment?content:content} ref={textRef}  onChange={handleChange}></textarea>
             <button type="submit" className='btnComment'>{ idcomment? "Soumettre":"Commenter"}</button>
         </form>
           
           <div className="contentComment">
            { comments.length === 0 && <p className='commentInfo'> Pas de commentaire pour ce post soyez le premier à commenter cet article</p>}
             {
                comments.map((item,id) =>(
                <div className="commentInfo" key={id}>
                  <div className="user">
                     {item.img ? <img
                       src={item.img}
                      alt=""
                   /> : 
                <img alt="Bruno Bourdier" 
                    src={userIcon}
                     className="app-components-comments-comment_profile-styles__avatar" height="40" width="40"/>
                }
                      <div className="infoComment">
                        <span>{item.firstName} </span>
                        <span>{item.lastName}</span>
                      </div>
                
                  </div>
                   <div className="commentContent">
                        <p className="cmmnt">
                            {
                                item.content
                            }
                        </p>
                      <div className="delEdit">
                          <p className='posteAt'>Posted {moment(item.createsAt).fromNow()}</p>  
                          <div>
                        <button
                          className="btn-editComment"
                          onClick={(e) => editComment(item.idcomment, item.content)}
                          title='Editer'
                        > <FaEdit />
                        </button>
                        <button
                          className="btn-deleteComment"
                          title='Supprimer'
                          onClick={(e) => delComment(item.idcomment)}
                        >
                          <FaTrashAlt />
                        </button>
                          </div>
                      </div>
                   </div>
                </div>
                )) 
             }
           </div>
           
    </div>
  )
}

export default Comment
