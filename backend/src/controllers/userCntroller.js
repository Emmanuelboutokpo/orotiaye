const connection = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


 exports.signup = async (req, res) => {
    const sql = "SELECT * FROM `user` WHERE email =?";
    const { firstName, lastName, email, password } = req.body;
    let imgUser = "";

    if (req.file) {
      imgUser= processEnv.API + req.file.filename;
   }

    const hashed = bcrypt.hashSync(password, 10);
    connection.query(sql, [email], (error,data) =>{
        if(error) return res.json(error);
        if(data.length>0){
             return res.status(422).json("user already existe");
        }else{
             const q = "INSERT INTO user (`firstName`,`lastName`,`email`,`password`, `img`) VALUES (?)";
             const values = [firstName,lastName,email,hashed,imgUser];
             connection.query(q,[values], (error,data) =>{
                 if(error) return res.json(error);
                 if(data)  return res.status(201).json({
                    message : "User created successfully !"
                 })
             })
        }  
  }) 

}

exports.signin = async (req, res) => {
    const q = "SELECT * FROM `user` WHERE email =?";
    const { email, password } = req.body;
  
    connection.query(q, [email,password],  (err, data) => {
     if (err) return res.status(500).json(err);
     if (data.length === 0) return res.status(404).json("User not found!");
 
     //Check password
     const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
     );
 
     if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");
     const token = jwt.sign({ id: data[0].id,role:data[0].role}, process.env.JWT_SECRET, { expiresIn: "1095d"})
     const {password, ...other } = data[0];
     res.cookie("token", token,{ expiresIn: "1095d"}).status(201).json({token,other});
   });

}  

exports.updateUser = async (req, res) => {
  const { id } = req.params
  const { firstName, lastName, email, password } = req.body;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    let img = "";

    if (req.file) {
      img = processEnv.API + req.file.filename;
    }

    const q = "UPDATE user SET `firstName`=?,`lastName`=?,`email`=?,`password`=?, `img`=? WHERE `iduser` = ? ";

    const values = [firstName, lastName, email, hashed, img];

    connection.query(q, [...values, id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Img has been updated.");
    });

  }
}

exports.getUser = async (req, res) => {
    const { id } = req.params
    const q = "SELECT  * FROM `user` WHERE iduser = ?";
  connection.query(q, [id],(err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length ==0) return res.status(404).json('Post not found!')
    return res.status(200).json({result: data[0]});
  });
}

 