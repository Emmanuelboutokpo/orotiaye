import React, {useEffect,useState } from "react";
import Footer from '../../components/footer/Footer'
import Navbars from '../../components/navbar/Navbars'
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import "./info.css"
import { getAllInfos, getInfos } from "../../redux/features/info/infoSlice";
import {Modal,Table} from 'react-bootstrap';
import BackTop from "../../components/backToTop/BackTop";

const Info = () => {
  const dispatch = useDispatch();
  const [infoShow, setInfoShow] = useState([]);
  const [infoId, setInfoId] = useState(0);
  const [infoShowDetail, setInfoShowDetail] = useState([]);
  const {info,singleInfo, isLoading} = useSelector((state)=>({...state.info}));
  const [show, setShow] = useState(false); 
  const handleClose = () =>{ 
      setShow(false);
     
  };
  const handleShow = (id) =>{
   setInfoId(id)
    setShow(true);  
}

  //--------------Get All Category ------------------------
useEffect(() => {
  dispatch(getAllInfos());
}, [dispatch])

useEffect(() => {
  if (info) {
      const newCat = info.map((item) => {
          return item;
      });
      setInfoShow(newCat);
  } else {
    setInfoShow([]);
  }
}, [info]);

//---------------------------------Cut message --------------------------
const getText = (html) =>{
  return html.length > 15 ?html.substring(0,50) +'...' : html
}

//-------------------------- get info detail ---------------------------------
useEffect(() => {
    infoId !==0 && dispatch(getInfos(infoId));
  }, [dispatch, infoId])
 
  useEffect(() => {
    if (singleInfo) {
        setInfoShowDetail(singleInfo !== undefined && singleInfo);
    } else {
        setInfoShowDetail([]);
    }
  }, [singleInfo]);
  
  //--------------------------Loading ------------------------------
isLoading && <Loader />
 
  return (
  
    <div>
        <Navbars />
        <div className="container contCat">
                            <div className="categ">
                                <h1 className="titleCat">Informations utilisateurs </h1>
                            </div>
                            <Table striped bordered hover variant="dark" className="ta">
                                <thead>
                                    <tr className="stylet">
                                        <th style={{ textAlign: "center" }}>No.</th>
                                        <th style={{ textAlign: "center" }}>Nom</th>
                                        <th style={{ textAlign: "center" }}>Prenom</th>
                                        <th style={{ textAlign: "center" }}>Email</th>
                                        <th style={{ textAlign: "center" }}>Messages</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {infoShow.map((item, index) => {
                                        return (
                                            <tr key={index} onClick={() => handleShow(item.id_info)}  style={{ cursor: "pointer" }} >
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.email}</td>
                                                <td>{ getText(item.message)}</td>
                                            </tr>
                                        );
                                    })}  
                                </tbody>
                            </Table>
                        </div>
                        <hr />
                        <BackTop />
        <Footer />
          <Modal show={show} onHide={handleShow}>
              <Modal.Header>
                  <Modal.Title>Informations utilisateurs detaillées</Modal.Title>
                  <button type="button" className="btn-close improveBtn" onClick={handleClose} aria-label="close"></button>
              </Modal.Header>
              <div className="post">
                  <div className="postInfo">
                      <div className="postInf">
                          <div className="postName" style={{ marginBottom: "0.5rem" }}>
                              <b>Nom :</b> {infoShowDetail.firstName}
                          </div>
                          <div className="postFirst" style={{ marginBottom: "0.5rem" }}>
                             <b>Prenom :</b> {infoShowDetail.lastName}
                          </div>
                          <div className="postEmail" style={{ marginBottom: "0.5rem" }}>
                             <b>Email :</b> {infoShowDetail.email}
                          </div>
                          <div className="postDescs" style={{ marginBottom: "0.5rem" }}>
                            <b>Messages :</b>  {infoShowDetail.message}
                         </div>
                      </div>
                  </div>
              </div>
          </Modal>
    </div>
  )
}

export default Info
