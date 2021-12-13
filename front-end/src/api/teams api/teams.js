import axios from 'axios';
import { addYears } from 'date-fns';

import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_RESET,
  TEAM_CREATE_SUCCESS,
  EMPLOYEE_LIST_FAILED,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_REQUEST
} from '../../constants/TeamConstants';

export const AddMember = (data, dispatch) => {
  dispatch({ type: TEAM_CREATE_REQUEST });

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
export const getEmployeeList = async (dispatch) => {
  dispatch({ type: EMPLOYEE_LIST_REQUEST });
  console.log(localStorage['Bearer Token']);
  try {
    const res = await axios.get('http://localhost:8000/team/getTeam', {
      headers: {
        Authorization: `Bearer ${localStorage['Bearer Token']}`
      }
    });
    console.log(res);
    if (res.data.status === 'success') {
      dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: res.data.data });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: EMPLOYEE_LIST_FAILED, payload: error });
  }
};

export const updateMember = async () => {
  try {
    const res = await axios.patch('http://localhost:8000/team/updateMember', {
      headers: {
        Authorization: `Bearer ${localStorage['Bearer Token']}`
      }
    });
  } catch (err) {
    console.log(err);
  }
};
