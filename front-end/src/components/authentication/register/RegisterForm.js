import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate("/dashboard", { replace: true });
    },
  });

  const {
    errors,
    touched,
    dirty,
    isValid,
    setErrors,
    handleSubmit,
    isSubmitting,
    getFieldProps,
  } = formik;
  // let res;
  const handleSubmitAxios = async (e) => {
    e.preventDefault();
    /* {console.log({ ...getFieldProps('firstName') }, { ...getFieldProps('lastName') })}; */
    try {
      console.log(
        { ...getFieldProps("firstName") }.value,
        { ...getFieldProps("lastName") }.value,
        { ...getFieldProps("email") }.value,
        { ...getFieldProps("password") }.value
      );
      const res = await axios({
        method: "post",

        url: `${axios.defaults.baseURL}register`,

        data: {
          role: "employee",
          firstName: { ...getFieldProps("firstName") }.value,
          lastName: { ...getFieldProps("lastName") }.value,
          email: { ...getFieldProps("email") }.value,
          password: { ...getFieldProps("password") }.value,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response) {
        setErrors({
          ...errors,
          email: error.response.data.message,
        });
      }
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmitAxios}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              id="firstName"
              fullWidth
              label="First name"
              {...getFieldProps("firstName")}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              id="lastName"
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            id="email"
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            id="password"
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            disabled={!dirty || !isValid}
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
