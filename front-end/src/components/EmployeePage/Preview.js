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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// contexts
import { deleteSs } from "../../api/employee api/employeePage";
import { useParams } from "react-router-dom";
import { EmployeePageContext } from "src/contexts/EmployeePageContext";

export default function Preview(props) {
  const { dispatchCommonData } = useContext(EmployeePageContext);
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const delSs = async (activityId, screenshotId) => {
    deleteSs([{ activityId, screenshotId }], dispatchCommonData, id);
  };
  // console.log(props.selectedSs);
  // const isChecked = (e) => {
  //   return !props.selectedSs.indexOf(e.target.value) !== -1;
  // };

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
              background: "#A5B9D9",
              maxHeight: "50px",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {/* use ref to checkbox, perform onClick */}
            <span>
              <Checkbox
                value={props.ssId}
                aria-labelledby={props.ssId}
                checked={props.selectedSs.indexOf(props.ssId) !== -1}
                sx={{ pt: 0, pl: 0, pr: 0.5 }}
                onChange={(e) => {
                  return props.setSelectedSs(e.target.checked, props.ssId);
                }}
              />

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
                delSs(props.act._id, props.ssId);
                props.setSelectedSs(false, props.act._id, props.ssId);
              }}
            />
          </CardContent>
        </Tooltip>

        <Tooltip
          title={`${props.activityAt}, ${Math.ceil(props.performanceData)}%`}
          placement="top"
          followCursor
        >
          <CardActionArea onClick={handleToggle}>
            <CardMedia
              component="img"
              height="140"
              image={`${props.preview}`}
              alt={props.ssId}
            />
          </CardActionArea>
        </Tooltip>

        <CardContent
          sx={{
            pt: 0,
            mb: -3,
            ml: -1.5,
            background: "#A5B9D9",
          }}
        >
          <Typography color="text.primary" gutterBottom variant="subtitle2">
            {`${Math.ceil(props.performanceData)}%, Taken at ${
              props.activityAt
            }`}
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
