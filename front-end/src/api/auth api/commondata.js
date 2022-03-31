import axios from "axios";
import {
  GET_COMMONDATA_SUCCESS,
  GET_COMMONDATA_FAILED,
  DELETE_SS_SUCCESS,
  DELETE_SS_FAILED,
  DELETE_ACT_FAILED,
  DELETE_ACT_SUCCESS,
  TEAM_COMMONDATA_SUCCESS,
  TEAM_COMMONDATA_FAILED,
  PROJECTMEMBER_CD_SUCCESS,
  PROJECTMEMBER_CD_FAILED,
} from "../../constants/CurrentUserConstants";

export const getCommonData = async (dispatch) => {
  try {
    const { data } = await axios.post(`/commondata`);
    dispatch({
      type: GET_COMMONDATA_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_COMMONDATA_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// export const getCommonDataById = async (id, dispatch) => {
//   try {
//     console.log(id);
//     const { data } = await axios.post(`/commondata`, { _id: id });
//     console.log("commondata success", data);
//     dispatch({
//       type: GET_EMPLOYEEDATA_SUCCESS,
//       payload: data,
//     });
//   } catch (err) {
//     console.log(err);
//     dispatch({
//       type: GET_EMPLOYEEDATA_FAILED,
//       payload:
//         err.response && err.response.data.message
//           ? err.response.data.message
//           : err.message,
//     });
//   }
// };

export const deleteSs = async (incomingData, dispatch) => {
  try {
    const { data } = await axios.delete(`/activity/screenshot`, {
      data: [...incomingData],
    });
    const newCd = await axios.post(`/commondata`);
    dispatch({
      type: DELETE_SS_SUCCESS,
      payload: newCd.data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_SS_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const deleteAct = async (activityId, incomingDate, dispatch) => {
  try {
    const { data } = await axios.delete(`/activity`, {
      data: { activityId, incomingDate },
    });
    const newCd = await axios.post(`/commondata`);
    dispatch({
      type: DELETE_ACT_SUCCESS,
      payload: newCd.data,
    });
  } catch (err) {
    dispatch({
      type: DELETE_ACT_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getTeamCommonData = async (dispatch) => {
  try {
    const { data } = await axios.post(`/teamCommonData`);
    dispatch({
      type: TEAM_COMMONDATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEAM_COMMONDATA_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const projectMemberCommonData = async (dispatch) => {
  try {
    const { data } = await axios.post(`/projectLeader/getMembers`);
    dispatch({
      type: PROJECTMEMBER_CD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECTMEMBER_CD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
