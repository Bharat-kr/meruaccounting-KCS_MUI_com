import React, { useContext, useReducer, useEffect } from 'react';
// import { setLocalStorage } from "../helper/localStorage";

const loginContext = React.createContext();

const initialValue = {
  isLogin: false,
  userData: {},
  loader: false,
  err: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      if (action.data) {
        localStorage.setItem('ud', JSON.stringify(action.data));

        return {
          userData: action.data,
          isLogin: true,
          loader: false
        };
      }
      return {
        ...state,
        userData: {},
        isLogin: false,
        loader: false
      };

    case 'LOGIN_ERR': {
      return { ...state, err: true, loader: false };
    }
    case 'LOGIN_LOADER': {
      return { ...state, loader: true };
    }

    default:
      return state;
  }
};

export function LoginProvider(props) {
  const [loginC, dispatchLogin] = useReducer(reducer, initialValue, () => {
    const localData = localStorage.getItem('loginC');
    return localData ? JSON.parse(localData) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem('loginC', JSON.stringify(loginC));
  }, [loginC]);

  return <loginContext.Provider value={{ loginC, dispatchLogin }} {...props} />;
}

export function LoginContext() {
  const context = useContext(loginContext);
  if (!context) {
    throw new Error(' Please use the context inside parent scope');
  }
  return context;
}
