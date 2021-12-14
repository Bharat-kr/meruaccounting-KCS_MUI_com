import axios from 'axios';

import {
  GET_CLIENT_REQUEST,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAILED,
  CLIENT_PROJECTS_REQUEST,
  CLIENT_PROJECTS_SUCCESS,
  CLIENT_PROJECTS_FAILED
} from '../../constants/ClientConstants';

const token = localStorage['Bearer Token'];
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

export const getClient = async (dispatch) => {
  try {
    dispatch({
      type: GET_CLIENT_REQUEST
    });

    const { data } = await axios.get(`http://localhost:8000/client/getClient`);

    dispatch({
      type: GET_CLIENT_SUCCESS,
      payload: data
    });
    console.log(`Employee details ${data}`);
  } catch (error) {
    dispatch({
      type: GET_CLIENT_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const getClientProjects = async (dispatch) => {
  try {
    dispatch({
      type: CLIENT_PROJECTS_REQUEST
    });

    const { data } = await axios.get(`http://localhost:8000/client/getClientProjects`, config);

    dispatch({
      type: CLIENT_PROJECTS_SUCCESS,
      payload: data
    });
    console.log(`Employee details ${data}`);
  } catch (error) {
    dispatch({
      type: CLIENT_PROJECTS_FAILED,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
