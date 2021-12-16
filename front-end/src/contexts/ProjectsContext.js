import React, { useContext, useReducer, useEffect } from 'react';

import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILED,
  CREATE_PROJECTS_REQUEST,
  CREATE_PROJECTS_SUCCESS,
  CREATE_PROJECTS_FAILED,
  CREATE_PROJECTS_RESET,
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

  return (
    <projectContext.Provider
      value={{ projectDetails, dispatchProjectDetails, createProject }}
      value={{ projectDetails, dispatchProjectDetails, createProject }}
    >
      {props.children}
    </projectContext.Provider>
  );
};
