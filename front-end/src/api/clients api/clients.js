import axios from 'axios';

import {
  GET_CLIENT_REQUEST,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAILED,
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAILED,
  ADD_CLIENT_RESET,
} from '../../constants/ClientConstants';

const config = {
  headers: {
    Authorization: `Bearer ${localStorage['Bearer Token']}`,
  },
};

export const getClient = async (dispatch) => {
  try {
    dispatch({
      type: GET_CLIENT_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:8000/client/getClient`);

    dispatch({
      type: GET_CLIENT_SUCCESS,
      payload: data,
    });
    console.log(`Client details ${data}`);
  } catch (error) {
    dispatch({
      type: GET_CLIENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addClient = async (incomingData, dispatch) => {
  try {
    dispatch({
      type: ADD_CLIENT_REQUEST,
    });

    const { data } = await axios.post(
      `http://localhost:8000/client`,
      incomingData,
      config
    );

    dispatch({
      type: ADD_CLIENT_SUCCESS,
      payload: data,
    });

    console.log(`Client details ${data}`);

    dispatch({
      type: ADD_CLIENT_RESET,
    });
  } catch (error) {
    dispatch({
      type: ADD_CLIENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
