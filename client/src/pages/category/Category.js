import React, { useState, useEffect } from "react";
import { Button, Form, Modal,Table} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Navbars from "../../components/navbar/Navbars";
import { toast } from "react-toastify"
import { createCat, deleteCatgry, getCat, updateCatgry } from "../../redux/features/category/categorySlice";
import "./category.css"
import Loader from "../../components/loader/Loader";
import BackTop from "../../components/backToTop/BackTop";

const Category = () => {
  const initial = {
    idCat : "",
    catName : ""
};

const [formValue, setFormValue] = useState(initial);
const {idCat,catName} = formValue;
const [catContent, setCatContent] = useState([]);
const dispatch = useDispatch();
const {categorie, isLoading} = useSelector((state)=>({...state.cat}));
const [show, setShow] = useState(false); 
const handleClose = () =>{ 
      setShow(false);
      setFormValue(initial)
  };
  const handleShow = () => setShow(true);

//--------------Get All Category ------------------------
useEffect(() => {
    dispatch(getCat());
}, [dispatch])

useEffect(() => {
    if (categorie) {
        const newCat = categorie.map((item) => {
            return item;
        });
        setCatContent(newCat);
    } else {
        setCatContent([]);
    }
}, [categorie]);

//------------------------  Create and edit Category ------------------------

const handleSubmit = (e) => {
    e.preventDefault();
    if (catName === "" || catName === undefined) {
        toast.error("Veuillez renseigner le champs !")        
    }
 else if (!idCat) {
      dispatch(createCat({ catName }));      
      //toast.success("Catégorie a été créée avec succes !")    
      dispatch(getCat());    
    }else{
         dispatch(updateCatgry(formValue));
         //toast.success("Catégorie a été modifiée avec succes !")    
         dispatch(getCat());    
    }  
    handleClose()
    setFormValue(initial);
}

const handleChange = (e) =>{
let { name, value } = e.target;
setFormValue({ ...formValue, [name]: value })
}

const editUser = (idCat,catName) =>{
    setFormValue({idCat,catName});
    console.log(idCat,catName);
     handleShow()
 }

//-------------------------Delete category ------------------------
const onDeleteCategory = (id) => {
    const  isDelete = window.confirm("Voulez vous supprimer cette catégorie ?");
     if (isDelete === true) {
         dispatch(deleteCatgry(id));
        toast.success("Catégorie a été supprimée avec succes !")        
    }
     dispatch(getCat());
 }

  //-----------------Loading ---------------------------------------
  if (isLoading) {
    return  <Loader />
}

//-----------------Render --------------------------------------------
  return (
    <div>
       <Navbars />
                        <div className="container contCat">
                            <div className="categ">
                                <h1 className="titleCat">Catégories </h1>
                                <Button className="btnCat" onClick={handleShow} >Ajouter une catégorie</Button>
                            </div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr className="stylet">
                                        <th style={{ textAlign: "center" }}>No.</th>
                                        <th style={{ textAlign: "center" }}>Name</th>
                                        <th style={{ textAlign: "center" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody  style={{ textAlign: "center" }}>
                                    {catContent.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.catName}</td>
                                                <td>
                                                    <button 
                                                    className="btn-edit" 
                                                    onClick={(e) =>editUser(item.idCat, item.catName)}
                                                    >Edit
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                       onClick={(e) => onDeleteCategory(item.idCat)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}  
                                </tbody>
                            </Table>
                        </div>
                        <hr />
                <BackTop />
       <Footer/>
       <Modal show={show} onHide={handleShow}>
                <Modal.Header>
                    <Modal.Title>{idCat?"Modifier la catégorie":"  Ajouter une nouvelle catégorie"} </Modal.Title>
                    <button type="button" className="btn-close improveBtn" onClick={handleClose} aria-label="close"></button>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>La catégorie</Form.Label>
                            <input
                                type="text"
                                name="catName"
                                value={idCat?catName:catName}
                                onChange={handleChange}
                                placeholder= {idCat?"Modifier votre categorie":"Ajouter votre categorie"}  
                                autoFocus
                                className="inputs"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                           {idCat?"Modifier":"Ajouter"} 
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
    </div>
  )
}

export default Category
