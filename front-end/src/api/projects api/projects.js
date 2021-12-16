import {
  CREATE_PROJECTS_FAILED,
  CREATE_PROJECTS_REQUEST,
  CREATE_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILED,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
} from 'src/constants/ProjectConstants';

const token = localStorage['Bearer Token'];
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getClientProjects = async (dispatch) => {
  try {
    dispatch({
      type: GET_PROJECTS_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:8000/client/getClientProjects`,
      config
    );

    dispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: data,
    });
    console.log(`Employee details ${data}`);
  } catch (error) {
    dispatch({
      type: GET_PROJECTS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProject = async (incomingData, dispatch) => {
  try {
    dispatch({
      type: CREATE_PROJECTS_REQUEST,
    });

    const { data } = await axios.post(
      `http://localhost:8000/project`,
      incomingData,
      config
    );

    dispatch({
      type: CREATE_PROJECTS_SUCCESS,
      payload: data,
    });
    console.log(`Employee details ${data}`);
  } catch (error) {
    dispatch({
      type: CREATE_PROJECTS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
