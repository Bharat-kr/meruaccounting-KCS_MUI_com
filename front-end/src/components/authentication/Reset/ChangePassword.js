import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import axios from "axios";
import { useSnackbar } from "notistack";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  //Reset Form schema
  const ResetSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords does not match"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ResetSchema,
  });

  const {
    errors,
    dirty,
    isValid,
    touched,
    setErrors,
    setSubmitting,
    isSubmitting,
    getFieldProps,
  } = formik;

  //switch password visibility
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  //New password form submit handler
  const handleSubmitAxios = async (e) => {
    e.preventDefault();
    console.log({ ...getFieldProps("newPassword") }.value, token);
    if (token) {
      setSubmitting(true);
      //request body
      const data = {
        newPassword: { ...getFieldProps("newPassword") }.value,
      };

      //request config
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      if (
        { ...getFieldProps("newPassword") }.value ===
        { ...getFieldProps("confirmPassword") }.value
      ) {
        //reset call
        await axios
          .post("/forgot/reset", data, config)
          .then((response) => {
            console.log(response);
            setSubmitting(false);
            enqueueSnackbar("Password has been Reset", {
              variant: "success",
            });
            navigate("/login", { replace: true });
          })
          .catch((err) => {
            setSubmitting(false);
            setErrors({
              ...errors,
              newPassword: err.message,
            });
            enqueueSnackbar(err.message, {
              variant: "error",
            });
          });
      }
    }
  };
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
