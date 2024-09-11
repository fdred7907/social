import Post from '../models/Post';

const express = require('express');
const router = express.Router();

router.get('api/posts', async (req,res)=>{
    try{
        const Posts = await Post.find();
        res.json(Posts);
    }catch(error){
        res.status(500).json("Error in retreiving posts");
    }
});

router.post('api/posts',upload.single('file'),async (req,res) =>{
    const {title,content} = req.body;
    const file = req.file ? req.file.filename:undefined;
    if (!(title && content)){
        res.status(400).json({error:"Title and Content are required fields."});
    }else{
        try{
            const newPost = new Post({title,content,file})
                await newPost.save();
                res.status(201).json(newPost);
            }
            catch(err){
                res.status(500).json({error:"Error in creating post"});
            }
        }
    });

router.post('api/posts/like/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post){
            res.status(404).json("Post Not Found!");
        }

        posts.likes =+ 1;
        await post.save();
        res.status(201).json(post);
    }
    catch(err){
        res.status(500).json({error:"Erro in updating likes!!"});
    }
});

router.post('api/posts/comment/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const { text} = req.body;
        const post = await Post.findById(id);
        if (!post){
            res.status(404).json("Post Not Found!!");
        }

        post.comments.push({text});
        await post.save();
        res.status(201).json(post);
    }catch(err){
        res.status(500).json({error:"Error in adding comment!!"});  
    }
})

export default router;
