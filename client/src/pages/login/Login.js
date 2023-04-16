import React,{useEffect,useState} from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { login } from "../../redux/features/auth/authSlice";
import "./login.css"
import Loader from "../../components/loader/Loader";

const Login = () => {
  const initial = {
     email : "",
     password : ""
  }

  const [formValue, setFormValue] = useState(initial);
  const [err, setError] = useState(null);
  const{email, password} = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading,isError,message} = useSelector((state) => ({ ...state.auth}));
 
  const handleSubmit = (e) =>{
       e.preventDefault();

       if (!email || !password) {
           setError("Veuillez renseigner les champs");
       }else{
           dispatch(login({formValue, navigate}))
       }

  }

  const handleChange = (e) =>{
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value })
  }

  useEffect(() => {
    isError && console.log(message);
  }, [isError,message])


isLoading && <Loader />
  return (
<>
  <div className="createCompte">
  <div className="logs">
          <Link className="oros">
             ORO TI AYE
          </Link>
        <h1 className="createTitles">Se connecter</h1>
        </div>
        {err && <p className="error">{err}</p>}  
      <form className="formLogin" onSubmit={handleSubmit}>
      <div className="form-group">
            <input type="email" autoComplete="off"  className="loginInput" placeholder="Email"   name="email" value={email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type="password" autoComplete="off"  className="loginInput" placeholder="Mot de password"   name="password" value={password} onChange={handleChange}/>
          </div>
        <button  type="submit" className="loginRegisterButton">Se connecter</button>
        <span className="spanCreate">
             N'avez pas un compter veuillez vous <Link to="/register">inscrire</Link>
        </span>
      </form>
    </div>
    </>
  );
};

export default Login;
