import axios from 'axios';

import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_RESET,
  TEAM_CREATE_SUCCESS
} from 'src/constants/TeamConstants';

export const AddMember = (data, ud, dispatch) => {
  dispatch({ type: TEAM_CREATE_REQUEST });

  //get token and put in this constant
  const config = {
    headers: {
      Authorization: `Bearer ${ud.token}`
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
