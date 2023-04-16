import "./header.css";
import Carousel from 'react-bootstrap/Carousel'

export default function Header() {
  return (
     <div className="header">
       
   <Carousel>
      <Carousel.Item>
    {/*   <img
        className="headerImg"
        src="https://images.pexels.com/photos/935944/pexels-photo-935944.jpeg"
        alt=""
      /> */}
      <div className="headerImg"></div>
      <Carousel.Caption>
          <p className="paraCarousel">Que ce livre de la loi ne s'éloigne point de ta bouche; médite-le jour et nuit, pour agir fidèlement selon tout ce qui y est écrit; 
            car c'est alors que tu auras du succès dans tes entreprises, c'est alors que tu reussiras.</p>
           <p>Josué 1 : 8</p>
      </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="headerImg1"></div>
      <Carousel.Caption>
          <p className="paraCarousel">Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit, et enseignez-leur à observer tout
           tout ce que je vous ai prescrit. Et voici, je suis avec tous les jours, jusqu'à la fin du monde.
          </p>
          <p>Mathieu 28 : 19-20</p>
      </Carousel.Caption>
      </Carousel.Item> 
      <Carousel.Item>
      <div className="headerImg2"></div>
      <Carousel.Caption>
      <p className="paraCarousel"> Au commencement était la Parole, et la Parole était avec Dieu, et la parole était Dieu. Elle était au commencement avec Dieu.
          </p>
          <p>Jean 1: 1-2</p>
      </Carousel.Caption>
      </Carousel.Item> 
   </Carousel>
    </div> 
  );
}
