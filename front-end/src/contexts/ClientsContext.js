import { indexOf } from 'lodash-es';
import React, { createContext, useState, useReducer } from 'react';

import {
  GET_CLIENT_REQUEST,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAILED,
} from '../constants/ClientConstants';

export const ClientsContext = createContext();

const clientDetailsReducer = (state, action) => {
  switch (action.type) {
    case GET_CLIENT_REQUEST:
      return {
        loader: true,
      };

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

export const ClientsContextProvider = (props) => {
  const [clientDetails, dispatchClientDetails] = useReducer(
    clientDetailsReducer,
    { client: {} }
  );

  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Amazon',
      Clientmembers: [
        'Kamal',
        'Ayush',
        'Raksha',
        'Mark',
        'Surya',
        'Zuckerberg',
        'Jaya',
        'Sushma',
      ],
      projects: [
        {
          name: 'Project 1',
          Projectmembers: ['Raksha', 'Mark', 'Surya'],
          rate: 200,
        },
        {
          name: 'Project 2',
          Projectmembers: ['Ayush', 'Zuckerberg'],
          rate: 300,
        },
      ],
    },
    {
      id: 2,
      name: 'Google',
      Clientmembers: [
        'Kamal',
        'Ayush',
        'Raksha',
        'Mark',
        'Surya',
        'Zuckerberg',
        'Jaya',
        'Sushma',
      ],
      projects: [
        {
          name: 'Project 3',
          Projectmembers: ['Jaya', 'Sushma'],
          rate: 100,
        },
        {
          name: 'Project 4',
          Projectmembers: ['Kamal', 'Ayush'],
          rate: 50,
        },
      ],
    },
  ]);
  const [currentClient, setcurrentClient] = useState(clients[0]);
  const [currentProject, setcurrentProject] = useState(
    currentClient.projects[0]
  );

  // const [currentProjectmembers, setcurrentProjectmembers] = useState(
  //   clients.projects(0).Projectmembers
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
          currentClient,
          changeClient,
          addClient,
          currentProject,
          changeProject,
          updateClient,
          // changeProjectmember
        }}
      >
        {props.children}
      </ClientsContext.Provider>
    </div>
  );
};

export default ClientsContextProvider;
