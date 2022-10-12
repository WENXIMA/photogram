import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


export const getPosts = async (req,res) => {
    try{
        const postMessages = await PostMessage.find();
        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch(error){
        res.status(404).json({message:error.message})
    }
}

export const createPost = async (req,res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try{
        await newPost.save(); //async 

        res.status(201).json(newPost);
    }catch{
        res.status(409).json({message:error.message})
    }
}

export const updatePost = async (req,res) => {
    const {id : _id} = req.params; // localhost:5000/posts/id
    const post = req.body; //Receive data from fronted

    //Check the Vaild is vaild or not
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post in this id");
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, {new:true});

    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const {id } = req.params; // localhost:5000/posts/id

    //Check the Vaild is vaild or not
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post in this id");
    
     await PostMessage.findByIdAndRemove(id);

    //  console.log('DELETE');

    res.json('message:Post deleted successfully');
}

export const likePost = async (req,res) => {
    const {id } = req.params; // localhost:5000/posts/id

    //Check the Vaild is vaild or not
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post in this id");
    
     const post = await PostMessage.findById(id);
     const updatedPost = await PostMessage.findByIdAndUpdate(id,{ likeCount : post.likeCount +1 }, {new : true});



    res.json(updatedPost);
}