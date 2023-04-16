import React from 'react'
import BackTop from '../../components/backToTop/BackTop';
import Footer from "../../components/footer/Footer";
import Navbars from "../../components/navbar/Navbars";
import "./about.css"
const About = () => {
  return (
    <div>
        <Navbars />
               <div className="imgAbout">
                   <img src="https://images.pexels.com/photos/208397/pexels-photo-208397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
               </div>
          <div className="container">
              <h2 className='about'>A Propos de Oro ti ayé</h2>
              <p className='aboutPara' >
                  En tant que chrétiens, nous sommes tous conscients de la noble mission qui nous a été confirmée par Christ celle de :<br /> « Allez dans le monde entier et prêchez l’Évangile ».
              </p>
              <p className='aboutPara' >
                S’avère être un défi pour les chrétiens de nos jours,  « Oro ti ayé » se propose alors de vous accompagner à relever très facilement ledit défi.
              </p>
              <p className='aboutPara' >
               Créée en 2017, « Oro ti ayé » est une plateforme numérique biblique  ayant pour vocation d'inspirer, de former, et d'équiper les chrétiens
               à  parler de Jesus Christ aux personnes.
              </p>
              <p className='aboutPara' >
               Sa mission première est  de servir et d’équiper les chrétiens ainsi que les églises locales dans leurs efforts d’évangélisation.
               </p>
               <p className='aboutPara' >
               Site de référence, il distille des enseignements bibliques, des publications sur plusieurs sujet bibliques, des pensées journalières et conseils pour mieux faire face aux difficultés existentielles
              </p>
              <p className='aboutPara' >
                Soyons et demeurons toujours dans l'amour de Dieu... Shalom!
              </p>
          </div>
              <hr />
              <BackTop />
         <Footer/>
    </div>
  )
}

export default About
