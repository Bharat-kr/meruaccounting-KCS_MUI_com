import axios from 'axios';

import {
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAILED,
} from '../constants/EmployeeConstants';

export const getEmployeeDetails = async (_id, dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_DETAILS_REQUEST });

    const { data } = await axios.get(`/employee/${_id}`);

    dispatch({ type: EMPLOYEE_DETAILS_SUCCESS, payload: data });
    console.log(`Employee details `);
    console.log(data);
  } catch {
    dispatch({
      type: EMPLOYEE_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
