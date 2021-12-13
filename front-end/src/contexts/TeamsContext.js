import React, { useContext, useReducer, useEffect } from 'react';

import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_RESET,
  TEAM_CREATE_SUCCESS,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_FAILED
} from '../constants/TeamConstants';

export const teamContext = React.createContext();

const initialValue = {
  employeeList: {},
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
    case EMPLOYEE_LIST_REQUEST:
      return {
        loader: true
      };
    case EMPLOYEE_LIST_SUCCESS:
      return {
        loader: false,
        employeeList: action.payload
      };
    case EMPLOYEE_LIST_FAILED:
      return {
        loader: false,
        err: action.payload
      };
    default:
      return state;
  }
};

export function TeamsProvider(props) {
  const [teamCreate, dispatchTeam] = useReducer(reducer, initialValue);

  useEffect(() => {
    localStorage.setItem('teamCreate', JSON.stringify(teamCreate));
  }, [teamCreate]);

  return (
    <teamContext.Provider value={{ teamCreate, dispatchTeam }}>
      {props.children}
    </teamContext.Provider>
  );
}
