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

const teamCreateReducer = (state, action) => {
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
        error: action.payload
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
        employeeList: action.payload
      };

    case EMPLOYEE_LIST_FAILED:
      return {
        loader: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export function TeamsProvider(props) {
  const [employeeList, dispatchEmployeeList] = useReducer(
    employeeReducer,
    { employeeList: {} },
    () => {
      const localData = localStorage.getItem('employeeList');
      return localData ? JSON.parse(localData) : { teamCreate: {} };
    }
  );
  const [teamCreate, dispatchTeam] = useReducer(teamCreateReducer, { teamCreate: {} }, () => {
    const localData = localStorage.getItem('teamCreate');
    return localData ? JSON.parse(localData) : { teamCreate: {} };
  });

  useEffect(() => {
    localStorage.setItem('teamCreate', JSON.stringify(teamCreate));
    localStorage.setItem('employee', JSON.stringify(employeeList));
  }, [teamCreate, employeeList]);

  return (
    <teamContext.Provider value={{ teamCreate, employeeList, dispatchTeam, dispatchEmployeeList }}>
      {props.children}
    </teamContext.Provider>
  );
}
