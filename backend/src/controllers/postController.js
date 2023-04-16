const connection = require('../../db/db');
const processEnv = process.env

exports.getAllPost = async (req, res) => {
  const catName = req.query.catName;
  const limit = parseInt(req.query.limit) || 4;
  const page = parseInt(req.query.page) || 0; 
  
  if (catName) {
    const cmpte = `SELECT COUNT(*) AS length FROM  post JOIN category ON category.idCat = post.category_idCat WHERE category.catName = '${catName}'`;
    connection.query(cmpte, (err, data) => {
 if (err) return res.status(500).send(err);
      const totalRows = data[0].length
      const totalPage = Math.ceil(totalRows/limit);
      const startingLimit = (page)*limit;   
      const q = `SELECT post.idpost, post.titlePost, post.readtime, post.dates, post.description, post.imgPost, category.catName FROM post JOIN category ON category.idCat = post.category_idCat WHERE category.catName = '${catName}'  LIMIT ${startingLimit}, ${limit}`;
      connection.query(q, (err, data) => {
       if (err) return res.status(500).send(err);
       return res.status(200).json({
        result : data,
        page: page,
        limit: limit, 
        totalRows: totalRows,
        totalPage: totalPage  
       }) ; 

     }); 

    })

  }else{
  const cmpte = "SELECT COUNT(*) AS length FROM post";
 connection.query(cmpte, (err, data) => {
       if (err) return res.status(500).send(err); 
     const totalRows = data[0].length
        
       const totalPage = Math.ceil(totalRows/limit);
       const startingLimit = (page)*limit;
      const q = `SELECT post.idpost, post.titlePost, post.readtime, post.dates, post.description, post.imgPost, category.catName FROM post JOIN category ON category.idCat = post.category_idCat  LIMIT ${startingLimit}, ${limit}`;
       
      connection.query(q, (err, data) => {
          if (err) return res.status(500).send(err);
           return res.status(200).json({
            result : data,
            page: page,
            limit: limit, 
            totalRows: totalRows,
            totalPage: totalPage  
        }) ; 
       });   
       });

    } 
}

 exports.createPost = async (req, res) => {
    const { titlePost, description,readtime,user_iduser, category_idCat} = req.body;
    let imgPost = "";

    if (req.file) {
        imgPost= processEnv.API + req.file.filename;
   }

   const q = "INSERT INTO post(`titlePost`, `description`, `imgPost`, readtime, `user_iduser`,`category_idCat`) VALUES (?)";
   const values = [titlePost,description,imgPost, readtime, user_iduser, category_idCat];

 connection.query(q, [values], (err, data) => {
   if (err) return res.status(500).json(err);
   return res.status(201).json("Post has been created.");
 });
 
} 

exports.getPost = async (req, res) => {
    const { id } = req.params
    const q = "SELECT  post.idpost,post.titlePost,post.dates,post.readtime, user.firstName, user.lastName, post.imgPost, post.description, user.img, category.catName, category.idCat FROM post JOIN category  ON category.idCat = post.category_idCat JOIN user ON post.user_iduser = user.iduser WHERE idpost = ?";
  connection.query(q, [id],(err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length ==0) return res.status(404).json('Post not found!')
    return res.status(200).json({result: data[0]});
  });
}


 exports.updatePost = async (req, res) => {
    const { id } = req.params
   const { titlePost, value, user_iduser,readtime, category_idCat} = req.body;
    let imgPost = "";

    if (req.file) {
      imgPost= processEnv.API + req.file.filename;
   }

    const q="UPDATE post SET `titlePost`=?,`description`=?,`imgPost`=?,`readtime`=?, `user_iduser`=?, `category_idCat`=? WHERE `idpost` = ? ";

    const values = [titlePost,value,imgPost,readtime, user_iduser,category_idCat]; 

    connection.query(q, [...values, id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length ==0) return res.status(404).json('Post not found!')
      return res.json("Post has been updated.");
    }); 
}
 

exports.deletePost = async (req, res) => {
    const { id } = req.params

    const q = "DELETE FROM post WHERE `idPost` = ?";

    connection.query(q, [id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");
      if (data.length ==0) return res.status(404).json('Post not found!')
      return res.json("Post has been deleted!");
    });
}  