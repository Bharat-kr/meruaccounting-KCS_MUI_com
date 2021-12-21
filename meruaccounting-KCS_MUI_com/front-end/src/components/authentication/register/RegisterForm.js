import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { func } from 'prop-types';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [resstatus, setRestatus] = useState(null);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  // let res;
  const handleSubmitAxios = async (e) => {
    e.preventDefault();
    /* {console.log({ ...getFieldProps('firstName') }, { ...getFieldProps('lastName') })}; */
    try {
      console.log(
        { ...getFieldProps('firstName') }.value,
        { ...getFieldProps('lastName') }.value,
        { ...getFieldProps('email') }.value,
        { ...getFieldProps('password') }.value
      );
      const res = await axios({
        method: 'post',
        url: 'http://localhost:8000/register',
        data: {
          role: 'manager',
          firstName: { ...getFieldProps('firstName') }.value,
          lastName: { ...getFieldProps('lastName') }.value,
          email: { ...getFieldProps('email') }.value,
          password: { ...getFieldProps('password') }.value
        }
      });
      setMessage('');
      console.log(res);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        setRestatus(error.response.status);
        // console.log(error.response.headers);
      }

      // console.log(error.response);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmitAxios}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              id="firstName"
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={resstatus}
              helperText={message}
            />

            <TextField
              id="lastName"
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={message}
              helperText={message}
            />
          </Stack>

          <TextField
            id="email"
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={resstatus}
            helperText={message}
          />

          <TextField
            id="password"
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            error={resstatus}
            helperText={message}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <LoadingButton
            fullWidth
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
