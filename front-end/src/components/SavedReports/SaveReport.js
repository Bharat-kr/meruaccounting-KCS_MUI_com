import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// context
import { reportsContext } from "../../contexts/ReportsContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function SaveReport() {
  const { reports } = React.useContext(reportsContext);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState(uuidv4());

  React.useEffect(() => {
    setUrl(uuidv4());
  }, [open]);

  //   console.log(reports);
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickSave = async () => {
    setOpen(false);
    const data = {
      reports: reports.reports,
      url,
      name,
    };
    const savedData = await axios.post("/report/save", data);
    navigator.clipboard.writeText(
      `http://localhost:3000/reports/sharedReports/${url}`
      // `https://monitor-meruaccounting-bf9db.web.app/reports/sharedReports/${url}`
    );
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginRight: "2.5%" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Save Report
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Save Report
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Date Range: get date from props</Typography>
          <Typography gutterBottom>
            Description: summary by (group by) get from props, also get other
            details from props and make options here to send as save reports
            options
          </Typography>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Name</InputLabel>
            <OutlinedInput
              id="component-outlined"
              value={name}
              onChange={handleChange}
              label="Name"
            />
          </FormControl>
          <Box sx={{ mt: 1.5 }}>
            <TextField
              fullWidth
              label="Sharing link"
              defaultValue={`http://localhost:3000/reports/sharedReports/${url}`}
              // defaultValue={`https://monitor-meruaccounting-bf9db.web.app/reports/sharedReports/${url}`}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClickSave}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
