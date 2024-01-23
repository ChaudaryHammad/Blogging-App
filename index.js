const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.join(__dirname, 'config', '.env');
dotenv.config({ path: envPath });
const cookieParser = require('cookie-parser');
//custome imports

const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');




//database connection
const {connectDB} = require('./Database/connection');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
connectDB();








//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(checkForAuthenticationCookie('token'));
const Blog = require('./models/blog');
app.use( express.static(path.join(__dirname, 'public')));



//routes
app.use('/user',userRoutes);
app.use('/blog',blogRoutes);

//PORT DEFINTION
const PORT = process.env.PORT || 3000;

app.get('/',async(req,res)=>{
    const allBlogs = await Blog.find({}).sort({createdAt:-1});

    res.render('home',{
        user:req.user,
        blogs:allBlogs
    });
})


app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Server is running on port ${PORT}`);

})