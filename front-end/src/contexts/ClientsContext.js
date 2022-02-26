import React, { createContext, useState, useReducer, useEffect } from "react";
import { ADD_TEAM_PROJECTS_RESET } from "src/constants/ProjectConstants";

import {
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAILED,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAILED,
  ADD_CLIENT_RESET,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILED,
  DELETE_CLIENT_RESET,
  GET_CLIENTPRO_FAILED,
  GET_CLIENTPRO_SUCCESS,
  EDIT_CLIENT_SUCCESS,
  EDIT_CLIENT_FAILED,
  EDIT_CLIENT_RESET,
} from "../constants/ClientConstants";

export const ClientsContext = createContext();

const clientProjectDetailsReducer = (state, action) => {
  switch (action.type) {
    case GET_CLIENTPRO_SUCCESS:
      return {
        loader: false,
        clientProjectDetails: action.payload,
      };
    case GET_CLIENTPRO_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const clientDetailsReducer = (state, action) => {
  switch (action.type) {
    case GET_CLIENT_SUCCESS:
      return {
        loader: false,
        client: action.payload,
      };
    case GET_CLIENT_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const addClientReducer = (state, action) => {
  switch (action.type) {
    case ADD_CLIENT_SUCCESS:
      return {
        loader: false,
        newClient: action.payload,
      };
    case ADD_CLIENT_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case ADD_CLIENT_RESET:
      return { newClient: {} };
    default:
      return state;
  }
};

const deleteClientReducer = (state, action) => {
  switch (action.type) {
    case DELETE_CLIENT_SUCCESS:
      return {
        loader: false,
        deleteClient: action.payload,
      };
    case DELETE_CLIENT_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case DELETE_CLIENT_RESET:
      return { deleteClient: {} };
    default:
      return state;
  }
};

const editClientReducer = (state, action) => {
  switch (action.type) {
    case EDIT_CLIENT_SUCCESS:
      return {
        loader: false,
        editClient: action.payload,
      };
    case EDIT_CLIENT_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    case EDIT_CLIENT_RESET:
      return { editClient: {} };
    default:
      return state;
  }
};

export const ClientsContextProvider = (props) => {
  const [clientDetails, dispatchClientDetails] = useReducer(
    clientDetailsReducer,
    { client: { loader: true } }
  );
  const [newClient, dispatchAddClient] = useReducer(addClientReducer, {
    newClient: { loader: true },
  });
  const [deletedClient, dispatchDeleteClient] = useReducer(
    deleteClientReducer,
    {
      deleteClient: { loader: true },
    }
  );
  const [clientProjectDetails, dispatchClientProjectDetails] = useReducer(
    clientProjectDetailsReducer,
    { clientProjectDetails: { loader: true } }
  );
  const [editClient, dispatchEditClient] = useReducer(editClientReducer, {
    editClient: { loader: true },
  });
  const [clients, setClients] = useState([]);
  const [currentClient, setcurrentClient] = useState("");
  const [currentProject, setcurrentProject] = useState("");

  const changeClient = (client) => {
    setcurrentClient(client);
  };
  const changeProject = (project) => {
    setcurrentProject(project);
  };

  const addClient = (client) => {
    setClients((prevClients) => [...prevClients, client]);
  };

  const updateClient = (client, index) => {
    const newClients = [...clients];
    // console.log(newClients);
    newClients[index] = client;
    setClients(newClients);
  };

  return (
    <div>
      <ClientsContext.Provider
        value={{
          clients,
          clientDetails,
          dispatchClientDetails,
          newClient,
          dispatchAddClient,
          deletedClient,
          dispatchDeleteClient,
          currentClient,
          changeClient,
          addClient,
          currentProject,
          changeProject,
          updateClient,
          clientProjectDetails,
          dispatchClientProjectDetails,
          editClient,
          dispatchEditClient,
          // changeProjectmember
        }}
      >
        {props.children}
      </ClientsContext.Provider>
    </div>
  );
};

export default ClientsContextProvider;
