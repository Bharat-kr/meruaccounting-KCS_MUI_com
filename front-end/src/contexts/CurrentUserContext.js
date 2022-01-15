import { indexOf } from "lodash-es";
import React, { createContext, useState, useReducer } from "react";
import {
  GET_COMMONDATA_SUCCESS,
  GET_COMMONDATA_FAILED,
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

  /////temporary
  const [currentUser, setcurrentUser] = useState({
    role: "User",
    company: "Meru Accounting",
    firstName: "Kamal",
    lastName: "Singh",
    email: "kamal021099@gmail.com",
    password: "12345678",
    day: {
      1638729000: {
        date: `${new Date()}`,
        hours: 50,
        timeRange: [
          {
            startTime: "6:04pm",
            endTime: "6:32pm",
            activityLevel: 50,
            taskName: "Development",
            screenShots: [
              {
                activityLevel: 70,
                url: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google_Docs.max-1100x1100.png",
                time: new Date(),
                taskName: "VELLA",
              },
            ],
          },
        ],
      },
    },
  });
  /////temporary

  return (
    <div>
      <CurrentUserContext.Provider
        value={{ currentUser, commonData, dispatchCommonData }}
      >
        {props.children}
      </CurrentUserContext.Provider>
    </div>
  );
};

export default CurrentUserContextProvider;
