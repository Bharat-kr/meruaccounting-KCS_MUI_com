import * as Yup from "yup";
import { useState, useContext, useEffect } from "react";
import { Link as RouterLink, useNavigate, useHistory } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Button,
  Divider,
  MenuItem,
  Modal,
  Select,
  Switch,
  Typography,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { loginApi } from "../../../api/auth api/login";
import { loginContext } from "../../../contexts/LoginContext";
import axios from "axios";
import { useSnackbar } from "notistack";
// ----------------------------------------------------------------------

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

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("date");
  const [resstatus, setRestatus] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^(?=.{6})/, "Must Contain 6 Characters"),
  });
  const { loginC, dispatchLogin } = useContext(loginContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate("/dashboard", { replace: true });
    },
  });

  const {
    errors,
    dirty,
    isValid,
    touched,
    values,
    setErrors,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = formik;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  // const handleSubmitAxios = async (e) => {
  //   e.preventDefault();
  //   /* {console.log({ ...getFieldProps('firstName') }, { ...getFieldProps('lastName') })}; */
  //   try {
  //     const res = await axios({
  //       method: 'post',
  //       url: 'https://ssmonitor-backend.herokuapp.com/login',
  //       data: {
  //         role: 'manager',
  //         firstName: { ...getFieldProps('firstName') }.value,
  //         lastName: { ...getFieldProps('lastName') }.value,
  //         email: { ...getFieldProps('email') }.value,
  //         password: { ...getFieldProps('password') }.value
  //         // email: 'rohit12345@gmail.com',
  //         // password: 'rohit'
  //       }
  //     });
  //     localStorage.setItem('userInfo', JSON.stringify(res.data));
  //     setRestatus(res.status !== 200 && true);
  //     if (res.status === 200) {
  //       navigate('/dashboard', { replace: true });
  //     }
  //     setMessage('');
  //     console.log(res.status);
  //     console.log(res);
  //   } catch (error) {
  //     if (error.response) {
  //       setMessage(error.response.data.message);
  //       setRestatus(error.response.status);
  //       // console.log(error.response.headers);
  //     }

  //     // console.log(error.response);
  //   }
  // };

  console.log(formik);

  useEffect(() => {
    if (loginC.error) {
      // setRestatus(true);
      setErrors({
        ...errors,
        email: "Invalid Email",
        password: "Wrong Password",
      });
    }
  }, [loginC]);

  const handleSubmitAxios = async (e) => {
    e.preventDefault();

    /* {console.log({ ...getFieldProps('firstName') }, { ...getFieldProps('lastName') })}; */

    const data = {
      // role: 'manager',
      // firstName: { ...getFieldProps('firstName') }.value,
      // lastName: { ...getFieldProps('lastName') }.value,
      email: { ...getFieldProps("email") }.value,
      password: { ...getFieldProps("password") }.value,
    };

    // const dataS = JSON.stringify(data);
    // console.log(typeof dataS);

    loginApi(data, dispatchLogin);
    console.log(loginC);
    if (localStorage["Bearer Token"]) {
      navigate("/dashboard/app", { replace: true });
      // setMessage('');
    }
  };

  //Forgot Password Call
  const forgot = async () => {
    console.log({ ...getFieldProps("email") }.value);
    await axios
      .post("/forgot", {
        email: { ...getFieldProps("email") }.value,
      })
      .then((res) => {
        console.log(res);
        enqueueSnackbar("Password reset Link has been sent to Your Mail", {
          variant: "success",
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Email not found", {
          variant: "info",
        });
      });
  };

  // console.log(loginC);
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmitAxios}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={touched.email && Boolean(errors?.email)}
            helperText={touched.email && errors?.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={touched.password && Boolean(errors?.password)}
            helperText={touched.password && errors?.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          />

          <Link
            component={RouterLink}
            variant="subtitle2"
            to="#"
            onClick={handleOpen}
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          disabled={!dirty || !isValid}
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
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
              Enter Your Email
            </Typography>
            <IconButton>
              <CloseIcon onClick={handleClose} />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={touched.email && Boolean(errors?.email)}
              helperText={touched.email && errors?.email}
              sx={{
                mb: 2,
              }}
            />
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
              onClick={forgot}
            >
              Confirm
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </FormikProvider>
  );
}
