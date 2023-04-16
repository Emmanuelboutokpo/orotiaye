const connection = require('../../db/db');
const processEnv = process.env

 exports.getAllComment = async (req, res) => {
    const q = `SELECT post.idpost, user.firstName, user.lastName, user.img,comment.idcomment, comment.content, comment.createdAt FROM post JOIN comment  ON post.idpost = comment.post_idpost  JOIN user ON comment.user_iduser = user.iduser ORDER BY comment.content ASC LIMIT =${4}`;
    connection.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.length ==0) return res.status(404).json('Comment not found!')
    return res.status(200).json(data);
  });
}

 exports.createComment = async (req, res) => {
    const { content,post_idpost, user_iduser} = req.body;

   const q = "INSERT INTO comment(`content`, `post_idpost`,`user_iduser`) VALUES (?)";
   const values = [content,post_idpost,user_iduser];

 connection.query(q, [values], (err, data) => {
   if (err) return res.status(500).json(err);
   return res.status(201).json("Comment has been created.");
 });
 
} 

exports.getComment = async (req, res) => {
  const { id } = req.params
  const query = `SELECT post.idpost, user.firstName, user.lastName, user.img,comment.idcomment, comment.content, comment.createdAt FROM post JOIN comment  ON post.idpost = comment.post_idpost  JOIN user ON comment.user_iduser = user.iduser WHERE post_idpost = ${id}`;
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(results);
    }
  });
} 

 exports.updateComment = async (req, res) => {
    const { id } = req.params
    const { content} = req.body;
   
    const q="UPDATE comment SET `content`=? WHERE `idcomment` = ? ";
    const values = [content];

    connection.query(q, [...values, id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length ==0) return res.status(404).json('Comment not found!')
      return res.json("Comment has been updated.");
    }); 
}
 

exports.deleteComment = async (req, res) => {
    const { id } = req.params

    const q = "DELETE FROM comment WHERE `idcomment` = ?";

    connection.query(q, [id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");
      if (data.length ==0) return res.status(404).json('Comment not found!')
      return res.json("Comment has been deleted!");
    });
}  