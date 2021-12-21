import React from 'react';
import { Box, Backdrop, Typography, Tooltip, Card, CardActionArea, CardMedia } from '@mui/material';

export default function Preview(props) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <>
      <Tooltip title="6:53pm" placement="top" followCursor>
        <Card sx={{ maxWidth: 345, m: 1 }}>
          <CardActionArea onClick={handleToggle}>
            <CardMedia component="img" height="140" image={props.preview} alt="green iguana" />
          </CardActionArea>
        </Card>
      </Tooltip>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <img src={props.preview} alt="hello" />
      </Backdrop>
    </>
  );
}
