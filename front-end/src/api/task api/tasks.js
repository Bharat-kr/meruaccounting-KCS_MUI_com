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
} from "../constants/TasksConstants";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage["Bearer Token"]}`,
  },
};

export const getTasks = async (dispatch) => {
  try {
    const res = await axios.post(`/tasks`, config);
    dispatch({
      type: GET_TASK_SUCCESS,
      payload: res.data.data,
    });
  } catch (e) {
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
