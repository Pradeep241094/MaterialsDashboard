import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Posts/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {

  /* the useSelector allows you to customize the way the selected state is compared to determine
  whether the component needs to be re-rendered. */

  const materials = useSelector((state) => state.posts);

  const classes = useStyles();
  
  return (
    !materials.length ?  <Post  /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {materials.map((materials) => (
          <Grid key={materials._id} item xs={12} sm={12} md={12}>
            <Post post={materials} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
