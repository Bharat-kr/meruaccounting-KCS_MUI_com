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
    error: false,
  });

  return (
    <reportsContext.Provider
      value={{
        reports,
        dispatchGetReports,
      }}
    >
      {props.children}
    </reportsContext.Provider>
  );
}
