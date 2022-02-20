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

  return (
    <reportsContext.Provider
      value={{
        reports,
        dispatchGetReports,
        savedReports,
        dispatchGetSavedReports,
      }}
    >
      {props.children}
    </reportsContext.Provider>
  );
}
