import axios from "axios";
import {
  ADMIN_GETALLEMPLOYEE_SUCCESS,
  ADMIN_GETALLEMPLOYEE_FAILED,
  ADMIN_GETALLTEAMS_SUCCESS,
  ADMIN_GETALLTEAMS_FAILED,
  ADMIN_GETALLCLIENTS_SUCCESS,
  ADMIN_GETALLCLIENTS_FAILED,
  ADMIN_GETALLPROJECTS_SUCCESS,
  ADMIN_GETALLPROJECTS_FAILED,
} from "../../constants/adminConstants";
import {
  GET_ALLEMPLOYEES_REQUEST,
  GET_ALLEMPLOYEES_FAILED,
  GET_ALLEMPLOYEES_SUCCESS,
} from "../../constants/CommonConstants";

export const getAllEmployee = async (dispatch) => {
  try {
    const { data } = await axios.post(`/admin/getCommonData`);
    dispatch({
      type: ADMIN_GETALLEMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_GETALLEMPLOYEE_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const getAllEmployeeList = async (dispatch) => {
  try {
    const { data } = await axios.post(`/admin/getAllEmployee`);
    dispatch({
      type: GET_ALLEMPLOYEES_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALLEMPLOYEES_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const getAllTeams = async (dispatch) => {
  try {
    const { data } = await axios.post(`/admin/getAllTeams`);
    dispatch({
      type: ADMIN_GETALLTEAMS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_GETALLTEAMS_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const getAllClients = async (dispatch) => {
  try {
    const { data } = await axios.post(`/admin/getAllClients`);
    dispatch({
      type: ADMIN_GETALLCLIENTS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_GETALLCLIENTS_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const getAllProjects = async (dispatch) => {
  try {
    const { data } = await axios.post(`/admin/getAllProjects`);
    dispatch({
      type: ADMIN_GETALLPROJECTS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ADMIN_GETALLPROJECTS_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
