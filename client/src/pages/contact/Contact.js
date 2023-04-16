import React, { useState}from 'react'
import Footer from "../../components/footer/Footer";
import Navbars from "../../components/navbar/Navbars";
import { useDispatch} from 'react-redux';
import { toast } from "react-toastify"
import "./contact.css"
import { createInfo } from '../../redux/features/info/infoSlice';
import BackTop from '../../components/backToTop/BackTop';

const Contact = () => {
  const initialState = {
    firstName : "",
    lastName : "",
    email : "",
    message : ""
 }

 const [formValue, setFormValue] = useState(initialState);
 const{firstName,lastName,email,message} = formValue;
 const dispatch = useDispatch();
 
 const handleSubmit = (e) =>{
       e.preventDefault()
      if (!email || !message || !firstName || !lastName) {
        toast.error("Veuillez renseigner le champs !")
      }
      else{
           dispatch(createInfo({formValue}))
           toast.success("Merci pour votre message! \n votre demande sera prise en compte!");
          }
         // setFormValue(initialState)
 }

 const handleChange = (e) =>{
   let { name, value } = e.target;
   setFormValue({ ...formValue, [name]: value });
}

  return (
    <div>
      <Navbars />
       <div className="container">
        <div className='contactNous'>
        <form onSubmit={handleSubmit}>
          <legend>Veuillez nous contacter pour toute information : </legend>
          <label htmlFor="status" className='lbel' >Nom</label>
          <div className="form-group">
            <input type="text" autoComplete="off"  className="inputs" placeholder="Nom"   name="firstName" value={firstName} onChange={handleChange}   />
          </div>
          <label htmlFor="status"className='lbel' >Prenom</label>
          <div className="form-group">
            <input type="text" autoComplete="off"  className="inputs" placeholder="Prenom"   name="lastName" value={lastName} onChange={handleChange}   />
          </div>
          <label htmlFor="status"className='lbel' >Email</label>
          <div className="form-group">
            <input type="email" autoComplete="off"  className="inputs" placeholder="Email"   name="email" value={email} onChange={handleChange}    />
          </div>
          <label htmlFor="status"className='lbel' >Message</label>
          <textarea id="textarea" className="inputs" placeholder='Votre message' name='message' value={message} onChange={handleChange}></textarea>
          <button type='submit' className='btnContact'>Envoyer</button>
        </form>
        </div>
       </div>
       <hr />
       <BackTop />
      <Footer />
    </div>
  )
}

export default Contact
