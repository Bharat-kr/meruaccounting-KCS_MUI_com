import axios from "axios";
import {
  GET_COMMONDATA_SUCCESS,
  GET_COMMONDATA_FAILED,
  DELETE_SS_SUCCESS,
  DELETE_SS_FAILED,
} from "../../constants/CurrentUserConstants";

export const getCommonData = async (dispatch) => {
  try {
    const { data } = await axios.get(`/commondata`);
    dispatch({
      type: GET_COMMONDATA_SUCCESS,
      payload: data,
    });
    console.log("commondata success", data);
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

export const deleteSs = async (incomingData, dispatch) => {
  try {
    const { data } = await axios.delete(`/activity/screenshot`, {
      data: { ...incomingData },
    });
    const newCd = await axios.get(`/commondata`);
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
