import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { downloadApp } from "src/api/auth api/downloadapp";

const DownloadButton = () => {
  return (
    <Tooltip title="Download App">
      <IconButton
        size="large"
        color="default"
        onClick={async () => {
          await downloadApp();
        }}
      >
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadButton;
