import React, {useState, useEffect} from "react";
import {TextField,Button,Typography,Paper} from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux';
import {createPost,updatePost} from '../../actions/posts';
import { useSelector } from "react-redux";

//GET CURRENT ID

const Form = ({currentId,setCurrentId}) => {
    const classes = useStyles();
    const posts = useSelector((state) => currentId ? state.posts.find((p) => p._id===currentId) : null);
    const [postData,setPostData] = useState({
        creator:'',title:'',message:'',tags:'',selectedFile:'',
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if(posts) setPostData(posts);
    },[posts])
    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,postData));
        } else{
            dispatch(createPost(postData));
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({ creator:'',title:'',message:'',tags:'',selectedFile:'',});
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={'{classes.root} {classes.form}'} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
            <TextField 
            name="creator" 
            variant="outlined" 
            label="Creator" 
            fullWidth
            value={postData.creator}
            onChange={(e) => setPostData({ ...postData, creator:e.target.value })}
            />
            <TextField 
            name="title" 
            variant="outlined" 
            label="Title" 
            value={postData.title}
            fullWidth 
            onChange={(e) => setPostData({ ...postData, title:e.target.value })}
            />
            <TextField 
            name="message" 
            variant="outlined" 
            label="Message" 
            value={postData.message}
            fullWidth 
            onChange={(e) => setPostData({ ...postData, message:e.target.value })}
            />
            <TextField 
            name="tags" 
            variant="outlined" 
            label="Tags" 
            value={postData.tags}
            fullWidth 
            onChange={(e) => setPostData({ ...postData, tags:e.target.value.split(',') })}
            />
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

            <Button className = {classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth type="submit" >Button</Button> 
            <Button variant="contained" color="secondary" size="small" onClick ={clear} fullWidth>Clear</Button> 

          
            </form>
        </Paper>

    );
};
export default Form;