import React, { useReducer } from "react";
import {
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAILED,
} from "../constants/ReportsConstants";

export const reportsContext = React.createContext();

const getReportsReducer = (state, action) => {
  switch (action.type) {
    case GET_REPORTS_SUCCESS:
      return {
        ...state,
        loader: false,
        reports: action.payload,
        error: false,
      };
    case GET_REPORTS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const getSavedReportsReducer = (state, action) => {
  switch (action.type) {
    case GET_REPORTS_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload.data,
        reports: action.payload.report,
        error: false,
      };
    case GET_REPORTS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export function ReportsProvider(props) {
  const [reports, dispatchGetReports] = useReducer(getReportsReducer, {
    loader: true,
    reports: [],
    data: {},
    error: false,
  });
  const [savedReports, dispatchGetSavedReports] = useReducer(
    getSavedReportsReducer,
    {
      loader: true,
      data: {},
      reports: [],
      error: false,
    }
  );

  const [byClients, setByClients] = React.useState([]);
  const [byProject, SetByProject] = React.useState([]);
  const [date, setdate] = React.useState([null, null]);
  const [allOptions, setAllOptions] = React.useState([]);
  const [employeeOptions, setemployeeOptions] = React.useState([]);
  const [projectOptions, setprojectOptions] = React.useState([]);
  const [clientOptions, setclientOptions] = React.useState([]);
  const [employees, setemployees] = React.useState([]);
  const [projects, setprojects] = React.useState([]);
  const [clients, setclients] = React.useState([]);
  const [group, setgroup] = React.useState([
    { label: "Group by employee", value: "E" },
    // { label: "Group by project", value: "P" },
  ]);
  const [disableState, setDisableState] = React.useState(true);
  const [saveReportsOptions, setSaveReportOptions] = React.useState();

  const byClientsFunc = (cli) => {
    setByClients(cli);
  };
  const byProjectFunc = (pro) => {
    SetByProject(pro);
  };
  const dateFunc = (x) => {
    setdate(x);
  };
  const allOptionsFunc = (x) => {
    setAllOptions(x);
  };
  const employeesOptionsFunc = (x) => {
    setemployeeOptions(x);
  };
  const projectsOptionsFunc = (x) => {
    setprojectOptions(x);
  };
  const clientsOptionsFunc = (x) => {
    setclientOptions(x);
  };
  const employeesFunc = (x) => {
    setemployees(x);
  };
  const projectsFunc = (x) => {
    setprojects(x);
  };
  const clientsFunc = (x) => {
    setclients(x);
  };
  const groupFunc = (x) => {
    setgroup(x);
  };
  const disableStateFunc = (x) => {
    setDisableState(x);
  };
  const saveReportOptionsFunc = (x) => {
    setSaveReportOptions(x);
  };
  return (
    <reportsContext.Provider
      value={{
        reports,
        dispatchGetReports,
        savedReports,
        dispatchGetSavedReports,
        byClients,
        byProject,
        byClientsFunc,
        byProjectFunc,
        date,
        dateFunc,
        allOptions,
        allOptionsFunc,
        employeeOptions,
        employeesOptionsFunc,
        projectOptions,
        projectsOptionsFunc,
        clientOptions,
        clientsOptionsFunc,
        employees,
        employeesFunc,
        projects,
        projectsFunc,
        clients,
        clientsFunc,
        group,
        groupFunc,
        disableState,
        disableStateFunc,
        saveReportsOptions,
        saveReportOptionsFunc,
      }}
    >
      {props.children}
    </reportsContext.Provider>
  );
}
