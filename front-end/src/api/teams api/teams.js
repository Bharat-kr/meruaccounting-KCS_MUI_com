import axios from 'axios';

import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_RESET,
  TEAM_CREATE_SUCCESS
} from '../../constants/TeamConstants';

export const AddMember = (data, dispatch) => {
  dispatch({ type: TEAM_CREATE_REQUEST });

<<<<<<< HEAD
  // get token and put in this constant
=======
>>>>>>> f8515a1000c300f8ab32145c2f0f3551bac3458e
  const token = localStorage['Bearer Token'];
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  axios
    .post('http://localhost:8000/team/create', config, data)
    .then((res) => {
      console.log('login data', res);
      if (res.data.status === 'Created team') {
        console.log(res.data);
        dispatch({ type: TEAM_CREATE_SUCCESS, payload: res.data.data });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: TEAM_CREATE_FAILED, payload: err });
    });
};
