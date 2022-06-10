import React, { useContext, useState, useRef, useEffect } from "react";
import { IconButton, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { ClientsContext } from "../../contexts/ClientsContext";
import {
  deleteClient,
  editClient,
  getClient,
} from "../../api/clients api/clients";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { useSnackbar } from "notistack";
import Confirmation from "../Confirmation";

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#000",
    width: "50%",
    maxWidth: "fit-content",
    height: "30px",
    fontSize: "30px",
    fontWeight: "bold",
    border: "none",
    background: "#fff",
    transition: "width 0.4s ease-in-out",
    "& :focus": { width: "100%" },
  },
}));
export default function TaskMain(props) {
  const { currentClient } = props;
  return currentClient === undefined || "" ? (
    <Box
      component="div"
      sx={{
        width: "70%",
        flexGrow: "1",
        overflowX: "hidden",
        overflowY: "auto",
        // margin: "10px 10px 10px 10px",
      }}
    >
      <Paper
        component="div"
        elevation={3}
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          // ml: 2,
          overflow: "visible",
          height: "100%",
        }}
      >
        <Box
          component="img"
          src="/svgs/client.svg"
          sx={{ width: 100, height: 70, backgroundColor: "white" }}
        />
        <Typography variant="h5">No Task Selected</Typography>
      </Paper>
    </Box>
  ) : (
    <>
      {/* grid container 40 60 */}
      <Box
        // ref={outerref}
        component="div"
        sx={{
          width: "70%",
          flexGrow: "1",
          overflowX: "hidden",
          overflowY: "auto",
          m: 1,
        }}
      >
        <Paper
          component="div"
          elevation={3}
          sx={{
            zIndex: 1,
            overflow: "visible",
            height: "100%",
            position: "relative",
            display: "grid",
            gridTemplateRows: "30% 70%",
          }}
        >
          <Box sx={{ m: 1 }}>
            <h1 style={{ backgroundColor: "#fff" }}>
              {/* <form onSubmit={handleEditSubmit} style={{ display: "inline" }}>
                <input
                  ref={inputRef}
                  onChange={(e) => setClientName(e.target.value)}
                  type="text"
                  className={classes.input}
                  value={clientName}
                />
              </form> */}
              <div
                style={{
                  float: "right",
                }}
              >
                <IconButton>
                  <EditIcon
                  //   onClick={handleEditClick}
                  />
                </IconButton>
                <IconButton>
                  <DeleteIcon
                  //   onClick={handleOpen}
                  />
                </IconButton>
              </div>
            </h1>
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mb: 5,
                pb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // alignItems: "center",
                }}
              >
                <Typography variant="h5">
                  {/* Created on : {createdOn ? createdOn : ""} */}
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  variant="body1"
                ></Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  Created By :{" "}
                  {/* {`${currentClient?.createdBy?.firstName} ${currentClient?.createdBy?.lastName}`} */}
                </Typography>
                <Typography variant="body1"></Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Confirmation
      // open={ConfirmModal}
      // handleClose={handleClose}
      // onConfirm={handleDeleteClient}
      // detail={{ type: "Client", name: currentClient.name }}
      />
    </>
  );
}
