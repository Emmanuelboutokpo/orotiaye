import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRouteLogin from './components/hoc/PrivateRouteLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './pages/about/About';
import Category from './pages/category/Category';
import Contact from './pages/contact/Contact';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Single from './pages/single/Single';
import Info from './pages/info/Info';
import Write from './pages/write/Write';
import { isUserLoggedIn } from './redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { getCat } from './redux/features/category/categorySlice';
import { getAllPosts } from './redux/features/Post/postSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLoggedIn());
    dispatch(getCat());
    dispatch(getAllPosts())
  }, [dispatch]);
  return (
    <>     
    <ToastContainer />
         <Router>
        <Routes>        
          <Route exact path='/' element={<Home />} />  
              <Route exact path='/' element={<PrivateRouteLogin />}>
              <Route exact path='/login' element={<Login />} />
            </Route> 
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/info' element={<Info />} />
            <Route exact path='/category' element={<Category />} />
            <Route exact path='/contact' element={<Contact />} />
            <Route exact path='/register' element={<Register/>} />
            <Route exact path='/post/:id' element={<Single />} />
            <Route exact path='/write' element={<Write/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
