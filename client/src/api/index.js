import axios from 'axios';

const url = 'http://localhost:5000/posts'; //WHEN DEPLOY INTO INTERNET, CHANGE URL TO HEROKU URL

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id,updatedPost) => axios.patch(`http://localhost:5000/posts/${id}`,updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`http://localhost:5000/posts/${id}/likePost`);