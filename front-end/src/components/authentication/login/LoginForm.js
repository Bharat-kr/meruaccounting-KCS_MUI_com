import * as Yup from 'yup';
import { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate, useHistory } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { loginApi } from '../../../api/auth api/login';
import { loginContext } from '../../../contexts/LoginContext';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [resstatus, setRestatus] = useState(null);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const { loginC, dispatchLogin } = useContext(loginContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  // const handleSubmitAxios = async (e) => {
  //   e.preventDefault();
  //   /* {console.log({ ...getFieldProps('firstName') }, { ...getFieldProps('lastName') })}; */
  //   try {
  //     const res = await axios({
  //       method: 'post',
  //       url: 'http://localhost:8000/login',
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

  const handleSubmitAxios = async (e) => {
    e.preventDefault();

    /* {console.log({ ...getFieldProps('firstName') }, { ...getFieldProps('lastName') })}; */

    const data = {
      // role: 'manager',
      // firstName: { ...getFieldProps('firstName') }.value,
      // lastName: { ...getFieldProps('lastName') }.value,
      email: { ...getFieldProps('email') }.value,
      password: { ...getFieldProps('password') }.value
    };

    // const dataS = JSON.stringify(data);
    // console.log(typeof dataS);

    loginApi(data, dispatchLogin);
    console.log(loginC);
    if (localStorage['Bearer Token']) {
      navigate('/dashboard/app', { replace: true });
      // setMessage('');
    }
  };

  // console.log(loginC);
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmitAxios}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={resstatus}
            helperText={message}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={resstatus}
            helperText={message}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
