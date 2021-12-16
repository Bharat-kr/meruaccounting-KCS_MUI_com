import axios from 'axios';

import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_RESET,
  TEAM_CREATE_SUCCESS,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAILURE
} from '../../constants/TeamConstants';

const token = localStorage['Bearer Token'];
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

export const createTeam = async (dispatch, name) => {
  try {
    dispatch({ type: TEAM_CREATE_REQUEST });
    const { data } = await axios.post('http://localhost:8000/team/create', name, config);
    dispatch({ type: TEAM_CREATE_SUCCESS, payload: data.data });
    console.log(data.data);
  } catch (error) {
    dispatch({
      type: TEAM_CREATE_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const getTeam = async (dispatch, id) => {
  dispatch({ type: GET_TEAM_REQUEST });
  // console.log(localStorage['Bearer Token']);
  try {
    const res = await axios.get(`http://localhost:8000/team/getTeam/${id}`, config);
    console.log(res);

    dispatch({ type: GET_TEAM_SUCCESS, payload: res.data.data });
    console.log('passed');
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_TEAM_FAILURE, payload: error });
  }
};

export const updateMember = async (dispatch, data) => {
  try {
    const res = await axios.patch('http://localhost:8000/team/updateMember', data, config);
    console.log(res);
  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};
