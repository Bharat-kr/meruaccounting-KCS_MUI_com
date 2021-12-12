import axios from 'axios';

import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_RESET,
  TEAM_CREATE_SUCCESS
} from '../../constants/TeamConstants';

export const AddMember = (data, dispatch) => {
  dispatch({ type: TEAM_CREATE_REQUEST });

  // get token and put in this constant
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
