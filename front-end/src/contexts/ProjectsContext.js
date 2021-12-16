import React, { useContext, useReducer, useEffect } from 'react';

import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILED,
} from '../constants/ProjectConstants';

export const projectContext = React.createContext();

const projectsReducer = (state, action) => {
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

export const ProjectsContextProvider = (props) => {
  const [projectDetails, dispatchProjectDetails] = useReducer(projectsReducer, {
    projectDetails: {},
  });

  return (
    <projectContext.Provider value={{ projectDetails, dispatchProjectDetails }}>
      {props.children}
    </projectContext.Provider>
  );
};
