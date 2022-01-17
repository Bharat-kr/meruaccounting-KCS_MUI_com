import React from "react";
import {
  Backdrop,
  Tooltip,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
} from "@mui/material";

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
      <Tooltip
        title={`${props.activityAt}, ${props.performanceData}%`}
        placement="top"
        followCursor
      >
        <Card sx={{ width: 260, maxWidth: 260, m: 1.8 }}>
          <CardContent
            sx={{
              mb: -3,
              mt: -2,
              ml: -1.5,
              background: "#c8facd69",
              maxHeight: 80,
            }}
          >
            <Typography
              sx={{ fontWeight: "bold" }}
              color="text.primary"
              gutterBottom
              variant="caption"
            >
              {props.title}
            </Typography>
          </CardContent>
          <CardActionArea onClick={handleToggle}>
            <CardMedia
              component="img"
              height="140"
              image={props.preview}
              alt="green iguana"
            />
          </CardActionArea>
          <CardContent
            sx={{
              mb: -3,
              mt: -2,
              ml: -1.5,
              background: "#c8facd69",
            }}
          >
            <Typography color="text.primary" gutterBottom variant="h6">
              {`${props.performanceData}%, Taken at = ${props.activityAt}`}
            </Typography>
          </CardContent>
        </Card>
      </Tooltip>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <img src={props.preview} alt="hello" />
      </Backdrop>
    </>
  );
}
