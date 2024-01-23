const {Router} = require('express');
const router = Router();
const Blog = require('../models/blog');
const Comment= require('../models/comment');

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
    coverImageURL:`/uploads/${req.file.filename}`
})
return res.redirect(`/blog/${blog._id}`);
})



router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({blogId:req.params.id}).populate('createdBy');
    console.log(comments);
    return res.render("blog", {
      user: req.user,
      blog,
      comments
    });
  });


  router.post('/comment/:id',async(req,res)=>{
    const id = req.params.id;
       const comment = await Comment.create({
        content:req.body.content,
        blogId:req.params.id,
        createdBy:req.user._id
       });
         return res.redirect(`/blog/${id}`);
    })  



module.exports = router;