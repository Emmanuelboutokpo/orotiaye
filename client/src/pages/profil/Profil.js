/* import {useEffect, useState } from "react";
import Footer from '../../components/footer/Footer'
import Navbars from '../../components/navbar/Navbars'
import './profil.css' ;
import { Button, Form, Modal} from 'react-bootstrap';
import { getUsers } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../../img/userIcon.jpg"
import Loader from "../../components/loader/Loader";

const Profil = () => {
  const users = JSON.parse(localStorage.getItem("user"));
  const { user, isLoading } = useSelector((state) => ({ ...state.auth }));
  const [userDetail, setUserDetail] = useState({});
  const dispatch = useDispatch();
  let user_iduser = (users!==null)&& users.iduser ;
  const [show, setShow] = useState(false); 
const handleClose = () =>{ 
      setShow(false);
    
  };
  const handleShow = () => setShow(true);

      useEffect(() => {
        dispatch(getUsers(user_iduser));
      }, [dispatch, user_iduser]);

      useEffect(() => {
        if (user) {
          setUserDetail(user.result !== undefined && user.result);
        } else {
          setUserDetail([]);
        }
      }, [user]);
   
      isLoading && <Loader />
  return (
    <div>
      <Navbars />
    <div className="singlePost container">
      <div className="singlePostWrapper">
          <div className="categ">
            <h1 className="titleCat">Photo de profil</h1>
            <Button className="btnCat" onClick={handleShow} >Modifier le profil</Button>
          </div>
        {
           userDetail.img === null ? (
          <img src={userIcon} alt="userIcon" className="singlePostImg" />
        ) : <img src={userDetail.img} alt="userIcon" className="singlePostImg" />
      
      }
       <span className="singlePostAuthor">
            {userDetail.firstName} {userDetail.lastName}
        </span>
      </div>
    </div> 
    <hr />
      <Footer />
      <Modal show={show} onHide={handleShow}>
        <Modal.Header>
          <Modal.Title>Modifier la photo de profil</Modal.Title>
          <button type="button" className="btn-close improveBtn" onClick={handleClose} aria-label="close"></button>
        </Modal.Header>
        <Form /* onSubmit={handleSubmit} >
          {/* <Modal.Body>
            <Form.Group className="mb">
              <label>Photo de profil</label>
              <input
                type="file"
                name="imgMed"  
              //onChange={(e)=>{setImgMed(e.target.files[0])}}
          /*     />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
               Modifier le compte
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>  
  )
}

export default Profil
 */