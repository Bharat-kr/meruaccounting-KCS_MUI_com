import axios from "axios";

import {
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAILED,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAILED,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILED,
  GET_CLIENTPRO_FAILED,
  GET_CLIENTPRO_SUCCESS,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_FAILED,
} from "../../constants/ClientConstants";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage["Bearer Token"]}`,
  },
};
export const getClientProjects = async (id, dispatch) => {
  try {
    const res = await axios.post(`/client/getClientProjects`, id, config);
    dispatch({
      type: GET_CLIENTPRO_SUCCESS,
      payload: res.data.data,
    });
    return res;
  } catch (error) {
    dispatch({
      type: GET_CLIENTPRO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
export const getClient = async (dispatch) => {
  try {
    const res = await axios.get(`/client/getClient`, config);

    dispatch({
      type: GET_CLIENT_SUCCESS,
      payload: res.data,
    });
    return res;
  } catch (error) {
    dispatch({
      type: GET_CLIENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const addClient = async (incomingData, dispatch) => {
  try {
    let res;
    if (incomingData.name !== "") {
      res = await axios.post(`/client`, { name: `${incomingData}` }, config);

      dispatch({ type: ADD_CLIENT_SUCCESS, payload: res.data });
    }
    return res;
  } catch (error) {
    dispatch({
      type: ADD_CLIENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const deleteClient = async (incomingData, dispatch) => {
  try {
    // console.log(incomingData);
    const res = await axios.delete(`/client/${incomingData}`, config);

    dispatch({ type: DELETE_CLIENT_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: DELETE_CLIENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};

export const editClient = async (incomingData, dispatch) => {
  try {
    const [id, editData] = incomingData;
    const res = await axios.patch(`/client/${id}`, editData);
    dispatch({ type: EDIT_CLIENT_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: EDIT_CLIENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  }
};
