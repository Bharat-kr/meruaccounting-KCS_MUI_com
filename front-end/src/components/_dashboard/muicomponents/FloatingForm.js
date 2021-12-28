import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";

export default function FloatingForm({ children, icon ,toolTip , color}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ ml: 2, mr: 1 }}>
      <Tooltip title={`${toolTip}`} placement="right">
        <Fab
          size="small"
          color={color}
          aria-label="add"
          aria-describedby={id}
          onClick={handleClick}
        >
          {icon}
        </Fab>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        sx={{ height: "auto" }}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {children}
      </Popover>
    </Box>
  );
}
