import { indexOf } from "lodash-es";
import React, { createContext, useState, useReducer, useEffect } from "react";
import { ADD_TEAM_PROJECTS_RESET } from "src/constants/ProjectConstants";

import {
  GET_CLIENT_REQUEST,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAILED,
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAILED,
  ADD_CLIENT_RESET,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILED,
  DELETE_CLIENT_RESET,
  GET_CLIENTPRO_FAILED,
  GET_CLIENTPRO_REQUEST,
  GET_CLIENTPRO_SUCCESS,
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

export const ClientsContextProvider = (props) => {
  const [clientDetails, dispatchClientDetails] = useReducer(
    clientDetailsReducer,
    { client: { loader: true } }
  );
  const [newClient, dispatchAddClient] = useReducer(addClientReducer, {
    newClient: { loader: true },
  });
  const [deleteClient, dispatchDeleteClient] = useReducer(deleteClientReducer, {
    deleteClient: { loader: true },
  });
  const [clientProjectDetails, dispatchClientProjectDetails] = useReducer(
    clientProjectDetailsReducer,
    { clientProjectDetails: { loader: true } }
  );
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Amazon",
      Clientmembers: [
        "Kamal",
        "Ayush",
        "Raksha",
        "Mark",
        "Surya",
        "Zuckerberg",
        "Jaya",
        "Sushma",
      ],
      projects: [
        {
          name: "Project 1",
          Projectmembers: ["Raksha", "Mark", "Surya"],
          rate: 200,
        },
        {
          name: "Project 2",
          Projectmembers: ["Ayush", "Zuckerberg"],
          rate: 300,
        },
      ],
    },
    {
      id: 2,
      name: "Google",
      Clientmembers: [
        "Kamal",
        "Ayush",
        "Raksha",
        "Mark",
        "Surya",
        "Zuckerberg",
        "Jaya",
        "Sushma",
      ],
      projects: [
        {
          name: "Project 3",
          Projectmembers: ["Jaya", "Sushma"],
          rate: 100,
        },
        {
          name: "Project 4",
          Projectmembers: ["Kamal", "Ayush"],
          rate: 50,
        },
      ],
    },
  ]);
  const [currentClient, setcurrentClient] = useState("");
  const [currentProject, setcurrentProject] = useState("");

  // const [currentProjectmembers, setcurrentProjectmembers] = useState(
  //   clients.projects[0].Projectmembers
  // );

  // const changeProjectmember = (member) => {
  //   setcurrentProjectmembers(member);
  // };
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
          deleteClient,
          dispatchDeleteClient,
          currentClient,
          changeClient,
          addClient,
          currentProject,
          changeProject,
          updateClient,
          clientProjectDetails,
          dispatchClientProjectDetails,
          // changeProjectmember
        }}
      >
        {props.children}
      </ClientsContext.Provider>
    </div>
  );
};

export default ClientsContextProvider;
