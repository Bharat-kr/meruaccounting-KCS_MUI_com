import { useContext, useEffect, useState } from "react";
// import './UserDetails.css';
import {
  CssBaseline,
  Box,
  Typography,
  Divider,
  Paper,
  TextField,
  FormControl,
  Autocomplete,
  Button,
  CircularProgress,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  Input,
} from "@mui/material";
import PageHeader from "../components/PageHeader";

import Page from "../components/Page";
import { CurrentUserContext } from "src/contexts/CurrentUserContext";
import { getFullName } from "src/_helpers/getFullName";
import { getCommonData } from "src/api/auth api/commondata";
import { Opacity } from "@material-ui/icons";
import axios from "axios";

export default function UserDetails() {
  const { commonData, dispatchCommonData } = useContext(CurrentUserContext);
  const [imageUrl, setimageUrl] = useState("");

  useEffect(() => {
    getCommonData(dispatchCommonData);
  }, []);

  //for getting intitial profile url
  useEffect(() => {
    if (commonData.loader === false) {
      setimageUrl(`http://localhost:8000/${commonData.commonData.user.avatar}`);
    }
  }, [commonData]);

  //handling Image Select
  const handleImageSelect = (e) => {
    console.log(e.target.files);
    const files = e.target.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        setimageUrl(this.result);
        // axios
        //   .post("/avatar", files[0])
        //   .then((res) => console.log(res))
        //   .catch((err) => console.log(err));
      });
    }
  };

  return commonData.loader ? (
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
    <Page title="usersettings">
      <Box component="div" sx={{ width: "95%", margin: "auto" }}>
        <PageHeader title="User Settings" />
        <Paper elevation="3" maxWidth="lg" sx={{ p: 1 }}>
          <Typography variant="h4">Profile Settings</Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <FormControl sx={{ m: 1 }}>
              <TextField
                sx={{ width: 300, mt: 3 }}
                required
                id="filled-required"
                label="First Name"
                disabled
                value={getFullName(commonData?.commonData?.user?.firstName)}
              />
              <TextField
                sx={{ width: 300, mt: 3 }}
                required
                id="filled-required"
                label="Last Name"
                disabled
                value={getFullName(commonData?.commonData?.user?.lastName)}
              />
              <TextField
                sx={{ width: 300, mt: 3 }}
                required
                id="filled-required"
                label="Email"
                disabled
                value={commonData?.commonData?.user?.email}
              />
              {/* <TextField
              sx={{ mt: 3 }}
              required
              id="filled-required"
              label="Company"
              defaultValue="Company"
            /> */}
              <Autocomplete
                disablePortal
                id="TimeZone"
                options={["IST", "UTC", "LST"]}
                sx={{ width: 300, mt: 3 }}
                defaultValue="IST"
                renderInput={(params) => (
                  <TextField {...params} label="Time-Zone" />
                )}
              />
              <Autocomplete
                disablePortal
                id="dateFormat"
                options={["day/month/year", "month/day/year"]}
                sx={{ width: 300, mt: 3 }}
                defaultValue="day/month/year"
                renderInput={(params) => (
                  <TextField {...params} label="Date-Format" />
                )}
              />
              <Autocomplete
                disablePortal
                id="country"
                options={["India", "Others"]}
                sx={{ width: 300, mt: 3 }}
                defaultValue={
                  commonData?.commonData?.user?.accountInfo.countryName
                }
                renderInput={(params) => (
                  <TextField {...params} label="Country" />
                )}
              />
              <Button variant="contained" sx={{ mt: 3, width: 150 }}>
                Save
              </Button>
            </FormControl>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  width: 300,
                  height: 300,
                  mt: 3,
                  borderRadius: "50%",
                }}
              >
                <CardActionArea
                  sx={{
                    position: "relative",
                  }}
                >
                  <input
                    type="file"
                    name="ProfileImage"
                    onChange={handleImageSelect}
                    accept="image/*"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      zIndex: "5",
                      cursor: "pointer",
                      opacity: "0",
                    }}
                  />
                  <CardMedia
                    component="img"
                    width="100%"
                    height="100%"
                    image={imageUrl}
                    alt="profile image"
                  />
                </CardActionArea>
              </Card>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Page>
  );
}
