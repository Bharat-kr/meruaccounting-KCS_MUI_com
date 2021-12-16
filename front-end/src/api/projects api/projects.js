import {
  PROJECTS_FAILED,
  PROJECTS_REQUEST,
  PROJECTS_SUCCESS,
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
      type: PROJECTS_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:8000/client/getClientProjects`,
      config
    );

    dispatch({
      type: PROJECTS_SUCCESS,
      payload: data,
    });
    console.log(`Employee details ${data}`);
  } catch (error) {
    dispatch({
      type: PROJECTS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
