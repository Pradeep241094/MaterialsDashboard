import React from 'react';
import { Card, Grid, Paper, CardContent, Typography } from '@material-ui/core/';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();

  if (!post) {
    return null;
  }

  return (
    <Paper>
      <Card className={classes.root} onClick={() => setCurrentId(post._id)}>
        <CardContent>
        <Grid container spacing = {6}>
       <Grid  item xs={9}>
          <Grid >
            <Typography className={classes.fieldValue} color="textPrimary">
              {post.name}
            </Typography>
            <Typography className={classes.fieldValue} color="textSecondary">
              {post.volume} m3
        </Typography>
          </Grid>
          </Grid>
          <Grid item style={{alignItems: 'right', backgroundColor: `${post.color}`, width: '18px', marginTop: '16px', height: '18px', borderRadius: '50%' }}xs={1}>
          </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Paper>

  );
};

export default Post;
