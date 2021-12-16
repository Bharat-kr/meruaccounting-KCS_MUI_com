import axios from 'axios';
import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_SUCCESS,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAILED,
  UPDATE_MEMBER_REQUEST,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_RESET,
  UPDATE_MEMBER_FAILED,
} from '../../constants/TeamConstants';

const token = localStorage['Bearer Token'];
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const createTeam = async (dispatch, name) => {
  try {
    dispatch({ type: TEAM_CREATE_REQUEST });
    const { data } = await axios.post(
      'http://localhost:8000/team/create',
      name,
      config
    );
    dispatch({ type: TEAM_CREATE_SUCCESS, payload: data.data });
    console.log(data.data);
  } catch (error) {
    dispatch({
      type: TEAM_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTeam = async (dispatch, id) => {
  dispatch({ type: GET_TEAM_REQUEST });

  try {
    const res = await axios.get(
      `http://localhost:8000/team/getTeam/${id}`,
      config
    );

    console.log(res);

    dispatch({ type: GET_TEAM_SUCCESS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_TEAM_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMember = async (dispatch, incomingData) => {
  try {
    dispatch({ type: UPDATE_MEMBER_REQUEST });

    const { data } = await axios.patch(
      'http://localhost:8000/team/updateMember',
      incomingData,
      config
    );

    dispatch({ type: UPDATE_MEMBER_SUCCESS, payload: data });

    console.log('Updated Member', data);

    dispatch({ type: UPDATE_MEMBER_RESET });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_MEMBER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
