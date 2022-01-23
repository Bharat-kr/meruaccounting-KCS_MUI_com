import React, { useContext } from "react";
import {
  Box,
  Backdrop,
  Tooltip,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Checkbox,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// contexts
import { deleteSs } from "../../api/auth api/commondata";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Preview(props) {
  const { dispatchCommonData } = useContext(CurrentUserContext);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const delSs = async (activityId, screenshotId) => {
    deleteSs({ activityId, screenshotId }, dispatchCommonData);
  };

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
            <span>
              <Checkbox sx={{ pt: 0, pl: 0, pr: 0.5 }} />
              <Box
                sx={{
                  width: "75%",
                  display: "inline-block",
                  maxWidth: "90%",
                  typography: "caption",
                  fontWeight: "bold",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {props.title}
              </Box>
            </span>
            <DeleteIcon
              sx={{ float: "right" }}
              fontSize="small"
              onClick={(e) => {
                delSs(props.actId, props.ssId);
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
        <img src={`${props.preview}`} alt="hello" />
      </Backdrop>
    </>
  );
}
