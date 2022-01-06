import {
  ADD_TEAM_PROJECTS_FAILED,
  ADD_TEAM_PROJECTS_REQUEST,
  ADD_TEAM_PROJECTS_SUCCESS,
  CREATE_PROJECTS_FAILED,
  CREATE_PROJECTS_REQUEST,
  CREATE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_FAILED,
  DELETE_PROJECTS_REQUEST,
  DELETE_PROJECTS_SUCCESS,
  EDIT_PROJECTS_FAILED,
  EDIT_PROJECTS_REQUEST,
  EDIT_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILED,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
} from "src/constants/ProjectConstants";
import axios from "axios";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage["Bearer Token"]}`,
  },
};

export const createProject = async (incomingData, dispatch) => {
  try {
    const { data } = await axios.post(`/project`, incomingData, config);

    dispatch({
      type: CREATE_PROJECTS_SUCCESS,
      payload: data,
    });
    console.log(`Create project success`);
    console.log(data);
  } catch (error) {
    dispatch({
      type: CREATE_PROJECTS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addTeamToProject = async (incomingData, dispatch) => {
  try {
    const { data } = await axios.patch(`/project`, incomingData, config);

    dispatch({ type: ADD_TEAM_PROJECTS_SUCCESS, payload: data });
    console.log("Add team to project");
    console.log(data);
  } catch (error) {
    dispatch({
      type: ADD_TEAM_PROJECTS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editProject = async (_id, incomingData, dispatch) => {
  try {
    const { data } = await axios.patch(`/project/${_id}`, incomingData, config);

    dispatch({ type: EDIT_PROJECTS_SUCCESS, payload: data });
    console.log("Edit existing project");
    console.log(data);
  } catch (error) {
    dispatch({
      type: EDIT_PROJECTS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProject = async (incomingData, dispatch) => {
  try {
    const { data } = await axios.delete(`/project`, {
      data: { projectId: `"${incomingData}"` },
    });

    dispatch({ type: DELETE_PROJECTS_SUCCESS, payload: data });

    console.log("DELETE existing project");
    console.log(data);
  } catch (error) {
    dispatch({
      type: DELETE_PROJECTS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
