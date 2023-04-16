const connection = require('../../db/db');

exports.createInfo = async (req, res) => {
    const sql = "SELECT * FROM `info` WHERE email =?";
    const { firstName, lastName, email, message } = req.body;
    connection.query(sql, [email], (error,data) =>{
        if(error) return res.json(error);
        if(data.length>0){
             return res.status(422).json("user already existe");
        }else{
             const q = "INSERT INTO info(`firstName`,`lastName`,`email`,`message`) VALUES (?)";
             const values = [firstName,lastName,email,message];
             connection.query(q,[values], (error,data) =>{
                 if(error) return res.json(error);
                 if(data)  return res.status(201).json({
                    message : "Message created successfully !"
                 })
             })
        }  
  }) 

}

exports.getAllInfo = async (req, res) => {
    const q = "SELECT * FROM info";
    connection.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.length ==0) return res.status(404).json('Message not found!')
    return res.status(200).json(data);
  });
}

 exports.getInfo= async (req, res) => {
    const { id } = req.params
    const q = "SELECT  *  FROM info  WHERE id_info = ?";

    connection.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length ==0) return res.status(404).json('Message not found!')
      return res.status(200).json(data[0]);
    });
}

