import React, { useReducer } from "react";
import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_RESET,
  TEAM_CREATE_SUCCESS,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAILED,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAILED,
  UPDATE_MEMBER_RESET,
  REMOVE_MEMBER_SUCCESS,
  REMOVE_MEMBER_FAILED,
  REMOVE_MEMBER_RESET,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILED,
} from "../constants/TeamConstants";

export const teamContext = React.createContext();

const teamCreateReducer = (state, action) => {
  switch (action.type) {
    case TEAM_CREATE_SUCCESS:
      return {
        loader: false,
        teamCreate: action.payload,
        error:null,
      };
    case TEAM_CREATE_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case TEAM_CREATE_RESET:
      return {
        teamCreate: {},
        loader: false,
        error:null,
      };
    default:
      return state;
  }
};

const getTeamReducer = (state, action) => {
  switch (action.type) {
    case GET_TEAM_SUCCESS:
      return {
        ...state,
        loader: false,
        getTeam: action.payload,
      };
    case GET_TEAM_FAILED:
      return {
        ...state,
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const updateMemberReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_MEMBER_SUCCESS:
      return {
        loader: false,
        updatedMember: action.payload,
        error:null
      };
    case UPDATE_MEMBER_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case UPDATE_MEMBER_RESET:
      return { updatedMember: {} };
    default:
      return state;
  }
};

const removeMemberReducer = (state, action) => {
  switch (action.type) {
    case REMOVE_MEMBER_SUCCESS:
      return {
        loader: false,
        removeMember: action.payload,
        error:null
      };
    case REMOVE_MEMBER_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case REMOVE_MEMBER_RESET:
      return { removeMember: {} };
    default:
      return state;
  }
};

const deleteTeamReducer = (state, action) => {
  switch (action.type) {
    case DELETE_TEAM_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };
    case DELETE_TEAM_FAILED:
      return {
        ...state,
        loader: false,
        err: action.payload,
      };
    default:
      return state;
  }
};

export function TeamsProvider(props) {
  const [getTeams, dispatchgetTeam] = useReducer(getTeamReducer, {
    loader: true,
    getTeam: [],
  });
  const [teamCreate, dispatchTeam] = useReducer(teamCreateReducer, {
    teamCreate: { loader: true },
  });
  const [updatedMember, dispatchUpdateMember] = useReducer(
    updateMemberReducer,
    { updatedMember: { loader: true } }
  );
  const [removeMember, dispatchRemoveMember] = useReducer(removeMemberReducer, {
    removeMember: { loader: true },
  });

  const [deletedTeam, dispatchDeleteTeam] = useReducer(deleteTeamReducer, {
    data: {},
    loader: true,
    err: false,
  });

  return (
    <teamContext.Provider
      value={{
        teamCreate,
        dispatchTeam,
        getTeams,
        dispatchgetTeam,
        updatedMember,
        dispatchUpdateMember,
        removeMember,
        dispatchRemoveMember,
        deletedTeam,
        dispatchDeleteTeam,
      }}
    >
      {props.children}
    </teamContext.Provider>
  );
}
