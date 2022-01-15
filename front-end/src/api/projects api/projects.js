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
  GET_PROJECT_BYID_SUCCESS,
  GET_PROJECT_BYID_FAILED,
  GET_PROJECT_BYID_RESET,
  ADD_MEMBER_TOPROJECT_SUCCESS,
  ADD_MEMBER_TOPROJECT_FAILED,
  ADD_MEMBER_TOPROJECT_RESET,
  ADD_PROJECTLEADER_SUCCESS,
  ADD_PROJECTLEADER_FAILED,
  ADD_PROJECTLEADER_RESET,
  EDIT_PROJECTLEADER_SUCCESS,
  EDIT_PROJECTLEADER_FAILED,
  EDIT_PROJECTLEADER_RESET,
  REMOVE_MEMBER_FROMRPOJECT_SUCCESS,
  REMOVE_MEMBER_FROMRPOJECT_FAILED,
  REMOVE_MEMBER_FROMRPOJECT_RESET,
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
      data: { projectId: `${incomingData}` },
      config,
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

export const getProjectById = async (incomingData, dispatch) => {
  try {
    const { data } = await axios.get(`/project/${incomingData}`, config);
    dispatch({ type: GET_PROJECT_BYID_SUCCESS, payload: data });
    console.log("Get project by id success");
  } catch (error) {
    dispatch({
      type: GET_PROJECT_BYID_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addProjectMember = async (incomingData, dispatch) => {
  try {
    const { data } = await axios.post(`/project/addMember/${incomingData[0]}`, {
      employeeMail: incomingData[1],
    });

    dispatch({ type: ADD_MEMBER_TOPROJECT_SUCCESS, payload: data });
    console.log("member added");
  } catch (error) {
    dispatch({
      type: ADD_MEMBER_TOPROJECT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addProjectLeader = async (incomingData, dispatch) => {
  try {
    console.log(incomingData[0], incomingData[1]);
    const { data } = await axios.post(
      `/project/projectLeader/${incomingData[0]}`,
      { employeeMail: `${incomingData[1]}` }
    );
    dispatch({ type: ADD_PROJECTLEADER_SUCCESS, payload: data });
    console.log("project leader added");
  } catch (error) {
    dispatch({
      type: ADD_PROJECTLEADER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProjectMember = async (incomingData, dispatch) => {
  try {
    const [projectId, id] = incomingData;
    console.log(projectId, id);
    const { data } = await axios.patch(`/project/removeMember/${projectId}`, {
      employeeId: id,
    });
    dispatch({ type: REMOVE_MEMBER_FROMRPOJECT_SUCCESS, payload: data });
    console.log("member removed");
  } catch (error) {
    dispatch({
      type: REMOVE_MEMBER_FROMRPOJECT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
