import React, { useContext, useReducer, useEffect } from "react";

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
  GET_PROJECT_BYID_REQUEST,
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
} from "../constants/ProjectConstants";

export const projectContext = React.createContext();

const getProjectsReducer = (state, action) => {
  switch (action.type) {
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

const getProjctByIdReducer = (state, action) => {
  switch (action.type) {
    case GET_PROJECT_BYID_SUCCESS:
      return {
        loader: false,
        ProjectById: action.payload,
      };
    case GET_PROJECT_BYID_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case GET_PROJECT_BYID_RESET:
      return {
        projectById: {},
      };
    default:
      return state;
  }
};
const addProjectMemberReducer = (state, action) => {
  switch (action.type) {
    case ADD_MEMBER_TOPROJECT_SUCCESS:
      return {
        loader: false,
        addProjectMember: action.payload,
      };
    case ADD_MEMBER_TOPROJECT_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case ADD_MEMBER_TOPROJECT_RESET:
      return {
        addProjectMember: {},
      };
    default:
      return state;
  }
};

const editProjectLeaderReducer = (state, action) => {
  switch (action.type) {
    case EDIT_PROJECTLEADER_SUCCESS:
      return {
        loader: false,
        editProjectLeader: action.payload,
      };
    case EDIT_PROJECTLEADER_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case EDIT_PROJECTLEADER_RESET:
      return {
        editProjectLeader: {},
      };
    default:
      return state;
  }
};
const addProjectLeaderReducer = (state, action) => {
  switch (action.type) {
    case ADD_PROJECTLEADER_SUCCESS:
      return {
        loader: false,
        addProjectLeader: action.payload,
      };
    case ADD_PROJECTLEADER_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case ADD_PROJECTLEADER_RESET:
      return {
        addProjectLeader: {},
      };
    default:
      return state;
  }
};
const removeProjectMemberReducer = (state, action) => {
  switch (action.type) {
    case REMOVE_MEMBER_FROMRPOJECT_SUCCESS:
      return {
        loader: false,
        removeProjectMember: action.payload,
      };
    case REMOVE_MEMBER_FROMRPOJECT_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case REMOVE_MEMBER_FROMRPOJECT_RESET:
      return {
        removeProjectMember: {},
      };
    default:
      return state;
  }
};
export const ProjectsContextProvider = (props) => {
  const [projectDetails, dispatchProjectDetails] = useReducer(
    getProjectsReducer,
    {
      projectDetails: { loader: true },
    }
  );
  const [createProject, dispatchCreateProject] = useReducer(
    createProjectsReducer,
    { createProject: { loader: true } }
  );
  const [addTeamProject, dispatchAddTeamProject] = useReducer(
    addTeamToProjectsReducer,
    { addTeamProject: { loader: true } }
  );
  const [editProject, dispatchEditProject] = useReducer(editProjectsReducer, {
    editProject: { loader: true },
  });
  const [deleteProject, dispatchDeleteProject] = useReducer(
    deleteProjectsReducer,
    {
      deleteProject: { loader: true },
    }
  );
  const [projectById, dispatchProjectById] = useReducer(getProjctByIdReducer, {
    projectById: { loader: true },
  });
  const [addProjectMember, dispatchaddProjectMember] = useReducer(
    addProjectMemberReducer,
    {
      addProjectMember: { loader: true },
    }
  );
  const [addProjectLeader, dispatchaddProjectLeader] = useReducer(
    addProjectLeaderReducer,
    {
      addProjectLeader: { loader: true },
    }
  );
  const [editProjectLeader, dispatcheditProjectLeader] = useReducer(
    editProjectLeaderReducer,
    {
      editProjectLeader: { loader: true },
    }
  );
  const [removeProjectMember, dispatchremoveProjectMember] = useReducer(
    removeProjectMemberReducer,
    {
      removeProjectMember: { loader: true },
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
        dispatchProjectById,
        projectById,
        dispatchaddProjectMember,
        addProjectLeader,
        dispatchaddProjectLeader,
        addProjectLeader,
        dispatcheditProjectLeader,
        editProjectLeader,
        dispatchremoveProjectMember,
        removeProjectMemberReducer,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};
