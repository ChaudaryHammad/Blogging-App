const mongoose = require('mongoose');

async function connectDB(){
   return mongoose.connect(process.env.DB_URL).then(()=>{
        console.log('Database connected');
    }).catch((err)=>{
        console.log(err);
    })
}


module.exports = {connectDB};