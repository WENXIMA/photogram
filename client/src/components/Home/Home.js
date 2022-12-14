import React, { useState, useEffect } from 'react';
import {Container,AppBar,Typography,Grow,Grid} from '@material-ui/core';
// import useStyles from './styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import {getPosts} from '../../actions/posts';
const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    return(<Grow in>
        <Container>
        //ClassName is setting up for moblie friendly
            <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}
            >
                <Grid item xs={12} sm ={7}>
                <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm ={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                    
            </Grid>
        </Container>
    </Grow>);
    
};
export default Home;

