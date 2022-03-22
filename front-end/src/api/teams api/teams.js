import axios from "axios";
import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_SUCCESS,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAILED,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAILED,
  REMOVE_MEMBER_FAILED,
  REMOVE_MEMBER_SUCCESS,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILED,
} from "../../constants/TeamConstants";

// const token = localStorage['Bearer Token'];
// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

export const createTeam = async (name, dispatch) => {
  try {
    const { data } = await axios.post("/team/create", name);

    dispatch({ type: TEAM_CREATE_SUCCESS, payload: data.data });
    console.log("team create");
    console.log(data.data);
  } catch (error) {
    dispatch({
      type: TEAM_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTeam = async (dispatch, id) => {
  try {
    const res = await axios.get(`team/getTeam`);
    console.log(res.data.data);
    dispatch({ type: GET_TEAM_SUCCESS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_TEAM_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMember = async (incomingData, dispatch) => {
  try {
    const { data } = await axios.patch("/team/updateMember", incomingData);

    dispatch({ type: UPDATE_MEMBER_SUCCESS, payload: data });

    console.log("Updated Member");
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_MEMBER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTeam = async (incomingData) => {
  try {
    const { data } = await axios.patch("/team/updateTeam", incomingData);

    // dispatch({ type: UPDATE_MEMBER_SUCCESS, payload: data });

    console.log("Updated Member");
    console.log(data);
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: UPDATE_MEMBER_FAILED,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const removeTeamMember = async (incomingData, dispatch) => {
  try {
    const { data } = await axios.delete("/team/removeMember", {
      data: incomingData,
    });

    dispatch({ type: REMOVE_MEMBER_SUCCESS, payload: data });
    console.log("removed Member");
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: REMOVE_MEMBER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTeam = async (incomingData, dispatch) => {
  try {
    console.log(incomingData);
    const { data } = await axios.delete(`/team/${incomingData}`, {
      teamId: incomingData,
    });
    dispatch({ type: DELETE_TEAM_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_TEAM_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
