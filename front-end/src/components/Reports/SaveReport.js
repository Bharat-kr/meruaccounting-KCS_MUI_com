import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
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
import { useSnackbar } from "notistack";

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

export default function SaveReport(props) {
  const { reports } = React.useContext(reportsContext);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(`${props.options.groupBy}`);
  const [checked, setChecked] = React.useState([false, ""]);
  const [ssval, setSsval] = React.useState([false, ""]);
  const [moneyval, setMoneyval] = React.useState([false, ""]);
  const [alval, setAlval] = React.useState([false, ""]);
  const [appurl, setAppurl] = React.useState([false, ""]);
  const { enqueueSnackbar } = useSnackbar();

  const [url, setUrl] = React.useState(uuidv4());

  // console.log(props);
  // Default name of the saved report
  React.useEffect(() => {
    if (props.options.groupBy === "E") {
      props.options?.userIds?.length
        ? setName(
            `${props.options.userIds?.length} employee - Summary by employees`
          )
        : setName(`Summary by employees`);
      return;
    }
    if (props.options.groupBy === "D") {
      props.options.userIds?.length
        ? setName(
            `${props.options.userIds.length} employee - Summary by details`
          )
        : setName(`Summary by Details`);
      return;
    }
    if (props.options.groupBy === "P") {
      props.options.userIds?.length
        ? setName(
            `${props.options?.userIds.length} employee - Summary by projects`
          )
        : setName(`Summary by projects`);
      return;
    }
    if (props.options.groupBy === "C") {
      props.options.userIds?.length
        ? setName(
            `${props.options?.userIds?.length} employee - Summary by Clients`
          )
        : setName(`Summary by Clients`);
      return;
    }
    if (props.options.groupBy === "A") {
      props.options?.userIds?.length
        ? setName(
            `${props.options?.userIds?.length} employee - Summary by Apps&Url`
          )
        : setName(`Summary by App&Urls`);
      return;
    }
  }, [props.options]);
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
      includeSS: ssval[0],
      includeAL: alval[0],
      includePR: moneyval[0],
      includeApps: appurl[0],
      reports: reports.reports,
      url,
      name,
      options: props.options,
    };

    const savedData = await axios.post("/report/save", data);
    navigator.clipboard.writeText(
      `http://localhost:3000/reports/sharedReports/${url}`
    );
    enqueueSnackbar("link copied", { variant: "success" });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange1 = (event) => {
    setChecked([!checked[0], event.target.value]);
  };

  const handleChange2 = (event) => {
    setSsval([!ssval[0], event.target.value]);
    console.log(event.target.value);
  };

  const handleChange3 = (event) => {
    setMoneyval([!moneyval[0], event.target.value]);
    console.log(event.target.value);
  };
  const handleChange4 = (event) => {
    setAlval([!alval[0], event.target.value]);
    console.log(event.target.value);
  };
  const handleChange5 = (event) => {
    setAppurl([!appurl[0], event.target.value]);
    console.log(event.target.value);
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="Include screenshots"
        control={<Checkbox checked={ssval[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Include money"
        control={<Checkbox checked={moneyval[0]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="Include activity level"
        control={<Checkbox checked={alval[0]} onChange={handleChange4} />}
      />

      <FormControlLabel
        label="Include Apps&Url"
        control={<Checkbox checked={appurl[0]} onChange={handleChange5} />}
      />
    </Box>
  );

  return (
    <div style={{ marginRight: "2.5%" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Export pdf
      </Button>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ ml: 1 }}>
        Export excel
      </Button>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ ml: 1 }}>
        Share Report
      </Button>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ ml: 1 }}>
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
            options.Set
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
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
          <div>
            <FormControlLabel
              label="Share Report"
              control={<Checkbox checked={checked} onChange={handleChange1} />}
            />
            {children}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClickSave}>
            Save and Copy
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
