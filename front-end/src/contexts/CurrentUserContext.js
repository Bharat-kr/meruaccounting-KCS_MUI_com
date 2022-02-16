import React, { createContext, useReducer } from "react";
import {
  GET_COMMONDATA_SUCCESS,
  GET_COMMONDATA_FAILED,
  DELETE_SS_FAILED,
  DELETE_SS_SUCCESS,
  DELETE_ACT_FAILED,
  DELETE_ACT_SUCCESS,
  GET_EMPLOYEEDATA_SUCCESS,
  GET_EMPLOYEEDATA_FAILED,
  EMP_DELETE_SS_SUCCESS,
  EMP_DELETE_SS_FAILED,
  EMP_DELETE_ACT_SUCCESS,
  EMP_DELETE_ACT_FAILED,
  TEAM_COMMONDATA_SUCCESS,
  TEAM_COMMONDATA_FAILED,
  PROJECTMEMBER_CD_SUCCESS,
  PROJECTMEMBER_CD_FAILED,
} from "../constants/CurrentUserConstants";

export const CurrentUserContext = createContext();

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

// const employeeDataReducer = (state, action) => {
//   switch (action.type) {
//     case GET_EMPLOYEEDATA_SUCCESS:
//       return {
//         ...state,
//         loader: false,
//         employeeCommonData:
//           // ...state.employeeCommonData,
//           // { ...action.payload },
//           action.payload,
//       };
//     case GET_EMPLOYEEDATA_FAILED:
//       return {
//         ...state,
//         loader: false,
//         err: true,
//       };
//     case EMP_DELETE_SS_SUCCESS:
//       return {
//         ...state,
//         employeeCommonData: action.payload,
//       };
//     case EMP_DELETE_SS_FAILED:
//       return {
//         ...state,
//       };
//     case EMP_DELETE_ACT_SUCCESS:
//       return {
//         ...state,
//         employeeCommonData: action.payload,
//       };
//     case EMP_DELETE_ACT_FAILED:
//       return {
//         ...state,
//       };
//     default:
//       return state;
//   }
// };
const teamCommonDataReducer = (state, action) => {
  switch (action.type) {
    case TEAM_COMMONDATA_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };
    case TEAM_COMMONDATA_FAILED:
      return {
        ...state,
        loader: false,
        err: action.payload,
      };
    default:
      return state;
  }
};
const projectMemberDataReducer = (state, action) => {
  switch (action.type) {
    case PROJECTMEMBER_CD_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };
    case PROJECTMEMBER_CD_FAILED:
      return {
        ...state,
        loader: false,
        err: action.payload,
      };
    default:
      return state;
  }
};

export const CurrentUserContextProvider = (props) => {
  const [commonData, dispatchCommonData] = useReducer(currentUserReducer, {
    commonData: [],
    loader: true,
    err: false,
  });
  const [teamCommonData, dispatchTeamCommonData] = useReducer(
    teamCommonDataReducer,
    {
      data: {},
      loader: true,
      err: false,
    }
  );
  const [projectMemberData, dispatchProjectMemberData] = useReducer(
    projectMemberDataReducer,
    {
      data: {},
      loader: true,
      err: false,
    }
  );
  // const [employeeCommonData, dispatchEmployeeCommonData] = useReducer(
  //   employeeDataReducer,
  //   {
  //     employeeCommonData: [],
  //     loader: true,
  //     err: false,
  //   }
  // );

  return (
    <div>
      <CurrentUserContext.Provider
        value={{
          commonData,
          dispatchCommonData,
          teamCommonData,
          dispatchTeamCommonData,
          projectMemberData,
          dispatchProjectMemberData,
        }}
      >
        {props.children}
      </CurrentUserContext.Provider>
    </div>
  );
};

export default CurrentUserContextProvider;
