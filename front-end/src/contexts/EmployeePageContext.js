import React, { createContext, useReducer } from "react";
import {
  GET_COMMONDATA_SUCCESS,
  GET_COMMONDATA_FAILED,
  DELETE_SS_FAILED,
  DELETE_SS_SUCCESS,
  DELETE_ACT_FAILED,
  DELETE_ACT_SUCCESS,
} from "../constants/CurrentUserConstants";

export const EmployeePageContext = createContext();

const initialValue = {
  commonData: [],
  loader: true,
  err: false,
};

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case GET_COMMONDATA_SUCCESS:
      return {
        ...state,
        loader: false,
        commonData: action.payload,
      };
    case GET_COMMONDATA_FAILED:
      return {
        ...state,
        loader: false,
        err: true,
      };
    case DELETE_SS_SUCCESS:
      return {
        ...state,
        commonData: action.payload,
      };
    case DELETE_SS_FAILED:
      return {
        ...state,
      };
    case DELETE_ACT_SUCCESS:
      return {
        ...state,
        commonData: action.payload,
      };
    case DELETE_ACT_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const EmployeePageContextProvider = (props) => {
  const [commonData, dispatchCommonData] = useReducer(currentUserReducer, {
    commonData: [],
    loader: true,
    err: false,
  });

  return (
    <div>
      <EmployeePageContext.Provider value={{ commonData, dispatchCommonData }}>
        {props.children}
      </EmployeePageContext.Provider>
    </div>
  );
};

export default EmployeePageContextProvider;
