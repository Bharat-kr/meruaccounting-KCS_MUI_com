import React from 'react';
import Grid from '@mui/material/Grid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '70%',
    margin: 'auto',
    marginTop: '3%'
  },
  gridImg: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
}));

const photos = [
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952'
  },
  {
    albumId: 1,
    id: 2,
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'https://via.placeholder.com/600/771796',
    thumbnailUrl: 'https://via.placeholder.com/150/771796'
  },
  {
    albumId: 1,
    id: 3,
    title: 'officia porro iure quia iusto qui ipsa ut modi',
    url: 'https://via.placeholder.com/600/24f355',
    thumbnailUrl: 'https://via.placeholder.com/150/24f355'
  },
  {
    albumId: 1,
    id: 4,
    title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
    url: 'https://via.placeholder.com/600/d32776',
    thumbnailUrl: 'https://via.placeholder.com/150/d32776'
  },
  {
    albumId: 1,
    id: 5,
    title: 'natus nisi omnis corporis facere molestiae rerum in',
    url: 'https://via.placeholder.com/600/f66b97',
    thumbnailUrl: 'https://via.placeholder.com/150/f66b97'
  },
  {
    albumId: 1,
    id: 6,
    title: 'accusamus ea aliquid et amet sequi nemo',
    url: 'https://via.placeholder.com/600/56a8c2',
    thumbnailUrl: 'https://via.placeholder.com/150/56a8c2'
  },
  {
    albumId: 1,
    id: 7,
    title: 'officia delectus consequatur vero aut veniam explicabo molestias',
    url: 'https://via.placeholder.com/600/b0f7cc',
    thumbnailUrl: 'https://via.placeholder.com/150/b0f7cc'
  }
];

export default function ScreenShots(props) {
  const classes = useStyles();
  const renderPhotos = (photos) => {
    const arr = [];
    for (let i = 0; i < 6; i += i) {
      arr.push(
        <Grid item md={4} sm={6} zeroMinWidth>
          <Paper>Timestamp</Paper>
          <Paper elevation={3}>
            <img className={classes.gridImg} src={photos[i].url} alt="photo1" />{' '}
          </Paper>
        </Grid>
      );
    }
    return arr;
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderPhotos(photos)}
      </Grid>
    </div>
  );
}

// <Grid item lg={4} md={6} sm={12}>
//   <AccessTimeIcon />
// </Grid>

// <Grid item lg={4} md={6} sm={12}>
//   <AccessTimeIcon />
// </Grid>

// <Grid item lg={4} md={6} sm={12}>
//   <AccessTimeIcon />
// </Grid>

// <Grid item lg={4} md={6} sm={12}>
//   <AccessTimeIcon />
// </Grid>

// <Grid item lg={4} md={6} sm={12}>
//   <AccessTimeIcon />
// </Grid>

// <Grid item lg={4} md={6} sm={12}>
//   <AccessTimeIcon />
// </Grid>
