import axios from "axios";
import {
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAILED,
} from "../../constants/ReportsConstants";

export const getReports = async (dispatch, options) => {
  try {
    const { data } = await axios.post(`/report`, options);
    console.log(data);
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
export const getReportsProject = async (dispatch, options) => {
  try {
    const { data } = await axios.post(`/report/project`, options);
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

export const getReportsClient = async (dispatch, options) => {
  try {
    const { data } = await axios.post(`/report/client`, options);
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
export const getReportsByUser = async (dispatch, options) => {
  try {
    const { data } = await axios.post(`/report/user`, options);
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
// export const getReportsByProjectId= async (dispatch, options) => {
//   try {
//     const { data } = await axios.post(`/report/:id`, options);
//     dispatch({
//       type: GET_REPORTS_SUCCESS,
//       payload: data.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: GET_REPORTS_FAILED,
//       payload:
//         err.response && err.response.data.message
//           ? err.response.data.message
//           : err.message,
//     });
//   }
// }

// router.route("/").post(authPass, generateReport);
// router.route("/project").post(authPass, generateReportProject);
// router.route("/client").post(authPass, generateReportClient);
// router.route("/user").post(authPass, generateReportByUser);
// router.route("/:id").post(authPass, generateReportByProjectId);
