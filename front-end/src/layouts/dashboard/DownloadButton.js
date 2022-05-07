import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";

const DownloadButton = () => {
  return (
    <Tooltip title="Download App">
      <IconButton size="large" color="default">
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadButton;
