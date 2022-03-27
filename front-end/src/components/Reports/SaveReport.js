import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Autocomplete,
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
import dayjs from "dayjs";
import { loginContext } from "../../contexts/LoginContext";
import FileSaver from "file-saver";

// context
import { reportsContext } from "../../contexts/ReportsContext";
import PdfExport from "./Export";

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
  console.log(props);
  const { reports, savedReports } = React.useContext(reportsContext);
  const { loginC } = React.useContext(loginContext);

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(`${props.options?.groupBy}`);
  const [checked, setChecked] = React.useState([true, ""]);
  const [ssval, setSsval] = React.useState([false, ""]);
  const [moneyval, setMoneyval] = React.useState([false, ""]);
  const [alval, setAlval] = React.useState([false, ""]);
  const [appurl, setAppurl] = React.useState([false, ""]);
  const [scheduleChecked, setScheduleChecked] = React.useState([false, ""]);
  const [expdf, setExPdf] = React.useState(false);
  const [timeint, setTimeint] = React.useState([]);
  const [dayint, setDayint] = React.useState([]);
  const [hourint, setHourint] = React.useState([]);
  const [monthlyDate, setMonthlyDate] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [url, setUrl] = React.useState(uuidv4());
  console.log(timeint, dayint, hourint);
  // Default name of the saved report
  React.useEffect(() => {
    if (props.options?.groupBy === "E") {
      props.options?.userIds?.length
        ? setName(
            `${props.options.userIds?.length} employee - Summary by employees`
          )
        : setName(`Summary by employees`);
      return;
    }
    if (props.options?.groupBy === "D") {
      props.options.userIds?.length
        ? setName(
            `${props.options.userIds.length} employee - Summary by details`
          )
        : setName(`Summary by Details`);
      return;
    }
    if (props.options?.groupBy === "P") {
      props.options.userIds?.length
        ? setName(
            `${props.options?.userIds.length} employee - Summary by projects`
          )
        : setName(`Summary by projects`);
      return;
    }
    if (props.options?.groupBy === "C") {
      props.options.userIds?.length
        ? setName(
            `${props.options?.userIds?.length} employee - Summary by Clients`
          )
        : setName(`Summary by Clients`);
      return;
    }
    if (props.options?.groupBy === "A") {
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

  const data = {
    share: checked[0],
    includeSS: ssval[0],
    includeAL: alval[0],
    includePR: moneyval[0],
    includeApps: appurl[0],
    reports: reports.reports,
    url,
    name,
    options: props.options,
  };

  //   console.log(reports);
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleExportPdf = async () => {
    try {
      const savedData = await axios.post("/report/save", data);
      console.log(savedData);
      window.open(
        `http://localhost:3000/downloadReportPdf/${savedData.data.data.url}`,
        "_blank"
      );
      axios
        .get(`/report/download/${savedData.data.data.url}`, {
          responseType: "arraybuffer",
          headers: {
            Accept: "application/pdf",
          },
        })
        .then((res) => {
          FileSaver.saveAs(
            new Blob([res.data], { type: "application/pdf" }),
            `sample.pdf`
          );
          // window.open(res.data, "_blank");
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
    setChecked([true, ""]);
  };
  const handleClickSave = async () => {
    setOpen(true);
    setChecked([false, ""]);
    const data = {
      schedule: scheduleChecked[0],
      scheduleType: timeint,
      // scheduledTime: ,
      scheduledEmail: loginC?.userData?.email,
      share: checked[0],
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
    if (checked[0]) {
      navigator.clipboard.writeText(
        `http://localhost:3000/reports/sharedReports/${url}`
      );
      enqueueSnackbar("link copied", { variant: "success" });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange1 = (event) => {
    setChecked([!checked[0], event.target.value]);
  };

  const handleChange2 = (event) => {
    setSsval([!ssval[0], event.target.value]);
  };

  const handleChange3 = (event) => {
    setMoneyval([!moneyval[0], event.target.value]);
  };
  const handleChange4 = (event) => {
    setAlval([!alval[0], event.target.value]);
  };
  const handleChange5 = (event) => {
    setAppurl([!appurl[0], event.target.value]);
  };
  const handleScheduleChange = (e) => {
    setScheduleChecked([!scheduleChecked[0], ""]);
  };
  const timelog = [
    "12:00 am",
    "1:00 am",
    "2:00 am",
    "3:00 am",
    "4:00 am",
    "5:00 am",
    "6:00 am",
    "7:00 am",
    "8:00 am",
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
    "6:00 pm",
    "7:00 pm",
    "8:00 pm",
    "9:00 pm",
    "10:00 pm",
    "11:00 pm",
  ];

  const children2 = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <OutlinedInput
        id="component-outlined"
        value={loginC?.userData?.email}
        onChange={handleChange}
        label="mail"
      />
      <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
        <Autocomplete
          onChange={(e, value) => setTimeint(value)}
          disablePortal
          id="combo-box-demo"
          options={["Monthly", "Weekly", "daily"]}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select interval" />
          )}
        />
        {timeint === "Weekly" && (
          <Autocomplete
            onChange={(e, value) => setDayint(value)}
            disablePortal
            id="combo-box-demo"
            options={[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ]}
            sx={{ width: 300, ml: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Day" />
            )}
          />
        )}
        {timeint === "Monthly" && (
          <Autocomplete
            onChange={(e, value) => setDayint(value)}
            disablePortal
            id="combo-box-demo"
            options={Array(28)
              .fill()
              .map((x, i) => i + 1)}
            sx={{ width: 300, ml: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Select date" />
            )}
          />
        )}
        <Autocomplete
          onChange={(e, value) => setHourint(value)}
          disablePortal
          id="combo-box-demo"
          options={timelog}
          sx={{ width: 300, ml: 1 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Time" />
          )}
        />
      </Box>
    </Box>
  );
  console.log(savedReports);
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
        label="Include Apps&Url charts"
        control={<Checkbox checked={appurl[0]} onChange={handleChange5} />}
      />
    </Box>
  );

  return (
    <>
      {expdf ? <PdfExport options={props.options} /> : ""}
      <div style={{ marginRight: "2.5%" }}>
        <Button variant="outlined" onClick={handleExportPdf}>
          Export pdf
        </Button>
        <Button variant="outlined" onClick={handleClickOpen} sx={{ ml: 1 }}>
          Export excel
        </Button>
        <Button variant="outlined" onClick={handleClickOpen} sx={{ ml: 1 }}>
          Share Report
        </Button>
        <Button variant="outlined" onClick={handleClickSave} sx={{ ml: 1 }}>
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
            <Typography gutterBottom>
              Date range :
              {`${
                props?.options?.dateOne === null ? "" : props.options?.dateOne
              }-${props?.options?.dateTwo ? "" : props.options?.dateTwo}`}
            </Typography>
            <Typography gutterBottom>Description: {name}</Typography>
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
                disabled={!checked[0]}
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
                control={
                  <Checkbox
                    defaultChecked={checked}
                    checked={checked[0]}
                    onChange={handleChange1}
                  />
                }
              />
              {checked[0] ? children : null}
            </div>
            <div>
              <FormControlLabel
                label="Schedule Email"
                control={
                  <Checkbox
                    defaultChecked={false}
                    checked={scheduleChecked[0]}
                    onChange={handleScheduleChange}
                  />
                }
              />
              {scheduleChecked[0] ? children2 : null}
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClickSave}>
              Save & Copy
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </>
  );
}
