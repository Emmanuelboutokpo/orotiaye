import  React ,{ useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import "./back.css"

const BackTop = () => {
    const [backToTop, setBackToTop] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () =>{
            if (window.scrollY > 100) {
                setBackToTop(true);
            }else{
                setBackToTop(false)
            }
        })
    }, []);
    const scrollUp = () =>{
        window.scrollTo({
            top:0,
            behavior : "smooth"
        });
    }
  return (
    <div>
      {backToTop && (
           <button className='style'
           onClick={scrollUp}  ><FaArrowUp /></button>
      )}
    </div>
  )
}

export default BackTop
