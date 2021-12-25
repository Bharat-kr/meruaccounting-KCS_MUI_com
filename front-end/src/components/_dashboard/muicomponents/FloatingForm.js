import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";

export default function FloatingForm({ children }) {
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
      <Tooltip title="Add Team" placement="right">
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          aria-describedby={id}
          onClick={handleClick}
        >
          <AddIcon />
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
