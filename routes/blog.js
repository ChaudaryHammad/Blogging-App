const {Router} = require('express');
const router = Router();
const Blog = require('../models/blog');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.resolve("./public/uploads/"));
    },
    filename:function(req,file,cb){
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null,fileName);
    }
})

const upload = multer({
    storage:storage
})

router.get('/add-new',async(req,res)=>{
    res.render('addBlog',{
        user:req.user
    });
})


router.post('/add-new',upload.single('coverImageURL'),async(req,res)=>{
const {title,body} = req.body;

const blog = await Blog.create({
    title,
    body,
    createdBy:req.user._id,
    coverImageURL:`uploads/${req.file.filename}`
})
return res.redirect(`/blog/${blog._id}`);
})

module.exports = router;