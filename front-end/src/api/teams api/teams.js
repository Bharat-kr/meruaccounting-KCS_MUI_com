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

export const createTeam = (data, dispatch) => {
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

export const getEmployeeList = async (dispatch) => {
  dispatch({ type: EMPLOYEE_LIST_REQUEST });
  // console.log(localStorage['Bearer Token']);
  try {
    const res = await axios.get('http://localhost:8000/team/getTeam', {
      headers: {
        Authorization: `Bearer ${localStorage['Bearer Token']}`
      }
    });
    console.log(res);
    if (res.data.status === 'success') {
      dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: res.data.data });
      console.log('passed');
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: EMPLOYEE_LIST_FAILED, payload: error });
  }
};

export const updateMember = async () => {
  try {
    const res = await axios.patch('http://localhost:8000/team/updateMember', config, {
      employeeId: '61b1c7ecbe409360fca47a90'
    });
  } catch (err) {
    console.log(err);
  }
};
updateMember();
