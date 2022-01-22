import React from "react";
import {
  Backdrop,
  Tooltip,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Icon,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Preview(props) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  console.log(props.preview);
  return (
    <>
      <Card sx={{ width: 260, maxWidth: 260, m: 1.8 }}>
        <Tooltip title={`${props.title}`} placement="top" followCursor>
          <CardContent
            sx={{
              pb: 0,
              mb: 0,
              mt: -2,
              ml: -1.5,
              background: "#c8facd69",
              maxHeight: "50px",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", textOverflow: "ellipsis" }}
              color="text.primary"
              gutterBottom
              variant="caption"
            >
              {props.title}
            </Typography>
            <DeleteIcon
              sx={{ float: "right" }}
              fontSize="small"
              onClick={(e) => {
                console.log(props.actId, props.ssId);
              }}
            />
          </CardContent>
        </Tooltip>

        <Tooltip
          title={`${props.activityAt}, ${props.performanceData}%`}
          placement="top"
          followCursor
        >
          <CardActionArea onClick={handleToggle}>
            <CardMedia
              component="img"
              height="140"
              image={`${props.preview}`}
              alt="green iguana"
            />
          </CardActionArea>
        </Tooltip>

        <CardContent
          sx={{
            pt: 0,
            mb: -3,
            ml: -1.5,
            background: "#c8facd69",
          }}
        >
          <Typography color="text.primary" gutterBottom variant="subtitle2">
            {`${props.performanceData}%, Taken at ${props.activityAt}`}
          </Typography>
        </CardContent>
      </Card>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <img src={`http://localhost:8000/${props.preview}`} alt="hello" />
      </Backdrop>
    </>
  );
}
