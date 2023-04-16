import React, { useState,useEffect} from "react";
import { Link, Outlet,useNavigate} from "react-router-dom";
import { Button, Form, Modal} from 'react-bootstrap';
import { FaBars, FaPhotoVideo, FaSignOutAlt, FaTimes} from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { getUsers, reset} from "../../redux/features/auth/authSlice";
import Dropdown from "react-bootstrap/Dropdown"
import "./navbar.css"
import userIcon from "../../img/userIcon.jpg"
import { toast } from "react-toastify"
import axios from "axios";
import { API } from "../../api";

const Navbars = () => {
   const [showButton, setshowButton] = useState(false);
   const handleClick = () => setshowButton(!showButton);
   const token = window.localStorage.getItem("token");
   const [show, setShow] = useState(false); 
   const users = JSON.parse(localStorage.getItem("user"));
   const { user} = useSelector((state) => ({ ...state.auth }));
   const dispatch = useDispatch();
   const [userDetail, setUserDetail] = useState({});
   let iduser = (users!==null)&& users.iduser ;
   const navigate = useNavigate();
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [img, setImg] = useState(null);

   //-------------------------- Get user -----------------------------------
       useEffect(() => {
         dispatch(getUsers(iduser));
       }, [dispatch, iduser]);
 
       useEffect(() => {
         if (user) {
           setUserDetail(user.result !== undefined && user.result);
         } else {
           setUserDetail([]);
         }
       }, [user]);
 
   const handleClose = () =>{ 
         setShow(false);
       
     };
     const handleShow = () => setShow(true);
   
   //------------------------- Update profil -----------------------------
     const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      if (!firstName || !lastName || !email || !password || !img) {
        toast.error("Veuillez renseigner le champs !")
      } else{
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("img", img);

        const fetchData = async () => {
         try {
                const api = API
                const res = await axios.put(`${api}/update/${iduser}`, formData)
             return res.result
         } catch (err) {
           console.log(err);
         }
       };
       fetchData();
        toast.success("votre profil a été modifié avec succès !")
       navigate("/")
      }
      handleClose()  
  }

  //--------------------Logout ------------------------------------------------------
   const handleLogout = () => {
      alert("Voulez-vous vous deconnecter?");
      dispatch(reset())
   }


   return (
      <div className="barDeMenu">
         <div className="logo">
            <Link to="/" className="oro">
               ORO TI AYE
            </Link>
         </div>
         <button onClick={handleClick} className="hide">{showButton === false ? <FaBars /> : <FaTimes />}</button>
         {showButton && <div className="links" >
            <Link className="link" to="/">
               Accueil
            </Link>
            {
                  (token === null || users === null) ?
                  <Link className="link" to="/about">A propos</Link>
                  :
                  (token && users.role === "ADMIN") ?
                      <Outlet />:
                     <Link className="link" to="/about">A propos</Link>
                     
            }
            {
                  (token === null || users === null) ?
                  <Link className="link" to="/contact"> Contactez-nous </Link>    :
                  (token && users.role === "ADMIN") ?
                     <Link className="link" to="/info">Informations utilisateurs</Link> :
                     <Link className="link" to="/contact"> Contactez-nous </Link>   
            }
           {
               (token === null || users === null) ?
                  <Outlet /> :
                  (token && users.role === "ADMIN") ?
                     <Link className="link" to="/category">Catégories</Link> :
                     <Outlet />
            }
            {
               (token === null || users === null) ?
                  <Outlet /> :
                  (token && users.role === "ADMIN") ?
                     <Link className="link" to="/write">Post</Link> :
                     <Outlet />
            }
            {
               (token === null || users === null) ?
                  (<Link className="link" to="/login"> Inscrire</Link>) :
                  (
                     <>
                        <Dropdown>
                             <Dropdown.Toggle variant="default" id="dropdown-basic"> 
                                   <img src={userDetail.img ===null?userIcon : userDetail.img} alt=""  className="dropdown-img"/>  {userDetail.lastName}
                              </Dropdown.Toggle>        
                              <Dropdown.Menu>
                                 <Dropdown.Item href='#' onClick={handleShow}><FaPhotoVideo /> {userDetail.img !==null  ? 'Modifier votre profil' : ''} </Dropdown.Item>   
                                 <Dropdown.Item href='/' onClick={handleLogout}><FaSignOutAlt/> Deconnexion</Dropdown.Item>   
                              </Dropdown.Menu>                
                        </Dropdown>
                  </>
                  )
            }
            
         </div>
      }

         <div className="linksDesktop" >
            <Link className="linkDesktop" to="/">
               Accueil
            </Link>
            {
                  (token === null || users === null) ?
                  <Link className="linkDesktop" to="/about">A propos</Link> :
                  (token && users.role === "ADMIN") ?
                      <Outlet />:
                     <Link className="linkDesktop" to="/about">A propos</Link>
                     
            }
            {
                  (token === null || users === null) ?
                  <Link className="linkDesktop" to="/contact"> Contactez-nous </Link> :
                  (token && users.role === "ADMIN") ?
                     <Link className="linkDesktop" to="/info">Informations utilisateurs</Link> :
                     <Link className="linkDesktop" to="/contact"> Contactez-nous </Link>
                     
            }
           
         {
               (token === null || users === null) ?
                  <Outlet /> :
                  (token && users.role === "ADMIN") ?
                     <Link className="linkDesktop" to="/category">Catégories</Link> :
                     <Outlet />
            }
            {
               (token === null || users === null) ?
                  <Outlet /> :
                  (token && users.role === "ADMIN") ?
                     <Link className="linkDesktop" to="/write">Post</Link> :
                     <Outlet />
            }
            {
               (token === null || users === null) ?
                  (<Link className="linkDesktop" to="/login"> Inscrire</Link>) :
                  (
                     <>
                        <Dropdown>
                             <Dropdown.Toggle variant="default" id="dropdown-basic"> 
                             <img src={userDetail.img ===null?userIcon : userDetail.img} alt=""  className="dropdown-img"/> {userDetail.lastName}
                              </Dropdown.Toggle>        
                              <Dropdown.Menu>
                                 <Dropdown.Item href='#' onClick={handleShow}><FaPhotoVideo /> {userDetail.img !==null  ? 'Modifier votre profil' : ''} </Dropdown.Item> 
                                 <Dropdown.Item href='/' onClick={handleLogout}><FaSignOutAlt/> Deconnexion</Dropdown.Item>   
                              </Dropdown.Menu>                
                        </Dropdown>
                     </>
                  )
            }  
         </div>
         <Modal show={show} onHide={handleShow}>
            <Modal.Header>
               <Modal.Title>Modifier votre profil</Modal.Title>
               <button type="button" className="btn-close improveBtn" onClick={handleClose} aria-label="close"></button>
            </Modal.Header>
            <Form onSubmit={handleSubmit} >
               <Modal.Body>
                  <Form.Group className="mb">
                     <label>Nom</label>
                     <input
                        type="text"
                        name="firstName"
                        placeholder={userDetail.firstName}  
                         onChange={(e) => { setFirstName(e.target.value) }}
                        autoFocus
                        className="inputs"
                     />
                  </Form.Group>
                  <Form.Group className="mb">
                     <label>Prenom</label>
                     <input
                        type="text"
                        name="lastName" 
                        placeholder={userDetail.lastName} 
                        onChange={(e) => { setLastName(e.target.value) }}
                        autoFocus
                        className="inputs"
                     />
                  </Form.Group>
                  <Form.Group className="mb">
                     <label>Email</label>
                     <input
                        type="email"
                        name="email" 
                        placeholder={userDetail.email}  
                        onChange={(e) => { setEmail(e.target.value) }}
                        autoFocus
                        className="inputs"
                     />
                  </Form.Group>
                  <Form.Group className="mb">
                     <label>Mot de passe</label>
                     <input
                        type="password"
                        name="password" 
                        onChange={(e) => { setPassword(e.target.value) }}
                        autoFocus
                        className="inputs"
                     />
                  </Form.Group>
                  <Form.Group className="mb">
                     <label>Choisissez une photo </label>
                     <input
                        type="file"
                        onChange={(e)=>{setImg(e.target.files[0])}}
                     />
                  </Form.Group>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                     Annuler
                  </Button>
                  <Button type="submit" variant="primary">
                     Modifier le profil
                  </Button>
               </Modal.Footer>
            </Form>
         </Modal>
      </div>
   );
}

export default Navbars
