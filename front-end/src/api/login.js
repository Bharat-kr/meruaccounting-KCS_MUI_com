import axios from 'axios';

export const loginApi = (data, dispatch) => {
  dispatch({ type: 'LOGIN_LOADER' });
  axios
    .post('http://localhost:8000/login', data)
    .then((res) => {
      console.log('login data', res);
      if (res.data.status === 'success') {
        localStorage.setItem('Bearer Token', res.data.token);
        console.log(res.data);
        dispatch({ type: 'SET_USER_DATA', data: res.data.user });
        window.location.href = '/dashboard/app';
      } else {
        dispatch({ type: 'LOGIN_ERR' });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: 'LOGIN_ERR' });
    });
};
