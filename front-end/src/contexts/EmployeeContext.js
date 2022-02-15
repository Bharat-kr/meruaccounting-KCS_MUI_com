import React, { useReducer, createContext, useState } from "react";

import {
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAILED,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_FAILED,
  GET_EMPLOYEEDATA_SUCCESS,
  GET_EMPLOYEEDATA_FAILED,
} from "../constants/EmployeeConstants";
import {
  ADMIN_GETALLEMPLOYEE_SUCCESS,
  ADMIN_GETALLEMPLOYEE_FAILED,
  ADMIN_GETALLTEAMS_SUCCESS,
  ADMIN_GETALLTEAMS_FAILED,
  ADMIN_GETALLCLIENTS_SUCCESS,
  ADMIN_GETALLCLIENTS_FAILED,
  ADMIN_GETALLPROJECTS_SUCCESS,
  ADMIN_GETALLPROJECTS_FAILED,
} from "../constants/adminConstants";
import { getAllEmployee } from "src/api/admin api/admin";

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
const employeesDataReducer = (state, action) => {
  switch (action.type) {
    case GET_EMPLOYEEDATA_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };
    case GET_EMPLOYEEDATA_FAILED:
      return {
        ...state,
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

const adminGetEmployeeReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_GETALLEMPLOYEE_SUCCESS:
      return {
        ...state,
        loader: false,
        allEmployee: action.payload,
      };
    case ADMIN_GETALLEMPLOYEE_FAILED:
      return {
        ...state,
        loader: false,
        err: action.payload,
      };
    default:
      return state;
  }
};
const adminGetTeamsReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_GETALLTEAMS_SUCCESS:
      return {
        ...state,
        loader: false,
        allTeams: action.payload,
      };
    case ADMIN_GETALLTEAMS_FAILED:
      return {
        ...state,
        loader: false,
        err: action.payload,
      };
    default:
      return state;
  }
};
const adminGetClientsReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_GETALLCLIENTS_SUCCESS:
      return {
        ...state,
        loader: false,
        allClients: action.payload,
      };
    case ADMIN_GETALLCLIENTS_FAILED:
      return {
        ...state,
        loader: false,
        err: action.payload,
      };
    default:
      return state;
  }
};
const adminGetProjectsReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_GETALLPROJECTS_SUCCESS:
      return {
        ...state,
        loader: false,
        allProjects: action.payload,
      };
    case ADMIN_GETALLPROJECTS_FAILED:
      return {
        ...state,
        loader: false,
        err: action.payload,
      };
    default:
      return state;
  }
};

export function EmployeeProvider(props) {
  const [employeeTimeData, setEmployeesTimeData] = useState();
  const changeEmployeeTimeData = (newValue) => {
    setEmployeesTimeData(newValue);
  };
  const [employee, dispatchEmployeeDetails] = useReducer(
    employeeDetailsReducer,
    { employee: { loader: true } }
  );
  const [employeeUpdate, dispatchEmployeeUpdate] = useReducer(
    employeeUpdatesReducer,
    { employee: { loader: true } }
  );

  const [employeesData, dispatchEmployeesData] = useReducer(
    employeesDataReducer,
    { data: {}, loader: true, err: false }
  );
  const [adminAllEmployee, dispatchAdminAllEmployee] = useReducer(
    adminGetEmployeeReducer,
    { allEmployee: {}, loader: true, err: false }
  );
  const [adminAllTeams, dispatchAdminAllTeams] = useReducer(
    adminGetTeamsReducer,
    { allTeams: {}, loader: true, err: false }
  );
  const [adminAllClients, dispatchAdminAllClients] = useReducer(
    adminGetClientsReducer,
    { allClients: {}, loader: true, err: false }
  );
  const [adminAllProjects, dispatchAdminAllProjects] = useReducer(
    adminGetProjectsReducer,
    { allProjects: {}, loader: true, err: false }
  );

  return (
    <employeeContext.Provider
      value={{
        employee,
        dispatchEmployeeDetails,
        employeeUpdate,
        dispatchEmployeeUpdate,
        employeesData,
        dispatchEmployeesData,
        employeeTimeData,
        changeEmployeeTimeData,
        adminAllClients,
        adminAllEmployee,
        adminAllProjects,
        adminAllTeams,
        dispatchAdminAllClients,
        dispatchAdminAllEmployee,
        dispatchAdminAllProjects,
        dispatchAdminAllTeams,
      }}
    >
      {props.children}
    </employeeContext.Provider>
  );
}
