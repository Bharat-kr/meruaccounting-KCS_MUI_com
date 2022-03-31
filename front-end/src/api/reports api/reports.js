import axios from "axios";
import {
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAILED,
} from "../../constants/ReportsConstants";

export const getReports = async (dispatch, options) => {
  try {
    const { data } = await axios.post(`/report`, options);
    dispatch({
      type: GET_REPORTS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_REPORTS_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const getSavedReports = async (dispatch, options) => {
  try {
    const { data } = await axios.post(`/report/fetch`, options);
    dispatch({
      type: GET_REPORTS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_REPORTS_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
