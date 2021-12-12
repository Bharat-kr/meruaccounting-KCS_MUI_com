import React, { useContext, useReducer, useEffect } from 'react';

import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_RESET,
  TEAM_CREATE_SUCCESS
} from 'src/constants/TeamConstants';

const teamContext = React.createContext();

const initialValue = {
  teamCreate: {},
  loader: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case TEAM_CREATE_REQUEST:
      return {
        loader: true
      };
    case TEAM_CREATE_SUCCESS:
      return {
        loader: false,
        teamCreate: action.payload
      };
    case TEAM_CREATE_FAILED:
      return {
        loader: false,
        err: action.payload
      };
    case TEAM_CREATE_RESET:
      return initialValue;
    default:
      return state;
  }
};

export function TeamsProvider(props) {
  const [teamCreate, dispatchTeamCreate] = useReducer(reducer, initialValue);

  return <teamContext.Provider value={{ teamCreate, dispatchTeamCreate }} {...props} />;
}

export function TeamContext() {
  const context = useContext(teamContext);
  if (!context) {
    throw new Error('Please use the context inside the parent scope');
  }
  return context;
}
