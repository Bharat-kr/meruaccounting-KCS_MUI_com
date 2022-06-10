import React from "react";
import { useReducer } from "react";

import {
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAILED,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAILED,
  TASK_MEMBERADD_SUCCESS,
  TASK_MEMBERADD_FAILED,
  TASK_MEMBERDEL_SUCCESS,
  TASK_MEMBERDEL_FAILED,
  GET_TASK_SUCCESS,
  GET_TASK_FAILED,
} from "../constants/TasksConstants";

export const tasksContext = React.createContext();

const getTasksReducer = (state, action) => {
  switch (action.type) {
    case GET_TASK_SUCCESS:
      return {
        loader: false,
        Task: action.payload,
      };
    case GET_TASK_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
const taskCreateReducer = (state, action) => {
  switch (action.type) {
    case TASK_CREATE_SUCCESS:
      return {
        loader: false,
        createdTask: action.payload,
      };
    case TASK_CREATE_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
const taskDeleteReducer = (state, action) => {
  switch (action.type) {
    case TASK_DELETE_SUCCESS:
      return {
        loader: false,
        deletedTask: action.payload,
      };
    case TASK_DELETE_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
const addTaskMemReducer = (state, action) => {
  switch (action.type) {
    case TASK_MEMBERADD_SUCCESS:
      return {
        loader: false,
        addedMem: action.payload,
      };
    case TASK_MEMBERADD_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
const deleteTaskMemReducer = (state, action) => {
  switch (action.type) {
    case TASK_MEMBERDEL_SUCCESS:
      return {
        loader: false,
        deletedMem: action.payload,
      };
    case TASK_DELETE_FAILED:
      return {
        loader: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export function TasksProvider(props) {
  const [getTasks, dispatchGetTask] = useReducer(getTasksReducer, {
    loader: true,
    getTasks: [],
  });

  const [createTask, dispatchCreateTask] = useReducer(taskCreateReducer, {
    loader: true,
  });

  const [deleteTask, dispatchDeleteTask] = useReducer(taskDeleteReducer, {
    loader: true,
  });

  const [addTaskMember, dispatchAddTaskMember] = useReducer(addTaskMemReducer, {
    loader: true,
    addTaskMember: [],
  });
  const [deleteTaskMember, dispatchDeleteTaskMember] = useReducer(
    deleteTaskMemReducer,
    {
      loader: true,
    }
  );

  return (
    <tasksContext.Provider
      value={{
        getTasks,
        dispatchGetTask,
        createTask,
        dispatchCreateTask,
        deleteTask,
        dispatchDeleteTask,
        addTaskMember,
        dispatchAddTaskMember,
        deleteTaskMember,
        dispatchDeleteTaskMember,
      }}
    ></tasksContext.Provider>
  );
}
