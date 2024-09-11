const mongoose = require('mongoose');

const mongooseConnectDB = function(uri){
    mongoose.connect(uri,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        .then((res)=>{
            console.log("connected to database");
        })
        .catch(err=>{
            console.log('error connecting to database',err);
        })
};

export default mongooseConnectDB;