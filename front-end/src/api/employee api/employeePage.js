import axios from "axios";
import {
  GET_COMMONDATA_SUCCESS,
  GET_COMMONDATA_FAILED,
  DELETE_SS_SUCCESS,
  DELETE_SS_FAILED,
  DELETE_ACT_FAILED,
  DELETE_ACT_SUCCESS,
} from "../../constants/CurrentUserConstants";

export const getCommonData = async (id, dispatch) => {
  try {
    const { data } = await axios.post("/commondata", { _id: id });
    dispatch({
      type: GET_COMMONDATA_SUCCESS,
      payload: data,
    });
    console.log("employee commondata success", data);
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

export const deleteSs = async (incomingData, dispatch, id) => {
  try {
    const { data } = await axios.delete(`/activity/screenshot`, {
      data: [...incomingData],
    });
    console.log(data);
    const newCd = await axios.post("/commondata", { _id: id });
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
export const deleteAct = async (activityId, incomingDate, dispatch, id) => {
  try {
    const { data } = await axios.delete(`/activity`, {
      data: { activityId, incomingDate },
    });
    console.log(data);
    const newCd = await axios.post("/commondata", { _id: id });
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
