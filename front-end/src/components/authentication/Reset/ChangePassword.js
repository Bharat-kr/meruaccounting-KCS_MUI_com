import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { id } = useParams();
  const token = id.split("-")[1];
  const value = JSON.parse(atob(token.split(".")[1]));

  const LoginSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required")
      .matches(/^(?=.{6})/, "Must Contain 6 Characters"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords does not match"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
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

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmitAxios = () => {};
  return (
    <Box>
      <FormikProvider value={formik}>
        <Form autoComplete="off" onSubmit={handleSubmitAxios}>
          <TextField
            fullWidth
            type="password"
            label="New Password"
            {...getFieldProps("newPassword")}
            error={touched.newPassword && Boolean(errors?.newPassword)}
            helperText={touched.newPassword && errors?.newPassword}
            sx={{
              mb: 2,
            }}
          />
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            sx={{
              mb: 2,
            }}
            {...getFieldProps("confirmPassword")}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={touched.confirmPassword && Boolean(errors?.confirmPassword)}
            helperText={touched.confirmPassword && errors?.confirmPassword}
          />
          <LoadingButton
            fullWidth
            disabled={!dirty || !isValid}
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Change Password
          </LoadingButton>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default ChangePassword;
