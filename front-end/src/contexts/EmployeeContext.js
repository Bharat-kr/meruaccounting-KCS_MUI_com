import React, { useReducer, createContext } from "react";

import {
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAILED,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_FAILED,
} from "../constants/EmployeeConstants";

export const employeeContext = createContext();

const employeeDetailsReducer = (state, action) => {
  switch (action.type) {
    case EMPLOYEE_DETAILS_SUCCESS:
      return {
        loader: false,
        employee: action.payload,
      };

    case EMPLOYEE_DETAILS_FAILED:
      return {
        loader: false,
        err: action.payload,
      };

    default:
      return state;
  }
};
const employeeUpdatesReducer = (state, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE_SUCCESS:
      return {
        loader: false,
        employee: action.payload,
      };

    case EMPLOYEE_UPDATE_FAILED:
      return {
        loader: false,
        err: action.payload,
      };

    default:
      return state;
  }
};

export function EmployeeProvider(props) {
  const [employee, dispatchEmployeeDetails] = useReducer(
    employeeDetailsReducer,
    { employee: { loader: true } }
  );
  const [employeeUpdate, dispatchEmployeeUpdate] = useReducer(
    employeeUpdatesReducer,
    { employee: { loader: true } }
  );

  // useEffect(() => {
  //   localStorage.setItem('teamCreate', JSON.stringify(teamCreate));
  // }, [teamCreate]);

  return (
    <employeeContext.Provider
      value={{
        employee,
        dispatchEmployeeDetails,
        employeeUpdate,
        dispatchEmployeeUpdate,
      }}
    >
      {props.children}
    </employeeContext.Provider>
  );
}
