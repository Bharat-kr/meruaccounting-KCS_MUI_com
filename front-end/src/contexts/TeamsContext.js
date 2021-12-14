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
      return {
        teamCreate: {},
        loader: false
      };

    default:
      return state;
  }
};

const employeeReducer = (state, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST_REQUEST:
      return {
        loader: true
      };

    case EMPLOYEE_LIST_SUCCESS:
      return {
        loader: false,
        employee: action.payload
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
  const [employee, dispatchEmployeeList] = useReducer(employeeReducer, { employee: {} });
  const [teamCreate, dispatchTeam] = useReducer(reducer, { teamCreate: {} });

  // useEffect(() => {
  //   localStorage.setItem('teamCreate', JSON.stringify(teamCreate));
  // }, [teamCreate]);

  return (
    <teamContext.Provider value={{ teamCreate, employee, dispatchTeam, dispatchEmployeeList }}>
      {props.children}
    </teamContext.Provider>
  );
}
