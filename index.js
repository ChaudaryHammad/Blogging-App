const express = require('express');
const app = express();
const path = require('path');

const dotenv = require('dotenv');
const envPath = path.join(__dirname, 'config', '.env');

dotenv.config({ path: envPath });

//custome imports

const {connectDB} = require('./Database/connection');
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));



//routes




//PORT DEFINTION
const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Server is running on port ${PORT}`);

})