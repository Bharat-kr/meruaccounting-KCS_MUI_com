import React, { useContext, useReducer, useEffect } from 'react';
import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_RESET,
  TEAM_CREATE_SUCCESS,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAILED,
  UPDATE_MEMBER_REQUEST,
  UPDATE_MEMBER_SUCCESS,
  UPDATE_MEMBER_FAILED,
  UPDATE_MEMBER_RESET,
  REMOVE_MEMBER_REQUEST,
  REMOVE_MEMBER_SUCCESS,
  REMOVE_MEMBER_FAILED,
  REMOVE_MEMBER_RESET,
} from '../constants/TeamConstants';

export const teamContext = React.createContext();

const teamCreateReducer = (state, action) => {
  switch (action.type) {
    case TEAM_CREATE_REQUEST:
      return {
        loader: true,
      };
    case TEAM_CREATE_SUCCESS:
      return {
        loader: false,
        teamCreate: action.payload,
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
      };
    default:
      return state;
  }
};

const getTeamReducer = (state, action) => {
  switch (action.type) {
    case GET_TEAM_REQUEST:
      return {
        loader: true,
      };
    case GET_TEAM_SUCCESS:
      return {
        loader: false,
        getTeam: action.payload,
      };
    case GET_TEAM_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const updateMemberReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_MEMBER_REQUEST:
      return {
        loader: true,
      };
    case UPDATE_MEMBER_SUCCESS:
      return {
        loader: false,
        updatedMember: action.payload,
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
    case REMOVE_MEMBER_REQUEST:
      return {
        loader: true,
      };
    case REMOVE_MEMBER_SUCCESS:
      return {
        loader: false,
        removeMember: action.payload,
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

export function TeamsProvider(props) {
  const [getTeams, dispatchgetTeam] = useReducer(
    getTeamReducer,
    { getTeam: {} },
    () => {
      const localData = localStorage.getItem('getTeams');
      return localData ? JSON.parse(localData) : { teamCreate: {} };
    }
  );
  const [teamCreate, dispatchTeam] = useReducer(
    teamCreateReducer,
    { teamCreate: {} },
    () => {
      const localData = localStorage.getItem('teamCreate');
      return localData ? JSON.parse(localData) : { teamCreate: {} };
    }
  );
  const [updatedMember, dispatchUpdateMember] = useReducer(
    updateMemberReducer,
    { updatedMember: {} }
  );
  const [removeMember, dispatchRemoveMember] = useReducer(removeMemberReducer, {
    removeMember: {},
  });

  useEffect(() => {
    localStorage.setItem('teamCreate', JSON.stringify(teamCreate));
    localStorage.setItem('employee', JSON.stringify(getTeams));
  }, [teamCreate, getTeam]);

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
      }}
    >
      {props.children}
    </teamContext.Provider>
  );
}
