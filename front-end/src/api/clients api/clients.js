import axios from "axios";

import {
  GET_CLIENT_REQUEST,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAILED,
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAILED,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILED,
  GET_CLIENTPRO_FAILED,
  GET_CLIENTPRO_REQUEST,
  GET_CLIENTPRO_SUCCESS,
} from "../../constants/ClientConstants";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage["Bearer Token"]}`,
  },
};
export const getClientProjects = async (id, dispatch) => {
  try {
    const { data } = await axios.post(`/client/getClientProjects`, id, config);
    dispatch({
      type: GET_CLIENTPRO_SUCCESS,
      payload: data.data,
    });
    console.log("clientProjects");
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_CLIENTPRO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getClient = async (dispatch) => {
  try {
    const { data } = await axios.get(`/client/getClient`, config);

    dispatch({
      type: GET_CLIENT_SUCCESS,
      payload: data,
    });
    console.log(`Client details`);
    console.log(data);
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
    if (incomingData.name !== "") {
      const { data } = await axios.post(`/client`, incomingData, config);

      dispatch({ type: ADD_CLIENT_SUCCESS, payload: data });
      console.log(`add client`);
      console.log(data);
    }
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

export const deleteClient = async (dispatch) => {
  try {
    const { data } = await axios.delete(`/client`, config);

    dispatch({ type: DELETE_CLIENT_SUCCESS, payload: data });

    console.log(`delete client`);
    console.log(data);
  } catch (error) {
    dispatch({
      type: DELETE_CLIENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
