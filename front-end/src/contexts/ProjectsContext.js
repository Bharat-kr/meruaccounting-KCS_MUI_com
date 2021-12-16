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

  return (
    <projectContext.Provider
      value={{
        projectDetails,
        dispatchProjectDetails,
        createProject,
        dispatchCreateProject,
        addTeamProject,
        dispatchAddTeamProject,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};
