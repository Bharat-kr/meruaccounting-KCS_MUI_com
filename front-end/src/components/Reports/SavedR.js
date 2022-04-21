import * as React from "react";
import {
  Paper,
  Typography,
  Link,
  Box,
  CircularProgress,
  Modal,
  Checkbox,
  Button,
  IconButton,
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import SavedReports from "src/pages/SavedReports";
import { async } from "rxjs";
import { useSnackbar } from "notistack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Link as RouterLink } from "react-router-dom";
import Tooltip from "src/theme/overrides/Tooltip";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import ShareIcon from "@mui/icons-material/Share";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MailIcon from "@mui/icons-material/Mail";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { random } from "lodash";
import { styled } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { loginContext } from "src/contexts/LoginContext";
import { Role } from "../../_helpers/role";
import { Delete } from "@material-ui/icons";

//-------------------------------------------------------------------------------------------------------------------

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
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

function Row(props) {
  const { row, value, reports, setReports } = props;

  const { enqueueSnackbar } = useSnackbar();
  const [modal, setModal] = React.useState(false);
  const [name, setName] = React.useState(row.name ? row.name : "");
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState(row.url ? row.url : "");
  const [checked, setChecked] = React.useState([
    row.share ? row.share : false,
    "",
  ]);
  const [ssval, setSsval] = React.useState([row.includeSS, ""]);
  const [moneyval, setMoneyval] = React.useState([row.includePR, ""]);
  const [alval, setAlval] = React.useState([row.includeAL, ""]);
  const [appurl, setAppurl] = React.useState([row.includeApps, ""]);
  const { loginC } = React.useContext(loginContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  // console.log(value);
  const handleDelete = async (e) => {
    try {
      const res = await axios.delete(
        `${axios.defaults.baseURL}report/delete/${row.url}`
      );
      setReports(!reports);
      enqueueSnackbar("Report deleted", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };
  const handleClickSave = async () => {
    try {
      setOpen(false);
      const data = {
        share: checked[0],
        includeSS: ssval[0],
        includeAL: alval[0],
        includePR: moneyval[0],
        includeApps: appurl[0],
        name: name,
        url: url,
      };

      const savedData = await axios.patch("/report/edit", data);
      if (savedData.status === 200) {
        enqueueSnackbar("Report saved", { variant: "success" });
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message, { variant: err.message });
    }
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
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Typography>{row.name ? row.name : ""}</Typography>
        </TableCell>
        <TableCell align="left" sx={{ display: "flex" }}>
          <Typography
            underline="hover"
            sx={{
              fontWeight: "400",
              textDecoration: "none",
              color: "primary.main",
              ":hover": {
                color: "primary.darker",
                textDecoration: "underline #000000",
              },
            }}
            onClick={() => {
              window.open(
                `http://localhost:3000/reports/sharedReports/${row.url}`,
                // `https://monitor-meruaccounting-bf9db.web.app/reports/sharedReports/${row.url}`,
                "_blank"
              );
            }}
            variant="body2"
          >
            {/* {`https://monitor-meruaccounting-bf9db.web.app/reports/sharedReports/${row.url}`} */}
            {`http://localhost:3000/reports/sharedReports/${row.url}`}
          </Typography>
          <ContentCopyIcon
            sx={{ fontSize: "medium" }}
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:3000/reports/sharedReports/${row.url}`
                // `https://monitor-meruaccounting-bf9db.web.app/reports/sharedReports/${row.url}`
              );
              enqueueSnackbar("Link copied", { variant: "success" });
            }}
          />
        </TableCell>
        <TableCell align="left">{row.createdAt.substring(0, 10)}</TableCell>
        <TableCell>
          {
            <Box sx={{ display: "flex" }}>
              {row.includeSS ? <ImageIcon /> : <ImageOutlinedIcon />}
              {Role.indexOf(loginC.userData.role) <= 1 ? (
                row.includeAL ? (
                  <PaidIcon />
                ) : (
                  <PaidOutlinedIcon />
                )
              ) : (
                ""
              )}
              {row.share ? <ShareIcon /> : <ShareOutlinedIcon />}
              {row?.scheduled ? <MailIcon /> : <MailOutlinedIcon />}
            </Box>
          }
        </TableCell>
        <TableCell>
          <DeleteIcon onClick={handleDelete}></DeleteIcon>
        </TableCell>
        <TableCell>
          <Link onClick={handleOpen}>
            <Typography>Edit report </Typography>
          </Link>
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
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClickSave}>
                Save & Copy
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function SavedR() {
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowsData, setRowsData] = React.useState([]);
  const [reports, setReports] = React.useState(false);

  React.useEffect(async () => {
    // savedReports();
    try {
      const { data } = await axios
        .get(`report/saved`)
        // .get(`https://monitor-meruaccounting-bf9db.web.app/report/saved`)
        .then((response) => response.data);
      // console.log(data);
      setRowsData(data);
    } catch (err) {
      enqueueSnackbar(err.message ? err.message : err, {
        variant: "error",
      });
    }
  }, [reports]);
  //   console.log(data);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.group(rowsData);

  return rowsData.length === null ? (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ m: 2 }} />
    </Box>
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Shared report link</TableCell>
            <TableCell align="left">Created on</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.length !== 0 &&
            rowsData?.map((row) => (
              <Row
                key={row._id + random(100)}
                row={row}
                reports={reports}
                setReports={(re) => setReports(re)}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
