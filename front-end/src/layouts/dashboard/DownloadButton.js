import { IconButton } from "@mui/material";
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";

const DownloadButton = () => {
  return (
    <IconButton size="large" color="default">
      <DownloadIcon />
    </IconButton>
  );
};

export default DownloadButton;
