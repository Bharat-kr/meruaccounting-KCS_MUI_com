import React, { useContext } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import Preview from "./Preview";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { loginContext } from "../../contexts/LoginContext";

const previews = [
  "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
  "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  "https://appsprobox.com/wp-content/uploads/2021/05/Google-Photos-trick-discover-random-images-with-the-Im-going.jpg",
  "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
];

export default function Activity(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { loginC } = useContext(loginContext);
  console.log(loginC);

  return (
    <Box component="div" sx={{}}>
      <Typography component="span" sx={{ m: 1, fontWeight: "bold" }}>
        {currentUser.day[1638729000].timeRange[0].startTime} -
        {currentUser.day[1638729000].timeRange[0].endTime} |
      </Typography>
      <Tooltip title="100%" placement="top" followCursor>
        <HourglassFullIcon sx={{ m: -1 }} />
      </Tooltip>
      <Typography component="span" sx={{ m: 1, fontWeight: "bold" }}>
        |{currentUser.day[1638729000].timeRange[0].taskName}
      </Typography>
      <Box
        component="div"
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {previews.map((preview , key) => (
            <Preview preview={preview} key={key}/>
        ))}
      </Box>
    </Box>
  );
}
