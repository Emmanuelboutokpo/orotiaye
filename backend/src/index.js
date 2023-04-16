const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const cors =require("cors");
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = require('./routes/userRoutes');
 const category = require('./routes/catRoutes');
const post = require('./routes/postRoutes');
const comment = require("./routes/commentRoute")
const like = require("./routes/likeItRoutes")
const info = require("./routes/infosRoutes")

 app.use(express.static(path.join(__dirname,"uploads")));
 app.use('/api', users);  
 app.use("/api", category);  
app.use("/api", post); 
app.use("/api", comment); 
app.use("/api", like); 
app.use("/api", info); 



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));