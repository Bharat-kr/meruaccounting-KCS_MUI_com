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
import { loginContext } from "../../contexts/LoginContext";
import FileSaver from "file-saver";
import { utils, writeFile } from "xlsx";
import { timeCC } from "../../_helpers/timeConverter";
import { Role } from "../../_helpers/role";

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

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(`${props.options?.groupBy}`);
  const [checked, setChecked] = React.useState([true, ""]);
  const [ssval, setSsval] = React.useState([false, ""]);
  const [moneyval, setMoneyval] = React.useState([false, ""]);
  const [alval, setAlval] = React.useState([false, ""]);
  const [appurl, setAppurl] = React.useState([false, ""]);
  const [scheduleChecked, setScheduleChecked] = React.useState([false, ""]);
  const [expdf, setExPdf] = React.useState(false);
  const [timeint, setTimeint] = React.useState("Daily");
  const [dayint, setDayint] = React.useState(null);
  const [hourint, setHourint] = React.useState("12:00 am");
  const [monthlyDate, setMonthlyDate] = React.useState([]);
  const { loginC } = React.useContext(loginContext);
  const [userEmail, setUserEmail] = React.useState(loginC.userData.email);
  const { enqueueSnackbar } = useSnackbar();

  const [url, setUrl] = React.useState(uuidv4());
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
    schedule: scheduleChecked[0],
    scheduleType: [timeint, dayint, hourint],
    scheduledEmail: loginC?.userData?.email,
    // scheduledTime: ,
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
  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };
  const handleExportPdf = async () => {
    try {
      const data2 = {
        schedule: false,
        scheduleType: [timeint, dayint, hourint],
        scheduledEmail: loginC?.userData?.email,
        // scheduledTime: ,
        share: checked[0],
        includeSS: ssval[0],
        includeAL: true,
        includePR: true,
        includeApps: true,
        reports: reports.reports,
        url,
        name,
        options: props.options,
      };
      const savedData = await axios.post("/report/save", data2);
      window.open(
        `http://localhost:3000/downloadReportPdf/${savedData.data.data.url}`,
        // `https://monitor-meruaccounting-bf9db.web.app/downloadReportPdf/${savedData.data.data.url}`,
        "_blank"
      );
      // axios
      //   .get(`/report/download/${savedData.data.data.url}`, {
      //     responseType: "arraybuffer",
      //     headers: {
      //       Accept: "application/pdf",
      //     },
      //   })
      //   .then((res) => {
      //     console.log("working?");
      //     FileSaver.saveAs(
      //       new Blob([res.data], { type: "application/pdf" }),
      //       `${name}.pdf`
      //     );
      //     // window.open(res.data, "_blank");
      //   });
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };
  const handleExportExcel = async () => {
    try {
      let arr = [];
      let totalHoursSum = 0;
      let activitySum = 0;
      let moneySum = 0;
      let durationSum = 0;
      let noOfEmployees = 0;
      if (props.options?.groupBy === "E") {
        arr.push([
          "Employee",
          "Project",
          "Total hours",
          "Activity level",
          "Cost ",
        ]);
        reports.reports[0]?.byEP?.map((emp, index) => {
          return emp.projects.map((pro) => {
            arr.push([
              `${emp._id.firstName} ${emp._id.lastName}`,
              `${pro.project}`,
              Number((pro.totalHours / 3600).toFixed(2)),
              Number((pro.avgPerformanceData / 1).toFixed(0)),
              Number(((pro.totalHours / 3600) * emp.payRate).toFixed(2)),
            ]);
            noOfEmployees += 1;

            totalHoursSum += pro.totalHours;
            activitySum += pro.avgPerformanceData;
            moneySum += (pro.totalHours / 3600) * emp.payRate;
          });
        });
        arr.push([]);
        arr.push([
          "total",
          "",
          `${(totalHoursSum / 3600).toFixed(2)} hr`,
          `${(activitySum / noOfEmployees).toFixed(2)} %`,
          moneySum.toFixed(2),
        ]);
      } else if (props.options?.groupBy === "C") {
        arr.push([
          "Client",
          "Employee",
          "Total hours",
          "Activity level",
          "Cost ",
        ]);
        reports.reports[0]?.byCE?.map((cli) => {
          return cli.users.map((emp) => {
            arr.push([
              `${cli.client[0]?.name ? cli?.client[0].name : "Deleted client"}`,

              `${emp.firstName} ${emp.lastName}`,
              Number((emp.totalHours / 3600).toFixed(2)),
              `${emp.avgPerformanceData.toFixed(2)} %`,
              Number(((emp?.totalHours / 3600) * emp.payRate).toFixed(2)),
            ]);
            noOfEmployees += 1;
            totalHoursSum += emp?.totalHours;
            activitySum += emp?.avgPerformanceData;
            moneySum += (emp?.totalHours / 3600) * emp.payRate;
          });
        });
        arr.push([]);

        arr.push([
          "total",
          "",
          `${(totalHoursSum / 3600).toFixed(2)} hr`,
          `${(activitySum / noOfEmployees).toFixed(2)} %`,
          moneySum.toFixed(2),
        ]);
      } else if (props.options?.groupBy === "P") {
        arr.push([
          "Project",
          "Employee",
          "Total hours",
          "Activity level",
          "Cost ",
        ]);
        reports.reports[0]?.byPE?.map((pro) => {
          return pro.users.map((emp) => {
            arr.push([
              `${pro.client[0]?.name ? pro?.client[0].name : "Deleted client"} :
                  ${
                    pro.project[0]?.name
                      ? pro?.project[0]?.name
                      : "Deleted project"
                  }`,

              `${emp.firstName} ${emp.lastName}`,
              Number((emp.totalHours / 3600).toFixed(2)),
              `${(emp.avgPerformanceData / 1).toFixed(2)} %`,
              Number(((emp?.totalHours / 3600) * emp?.payRate).toFixed(2)),
            ]);
            noOfEmployees += 1;
            totalHoursSum += emp?.totalHours;
            activitySum += emp?.avgPerformanceData;
            moneySum += (emp?.totalHours / 3600) * emp.payRate;
          });
        });
        arr.push([]);
        arr.push([
          "total",
          "",
          `${(totalHoursSum / 3600).toFixed(2)} hr`,
          `${(activitySum / noOfEmployees).toFixed(2)} %`,
          moneySum.toFixed(2),
        ]);
      } else if (props.options?.groupBy === "A") {
        arr.push(["Employee", "Application", "Activity level"]);
        reports.reports[0]?.byA?.map((emp) => {
          return emp.screenshots.map((ss) => {
            const act = ss.avgPerformanceData;
            ss = ss?.title?.split("-").splice(-1);
            arr.push([`${emp._id.firstName} ${emp._id.lastName}`, ss[0], act]);
            activitySum += act;
            noOfEmployees += 1;
          });
        });
        arr.push([]);

        arr.push(["total", "", (activitySum / noOfEmployees).toFixed(2)]);
      } else if (props.options?.groupBy === "D") {
        arr.push([
          "Date",
          "Client",
          "Project",
          "Start time",
          "End time",
          "Employee",
          "Total hours",
          "Activity level %",
          "Cost ",
        ]);
        reports.reports[0]?.byD?.map((d) => {
          const activity = d.performanceData;
          arr.push([
            d.activityOn,
            `${d.client?.name ? d?.client.name : "Deleted client"}`,
            d.project.name,
            timeCC(d.startTime),
            timeCC(d.endTime),
            `${d.employee.firstName} ${d.employee.lastName}`,
            `${(d.consumeTime / 3600).toFixed(2)} hr`,
            `${(activity / 1).toFixed(2)} %`,
            Number(((d.consumeTime / 3600) * d.employee?.payRate).toFixed(2)),
          ]);
          noOfEmployees += 1;
          totalHoursSum += d.consumeTime;
          activitySum += activity;
          moneySum += (d.consumeTime / 3600) * d.employee?.payRate;
          durationSum += d.endTime - d.startTime;
        });
        arr.push([
          "total",
          "",
          "",
          "",
          timeCC(durationSum),
          "",
          `${(totalHoursSum / 3600).toFixed(2)} hr`,
          `${(activitySum / noOfEmployees).toFixed(2)} %`,
          moneySum.toFixed(2),
        ]);
      }

      let wb = utils.book_new();
      let ws = utils.aoa_to_sheet(arr);
      if (props.options.groupBy === "E" || "P" || "C" || "A") {
        ws["!cols"] = [{ wch: 30 }, { wch: 30 }];
      } else {
        ws["!cols"] = [
          { wch: 10 },
          { wch: 30 },
          { wch: 30 },
          { wch: 10 },
          { wch: 10 },
          { wch: 30 },
        ];
      }
      utils.book_append_sheet(wb, ws);
      writeFile(wb, `${name}.xlsx`);
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
    setChecked([true, ""]);
  };
  const handleClickOpenSave = () => {
    setOpen(true);
    setChecked([false, ""]);
  };
  const handleClickSave = async () => {
    setOpen(true);
    setChecked([false, ""]);
    const data = {
      schedule: scheduleChecked[0],
      scheduleType: [timeint, dayint, hourint],
      scheduledEmail: loginC?.userData?.email,
      // scheduledTime: ,
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
    console.log(data);
    const savedData = await axios.post("/report/save", data);
    if (checked[0]) {
      navigator.clipboard.writeText(
        `http://localhost:3000/reports/sharedReports/${url}`
        // `https://monitor-meruaccounting-bf9db.web.app/reports/sharedReports/${url}`
      );
      enqueueSnackbar("link copied", { variant: "success" });
    }
    handleClose();
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
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const children2 = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <OutlinedInput
        id="component-outlined"
        value={userEmail}
        onChange={handleEmailChange}
        label="mail"
      />
      <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
        <Autocomplete
          defaultValue="Daily"
          onChange={(e, value) => setTimeint(value)}
          disablePortal
          id="combo-box-demo"
          options={["Monthly", "Weekly", "Daily"]}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select interval" />
          )}
        />
        {timeint === "Weekly" && (
          <Autocomplete
            defaultValue="Monday"
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
            defaultValue={1}
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
          defaultValue="12:00 am"
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
  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormControlLabel
        label="Include screenshots"
        control={<Checkbox checked={ssval[0]} onChange={handleChange2} />}
      />
      {Role.indexOf(loginC.userData.role) <= 1 ? (
        <FormControlLabel
          label="Include money"
          control={<Checkbox checked={moneyval[0]} onChange={handleChange3} />}
        />
      ) : (
        ""
      )}
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
        <Button variant="outlined" onClick={handleExportExcel} sx={{ ml: 1 }}>
          Export excel
        </Button>
        <Button variant="outlined" onClick={handleClickOpen} sx={{ ml: 1 }}>
          Share Report
        </Button>
        <Button variant="outlined" onClick={handleClickOpenSave} sx={{ ml: 1 }}>
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
                // defaultValue={`https://monitor-meruaccounting-bf9db.web.app/reports/sharedReports/${url}`}
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
