import React, { useEffect } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createMaterials, updateMaterials } from '../../actions/posts';
import  ColorPickerComponent  from '../CustomColorPicker';
import { prependZeroForGivenDigits } from '../../utils/dataFormater';

let onceDataFitToMaterials = false;

const Form = ({ currentId, setCurrentId, postData, setPostData}) => {  // props passed from App.js
  // const [postData, setPostData] = useState({ name: '', cost: 0, volume: 0, delivery_date: '', color: '#50e3c2', total: '' });
  const materials = useSelector((state) => (currentId ? state.posts.filter((message) => message._id === currentId)[0] : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  const clear = () => {
    setCurrentId(0);
    setPostData({ name: '', volume: '' , cost: '', delivery_date: '', color: '', total: '' });
  };

  useEffect(() => {
    if (materials && !onceDataFitToMaterials) {
      onceDataFitToMaterials = true;
      setTimeout(() => onceDataFitToMaterials = false, 10);
      const selectedDeliveryDate = new Date(materials.delivery_date);
      setPostData({
        ...materials,
        delivery_date: `${selectedDeliveryDate.getFullYear()}-${prependZeroForGivenDigits(selectedDeliveryDate.getMonth()+1, 2)}-${prependZeroForGivenDigits(selectedDeliveryDate.getDate(), 2)}`
      });
      // if materials are present, make an api call to send requests to store the materials infomration
    } else {
      // to clear the infpormation in the form after the Material is created
      setPostData({ name: '', volume: '' , cost: '', delivery_date: '', color: '', total: '' });
    }
  }, [materials]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createMaterials(postData));
      // Make an API request to post the information and store it in database
      clear();
    } else {
      // update the information if any changes in the added material
      dispatch(updateMaterials(currentId, postData));
      clear();
    }
  };

  // Form component to fill the information of the material

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${materials.name}"` : 'Add a Material'}</Typography>
        <Grid container spacing = {3}>
        <Grid item xs={6}>
          <TextField name="Material Name" variant="outlined" label="Material Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
          </Grid>
          <Grid  item xs={6}>
            
          <ColorPickerComponent 
          onChangeColor = { (color) => setPostData({ ...postData, color: color.hex })}
          color = {postData.color}
          />
          {/* <span> <p>{postData.color}</p></span> */}
        </Grid>
        <Grid item xs={6}>
        <TextField  type='number' name="Volume" variant="outlined" label="Volume" fullWidth value={postData.volume} onChange={(e) => setPostData({ ...postData, volume: e.target.value })} />
          </Grid>
          <Grid item xs={6}>
          <TextField   type='number' name="Cost (USD per m3)" variant="outlined" fullWidth label="Cost (USD per m3)" value={postData.cost} onChange={(e) => setPostData({ ...postData, cost: e.target.value })} />
          </Grid>
          <Grid  item xs={6}>
            <TextField
              id="date"
              label="Delivery Date"
              type="date"
              fullwidth
              defaultValue="2021-01-01"
              value={postData.delivery_date}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setPostData({ ...postData, delivery_date: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
          <TextField   type='number' name="Total Cost (USD per m3)" variant="outlined" fullWidth label="Total Cost" value={postData.cost * postData.volume}  />
          </Grid>
        </Grid>
       <Grid container spacing = {6}>
       
       <Grid  item xs={3}>
       <Button variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>
       </Grid>
       <Grid item xs={3}>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit" fullWidth>Submit</Button>
        </Grid>
       </Grid>
      </form>
    </Paper>
  );
};

export default Form;
