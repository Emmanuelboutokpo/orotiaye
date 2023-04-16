import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate}  from "react-router-dom";
import Loader from '../../components/loader/Loader';
import { register } from '../../redux/features/auth/authSlice';
import "./register.css"
import { toast } from "react-toastify"

/* import { useState } from "react"; */
 
/* import axios from "axios"; */

const Register = () => {
/*   const initialState = {
     firstName : "",
     lastName : "",
     email : "",
     password : ""
  } */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(null);
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state)=>({...state.auth}));

  //const [category_idCat, setCategory_idCat] = useState(state?.idCat || "");
  //const navigate = useNavigate()
  //const { categorie } = useSelector((state) => ({ ...state.cat }));


  //const [formValue, setFormValue] = useState(initialState);
  //const{firstName,lastName,email,password} = formValue;
  //const [err, setError] = useState(null);
 // const dispatch = useDispatch();
  const handleSubmit = (e) =>{
        e.preventDefault()
        const formData = new FormData();
        if (!firstName || !lastName || !email || !password || !img) {
          toast.error("Veuillez renseigner le champs !")
        } else{
          formData.append("firstName", firstName);
          formData.append("lastName", lastName);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("img", img);
          dispatch(register({formData, navigate}))
          toast.success("votre post a été crééé avec succès !")
          //navigate("/")
        }
/* 
       if (!email || !password || !firstName || !lastName) {
         setError("Veuillez renseigner les champs");
       }
       else{
            dispatch(register({formValue, navigate}))
       } */
  }
/* 
  const handleChange = (e) =>{
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
}
*/
 isLoading && <Loader /> 

  return (
    <>
  
      <div className="register">
      <div className="log">
          <Link className="oros">
             ORO TI AYE
          </Link>
        <h1 className="createTitle">Créer un compte</h1>
        </div>
         {/* {err && <p className='error'>{err}</p>}   */}
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input type="text" autoComplete="off"  className="loginInput" placeholder="Nom"   name="firstName" value={firstName}  onChange={(e) => { setFirstName(e.target.value) }}  />
          </div>
          <div className="form-group">
            <input type="text" autoComplete="off"  className="loginInput" placeholder="Prenom"   name="lastName" value={lastName} onChange={(e) => { setLastName(e.target.value) }}  />
          </div>
          <div className="form-group">
            <input type="email" autoComplete="off"  className="loginInput" placeholder="Email"   name="email" value={email}  onChange={(e) => { setEmail(e.target.value) }}  />
          </div>
          <div className="form-group">
            <input type="password" autoComplete="off"  className="loginInput" placeholder="Mot de password"   name="password" value={password}  onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <div className="form-group">
            <input type="file" autoComplete="off"  className="loginInput" name="img" onChange={(e)=>{setImg(e.target.files[0])}} />
          </div>
          <button className="loginRegisterButton">Register</button>
          <span className="spanCreate">
           Avez-vous un compte?  <Link to="/login">Se connecter</Link>
          </span>
        </form>
      </div>

    </>
  );
};

export default Register;
