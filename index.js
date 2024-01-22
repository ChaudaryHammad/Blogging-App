const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.join(__dirname, 'config', '.env');
dotenv.config({ path: envPath });

//custome imports

const userRoutes = require('./routes/user');




//database connection
const {connectDB} = require('./Database/connection');
connectDB();








//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



//routes
app.use('/user',userRoutes);


//PORT DEFINTION
const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Server is running on port ${PORT}`);

})