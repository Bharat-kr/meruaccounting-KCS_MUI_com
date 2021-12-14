import axios from 'axios';

import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_RESET,
  TEAM_CREATE_SUCCESS,
  EMPLOYEE_LIST_FAILED,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_REQUEST
} from '../../constants/TeamConstants';

const token = localStorage['Bearer Token'];
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

export const AddMember = (data, dispatch) => {
  dispatch({ type: TEAM_CREATE_REQUEST });

  axios
    .post('http://localhost:8000/team/create', config, data)
    .then((res) => {
      console.log('login data', res);
      if (res.data.status === 'Created team') {
        console.log(res.data);
        dispatch({ type: TEAM_CREATE_SUCCESS, payload: res.data.data });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: TEAM_CREATE_FAILED, payload: err });
    });
};

// export const getEmployeeList = async (dispatch) => {
//   try {
//     dispatch({ type: EMPLOYEE_LIST_REQUEST });
//     console.log(`Bearer ${localStorage['Bearer Token']}`);
//     const { data } = await axios.get('http://localhost:8000/team/getTeam', config);
//     console.log(data.data);
//     dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: data.data });
//     console.log('Passed');
//   } catch (error) {
//     console.log(error);
//     dispatch({ type: EMPLOYEE_LIST_FAILED, payload: error });
//   }
// };

export const getEmployeeList = (dispatch) => {
  dispatch({ type: EMPLOYEE_LIST_REQUEST });
  axios
    .get('http://localhost:8000/team/getTeam', config)
    .then((res) => {
      console.log(res.data.data);
      dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: res.data.data });
      console.log('passed');
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: EMPLOYEE_LIST_FAILED, payload: error });
    });
};

export const updateMember = async () => {
  try {
    const res = await axios.patch('http://localhost:8000/team/updateMember', config);
  } catch (err) {
    console.log(err);
  }
};
