import React, { useContext, useReducer, useEffect } from 'react';

import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILED,
  CREATE_PROJECTS_REQUEST,
  CREATE_PROJECTS_SUCCESS,
  CREATE_PROJECTS_FAILED,
  CREATE_PROJECTS_RESET,
  ADD_TEAM_PROJECTS_REQUEST,
  ADD_TEAM_PROJECTS_SUCCESS,
  ADD_TEAM_PROJECTS_FAILED,
  ADD_TEAM_PROJECTS_RESET,
  EDIT_PROJECTS_REQUEST,
  EDIT_PROJECTS_SUCCESS,
  EDIT_PROJECTS_FAILED,
  EDIT_PROJECTS_RESET,
  DELETE_PROJECTS_REQUEST,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_FAILED,
  DELETE_PROJECTS_RESET,
} from '../constants/ProjectConstants';

export const projectContext = React.createContext();

const getProjectsReducer = (state, action) => {
  switch (action.type) {
    case GET_PROJECTS_REQUEST:
      return {
        loader: true,
      };
    case GET_PROJECTS_SUCCESS:
      return {
        loader: false,
        projectDetails: action.payload,
      };
    case GET_PROJECTS_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const createProjectsReducer = (state, action) => {
  switch (action.type) {
    case CREATE_PROJECTS_REQUEST:
      return {
        loader: true,
      };
    case CREATE_PROJECTS_SUCCESS:
      return {
        loader: false,
        createProject: action.payload,
      };
    case CREATE_PROJECTS_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case CREATE_PROJECTS_RESET:
      return { createProject: {} };
    default:
      return state;
  }
};

const addTeamToProjectsReducer = (state, action) => {
  switch (action.type) {
    case ADD_TEAM_PROJECTS_REQUEST:
      return {
        loader: true,
      };
    case ADD_TEAM_PROJECTS_SUCCESS:
      return {
        loader: false,
        addTeamProject: action.payload,
      };
    case ADD_TEAM_PROJECTS_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case ADD_TEAM_PROJECTS_RESET:
      return { addTeamProject: {} };
    default:
      return state;
  }
};

const editProjectsReducer = (state, action) => {
  switch (action.type) {
    case EDIT_PROJECTS_REQUEST:
      return {
        loader: true,
      };
    case EDIT_PROJECTS_SUCCESS:
      return {
        loader: false,
        editProject: action.payload,
      };
    case EDIT_PROJECTS_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case EDIT_PROJECTS_RESET:
      return { editProject: {} };
    default:
      return state;
  }
};

const deleteProjectsReducer = (state, action) => {
  switch (action.type) {
    case DELETE_PROJECTS_REQUEST:
      return {
        loader: true,
      };
    case DELETE_PROJECTS_SUCCESS:
      return {
        loader: false,
        deleteProject: action.payload,
      };
    case DELETE_PROJECTS_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case DELETE_PROJECTS_RESET:
      return { deleteProject: {} };
    default:
      return state;
  }
};

export const ProjectsContextProvider = (props) => {
  const [projectDetails, dispatchProjectDetails] = useReducer(
    getProjectsReducer,
    {
      projectDetails: {},
    }
  );
  const [createProject, dispatchCreateProject] = useReducer(
    createProjectsReducer,
    { createProject: {} }
  );
  const [addTeamProject, dispatchAddTeamProject] = useReducer(
    addTeamToProjectsReducer,
    { addTeamProject: {} }
  );
  const [editProject, dispatchEditProject] = useReducer(editProjectsReducer, {
    editProject: {},
  });
  const [deleteProject, dispatchDeleteProject] = useReducer(
    deleteProjectsReducer,
    {
      deleteProject: {},
    }
  );

  return (
    <projectContext.Provider
      value={{
        projectDetails,
        dispatchProjectDetails,
        createProject,
        dispatchCreateProject,
        addTeamProject,
        dispatchAddTeamProject,
        editProject,
        dispatchEditProject,
        deleteProject,
        dispatchDeleteProject,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};
