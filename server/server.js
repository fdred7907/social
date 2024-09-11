//import packages
const express = require('express');
const mongoose = require('mongoose');
const uuid = require('uuid');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongooseConnectDB = require('./database/mongoose');
const postRoutes = require('./routes/postRoutes');

//app configuration

const PORT = process.env.PORT || 5000;
const app = express();


//conneting to DB
mongooseConnectDB('mongodb://AdminAnkit:admin2024@localhost:27017/Blogdb?authSource=admin');
const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:5000']
}
app.use(cors(corsOptions));
app.use(bodyParser.json());


//static files serving
app.use("/uplaods",express.static(path.join(__dirname,"uploads")));

//configuring multer
const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"./uploads/");
    },
    filename:(req,res,cb)=>{
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.oroginalname));
    }
    }
);

//configuring multer middleware
const upload = multer({storage:storage});

app.use('/',postRoutes);

// starting server
app.listen(PORT,()=>{
    console.log("Listening on port " + PORT);
});

