import axios from "axios";
import {
  GET_COMMONDATA_SUCCESS,
  GET_COMMONDATA_FAILED,
} from "../../constants/CurrentUserConstants";
const config = {
  headers: {
    Authorization: `Bearer ${localStorage["Bearer Token"]}`,
  },
};

export const getCommonData = async (dispatch) => {
  try {
    const { data } = await axios.get(`/commondata`, config);
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
