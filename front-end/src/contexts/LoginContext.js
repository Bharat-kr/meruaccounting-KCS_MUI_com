import React, { useReducer, useEffect } from "react";
// import { setLocalStorage } from "../helper/localStorage";

export const loginContext = React.createContext();

const initialValue = {
  isLogin: false,
  userData: {},
  loader: false,
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      if (action.data) {
        console.log(action.data);
        localStorage.setItem("ud", action.data);
        return {
          userData: action.data,
          isLogin: true,
          loader: false,
          error: false,
        };
      }
      return {
        userData: {},
        isLogin: false,
        loader: false,
        error: false,
      };

    case "LOGIN_ERR": {
      return { ...state, error: true, loader: false };
    }
    case "LOGIN_LOADER": {
      return { loader: true };
    }

    default:
      return state;
  }
};

export function LoginProvider(props) {
  const [loginC, dispatchLogin] = useReducer(reducer, initialValue, () => {
    const localData = localStorage.getItem("loginC");
    return localData ? JSON.parse(localData) : initialValue;
  });

  useEffect(() => {
    if (!loginC.error) {
      localStorage.setItem("loginC", JSON.stringify(loginC));
    }
  }, [loginC]);

  return <loginContext.Provider value={{ loginC, dispatchLogin }} {...props} />;
}
