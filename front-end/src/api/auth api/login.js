import axios from 'axios';
// import { Navigate } from 'react-router';

export const loginApi = (data, dispatch) => {
  dispatch({ type: 'LOGIN_LOADER' });
  axios
    .post('http://localhost:8000/login', data)
    .then((res) => {
      console.log('login data', res);
      if (res.data.status === 'success') {
        localStorage.setItem('Bearer Token', res.data.token);
        localStorage.setItem('ud', res.data.user);
        console.log(res.data);
        dispatch({ type: 'SET_USER_DATA', data: res.data.user });
        window.location.href = '/dashboard/userpage';
        // return <Navigate to="/dashboard/homepage" />;
        // eslint-disable-next-line no-else-return
      } else {
        dispatch({ type: 'LOGIN_ERR' });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: 'LOGIN_ERR' });
    });
};
