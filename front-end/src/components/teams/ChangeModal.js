import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 600,
  bgcolor: "#fff",
  borderRadius: 2,
  border: "none",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  "@media (max-width: 600px)": {
    maxWidth: "80%",
  },
};

const ChangeModal = ({ modal, handleModalClose }) => {
  const [newManger, setNewManager] = React.useState("");

  const handleChange = (event) => {
    setNewManager(event.target.value);
  };
  console.log(modal);
  return (
    <Modal
      open={modal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        border: "none",
      }}
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "primary.lighter",
            p: 2,
          }}
        >
          <Typography variant="h4" color="primary">
            Split Time
          </Typography>
          <IconButton>
            <CloseIcon onClick={handleModalClose} />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            px: 2,
            py: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
            }}
          >
            New Manager
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={newManger}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            bgcolor: "grey.200",
            p: 2,
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{
              mr: 2,
            }}
            //   onClick={handleSplit}
          >
            Split Activity
          </Button>
          <Button variant="outlined" color="primary" onClick={handleModalClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangeModal;
