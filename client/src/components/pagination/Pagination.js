import React from 'react'
import "./pagination.css"
const Pagination = ({posts, setPosts}) => {
  console.log(posts);
 const showPag = () =>{   
/*   if (posts.page > 1) {
   return (<li>
      <a href={`/?page = ${posts.page-1}`}> « </a>
    </li>)
   } */
   for (let i=0; i<= 2; i++) {
/*     if (i===1) {
      return(<li>
        <a href={`/?page=${i}`}>{i}</a>
      </li>)
     } */

   // console.log(<a href={`/?page = ${i}`}> {i} </a>);
  }
/*   if (posts.page < posts.numberOfPage) {
   return(<li>
      <a href={`/?page = ${posts.page+1}`}>»</a>
    </li>)
   } */
  }
  return (
    <div className="pagination_wrap clearfix">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <ul className="pagination_nav ul_li_right clearfix">
               {
                      showPag()
               }
            {/*   <li><a href="#!"><i className="fal fa-angle-double-left"></i></a>
              </li><li className="active"><a href="#!">1</a></li>
              <li><a href="#!">2</a></li>
              <li><a href="#!">3</a></li>
              <li><a href="#!"><i className="fal fa-angle-double-right"></i></a></li>
         */}    </ul>
          </div>
        </div>
      </div>
  )
}

export default Pagination
