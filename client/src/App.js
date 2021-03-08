import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getMaterials } from './actions/posts';
import useStyles from './styles';
import { deleteMaterials } from './actions/posts';



const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const [postData, setPostData] = useState({ name: 'Add New Material', cost: 0, volume: 0, delivery_date: '', color: '#50e3c2', total: '' });
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getMaterials());
  }, [currentId, dispatch]);

  const onDelete = () => {
    if (currentId) {
      const selectedId = currentId;
      const deleteConfirmation = window.confirm('Are you sure?');
      
      if (deleteConfirmation) {
        setCurrentId(0);
        setTimeout(async () => dispatch(deleteMaterials(selectedId)), 10);
        
      }
    }   // logic to delete the material information based on id
  };

  const onAdd = () => {
  setPostData({ name: 'Add New Material', cost: 0, volume: 0, delivery_date: '', color: '#50e3c2', total: '' })
  }

  // Load default state values into the Form


  // Parent component containing the Form, Added Materials shown in form of Cards
  // 
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
      </AppBar>
      <Grow in>
        <Container>
        <Typography className={classes.heading} variant="h2" align="left">Materials</Typography>
        <Button
        variant="contained"
        color="primary"
        style={{marginLeft: 8, marginRight: 8, marginBottom: 8}}
        startIcon={<AddIcon />}
        onClick = {onAdd}
      >
        Add
      </Button>
      <Button
        variant="contained"
        style={{marginLeft: 8, marginRight: 8, marginBottom: 8, backgroundColor: 'red', color: 'white'}}
        startIcon={<DeleteIcon />}
        onClick={onDelete}
      >
        Delete
      </Button>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={4}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Form postData={postData} setPostData={setPostData} currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
