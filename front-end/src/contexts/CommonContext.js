import React, { createContext, useReducer } from "react";
import {
  GET_ALLEMPLOYEES_REQUEST,
  GET_ALLEMPLOYEES_FAILED,
  GET_ALLEMPLOYEES_SUCCESS,
} from "../constants/CommonConstants";

export const CommonContext = createContext();

const allEmployeeReducer = (state, action) => {
  switch (action.type) {
    case GET_ALLEMPLOYEES_SUCCESS:
      return {
        ...state,
        loader: false,
        employees: action.payload,
      };
    case GET_ALLEMPLOYEES_FAILED:
      return {
        ...state,
        loader: false,
        err: action.payload,
      };
    default:
      return state;
  }
};

export const CommonContextProvider = (props) => {
  const [allEmployees, dispatchAllEmployees] = useReducer(allEmployeeReducer, {
    employees: [],
    loader: true,
    err: false,
  });

  return (
    <div>
      <CommonContext.Provider
        value={{
          allEmployees,
          dispatchAllEmployees,
        }}
      >
        {props.children}
      </CommonContext.Provider>
    </div>
  );
};

export default CommonContextProvider;
