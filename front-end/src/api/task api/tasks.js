import axios from "axios";

import {
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAILED,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAILED,
  TASK_MEMBERADD_SUCCESS,
  TASK_MEMBERADD_FAILED,
  TASK_MEMBERDEL_SUCCESS,
  TASK_MEMBERDEL_FAILED,
  GET_TASK_SUCCESS,
  GET_TASK_FAILED,
  GET_TASK_DETAILS_SUCCESS,
  GET_TASK_DETAILS_FAILED,
} from "../../constants/TasksConstants";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage["Bearer Token"]}`,
  },
};

export const getTasks = async (dispatch) => {
  try {
    const res = await axios.get(`/task`);
    dispatch({
      type: GET_TASK_SUCCESS,
      payload: res.data.data,
    });
  } catch (e) {
    dispatch({
      type: GET_TASK_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
    return e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
  }
};

export const getTaskDetails = async (dispatch, options) => {
  try {
    const res = await axios.post(`/task/details`, options);
    dispatch({
      type: GET_TASK_DETAILS_SUCCESS,
      payload: res.data.data,
    });
    console.table(res.data.data);
  } catch (e) {
    dispatch({
      type: GET_TASK_DETAILS_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
    return e.response && e.response.data.message
      ? e.response.data.message
      : e.message;
  }
};