import express from 'express';

import  {getPosts, createPost,updatePost, deletePost ,likePost} from '../controllers/posts.js';

const router = express.Router();


//localhost:5000/
//after connect successfully:
router.get('/',getPosts); //set all request and response to a new file
                            //import function from that file, make function looks clean
router.post('/',createPost);

router.patch('/:id',updatePost); //GET ID first before EDIT

router.delete(':id',deletePost); //GET ID before DELETE

router.patch('/:id/likePost',likePost)
export default router;