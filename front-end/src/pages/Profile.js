import { useContext, useEffect, useRef, useState } from "react";
import {
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
  Modal,
  Backdrop,
} from "@mui/material";
import AvatarEditor from "react-avatar-editor";
import PageHeader from "../components/PageHeader";
import EditIcon from "@mui/icons-material/Edit";
import Page from "../components/Page";
import { CurrentUserContext } from "src/contexts/CurrentUserContext";
import { getFullName } from "src/_helpers/getFullName";
import { getCommonData } from "src/api/auth api/commondata";
import axios from "axios";
import { employeeUpdate } from "src/api/employee api/employee";
import { employeeContext } from "src/contexts/EmployeeContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff",
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  p: 3,
  "@media (max-width: 600px)": {
    width: "80%",
  },
};

const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("File Process Error"));
      }
    });
  });
};

export default function Profile() {
  const { commonData, dispatchCommonData } = useContext(CurrentUserContext);
  const { dispatchEmployeeUpdate } = useContext(employeeContext);
  const [imageUrl, setimageUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [image, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const avatarEditorRef = useRef();

  useEffect(() => {
    getCommonData(dispatchCommonData);
  }, []);

  //for getting intitial profile url
  useEffect(() => {
    if (commonData.loader === false) {
      setimageUrl(
        `${axios.defaults.baseURL}${commonData.commonData.user.avatar}`
      );
      // setimageUrl(`http://localhost:8000/${commonData.commonData.user.avatar}`);
      // setimageUrl(`https://monitoring-meru.herokuapp.com/${commonData.commonData.user.avatar}`);
    }
  }, [commonData]);

  //handling Image Select
  const handleImageSelect = async (e) => {
    const currFiles = e.target.files;
    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (file) {
        setImg(file);
        setOpen(true);
      } else {
        console.log("Select a file");
      }
    }
  };

  //uploading image
  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    setIsLoading(true);
    try {
      //getting canvas blob
      const blob = await getBlob(canvas);
      let file = null;
      file = new File([blob], "avatar.png", { type: "image/png" });

      //setting new image in card
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", function () {
        setimageUrl(this.result);
      });

      //sending image
      let data = new FormData();
      data.append("image", file, file.name);
      console.log(data);

      //uploading image
      await axios
        .post("/avatar", data, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        })
        .then(async (response) => {
          //handle success
          console.log(response);
          if (response.status === 200) {
            //updating user
            await employeeUpdate(
              commonData.commonData.user._id,
              {
                avatar: response.data.path,
              },
              dispatchEmployeeUpdate
            );
          }
        })
        .catch((error) => {
          //handle error
          console.log(error);
        });

      setIsLoading(false);
      setOpen(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  //closing the modal
  const handleClose = () => {
    setOpen(false);
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
        <PageHeader title="Profile Settings" />
        <Paper elevation="3" maxWidth="lg" sx={{ p: 1 }}>
          <Typography variant="h4">Profile Settings</Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              "@media (max-width: 700px)": {
                flexDirection: "column-reverse",
              },
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
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "auto",
                  mt: 3,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: "10%",
                    top: "10%",
                    zIndex: "10",
                    backgroundColor: "#5BE584",
                    borderRadius: 15,
                    padding: 2,
                  }}
                >
                  <label
                    htmlFor="avatar-upload"
                    style={{
                      color: "white",
                      width: 30,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <EditIcon />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                <Card
                  sx={{
                    width: 250,
                    height: 250,
                    borderRadius: "50%",
                  }}
                >
                  <CardActionArea onClick={() => setBackdropOpen(true)}>
                    <CardMedia
                      component="img"
                      width="100%"
                      height="100%"
                      image={imageUrl}
                      alt="profile image"
                      sx={{
                        borderRadius: "50%",
                      }}
                    />
                  </CardActionArea>
                </Card>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={backdropOpen}
                  onClick={() => setBackdropOpen(false)}
                >
                  <img src={`${imageUrl}`} alt="hello" />
                </Backdrop>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          border: "none",
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5">
            Edit your Avatar for upload
          </Typography>
          <Divider />
          <div style={{ margin: "10px" }}>
            {image && (
              <AvatarEditor
                ref={avatarEditorRef}
                image={image}
                width={250}
                height={250}
                border={10}
                borderRadius={125}
                scale={scale}
                rotate={0}
              />
            )}
          </div>
          <label
            for="scale"
            style={{
              display: "flex",
              alignItems: "center",
              width: "80%",
              justifyContent: "space-evenly",
            }}
          >
            Zoom Image :
            <input
              type="range"
              id="scale"
              name="scale"
              value={scale}
              min="1"
              max="5"
              step="0.1"
              onChange={(e) => setScale(e.target.value)}
            />
          </label>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 1 }}
            onClick={onUploadClick}
            disabled={isLoading}
          >
            Upload new Avatar
          </Button>
        </Box>
      </Modal>
    </Page>
  );
}
