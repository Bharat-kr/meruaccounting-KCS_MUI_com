import * as React from "react";
import { Paper, Typography, Link, Box } from "@mui/material";
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

//-------------------------------------------------------------------------------------------------------------------

function Row(props) {
  const { enqueueSnackbar } = useSnackbar();

  const { row, value } = props;
  const [open, setOpen] = React.useState(false);
  // console.log(value);
  const handleDelete = async (e) => {
    console.log(row.url);
    const res = await axios.delete(
      `${axios.defaults.baseURL}report/delete`,
      row.url
    );
    console.log(res.data);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Typography>{row.name ? row.name : ""}</Typography>
        </TableCell>
        <TableCell align="left" sx={{ display: "flex" }}>
          <Typography
            underline="hover"
            // component={RouterLink}
            sx={{
              fontWeight: "400",
              textDecoration: "none",
              color: "primary.main",
              ":hover": {
                color: "primary.darker",
                textDecoration: "underline #000000",
              },
            }}
            // to={`http://localhost:3000/reports/sharedReports/${row.fileName}`}
            onClick={() => {
              window.open(
                `http://localhost:3000/reports/sharedReports/${row.fileName}`,
                "_blank"
              );
            }}
            variant="body2"
          >
            {`http://localhost:3000/reports/sharedReports/${row.fileName}`}
          </Typography>
          <ContentCopyIcon
            sx={{ fontSize: "medium" }}
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:3000/reports/sharedReports/${row.fileName}`
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
              {row.includeAL ? <PaidIcon /> : <PaidOutlinedIcon />}
              {row?.Share ? <ShareIcon /> : <ShareOutlinedIcon />}
              {row?.scheduled ? <MailIcon /> : <MailOutlinedIcon />}
            </Box>
          }
        </TableCell>
        <TableCell value={row.url} onClick={handleDelete}>
          <Typography>Edit report </Typography>
          <ModeEditIcon />
        </TableCell>
        <TableCell value={row.url} onClick={handleDelete}>
          <DeleteIcon />
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

  React.useEffect(async () => {
    // savedReports();
    try {
      const { data } = await axios
        .get(`http://localhost:8000/report/saved`)
        .then((response) => response.data);
      console.log(data);
      setRowsData(data);
    } catch (err) {
      enqueueSnackbar(err.message ? err.message : err, {
        variant: "error",
      });
    }
  }, []);
  //   console.log(data);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
              <Row key={row._id + random(10)} row={row} value={row.url} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
