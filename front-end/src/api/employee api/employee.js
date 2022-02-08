import axios from "axios";

import {
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAILED,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_FAILED,
  GET_EMPLOYEEDATA_SUCCESS,
  GET_EMPLOYEEDATA_FAILED,
} from "../../constants/EmployeeConstants";

export const getEmployeeDetails = async (_id, dispatch) => {
  try {
    const { data } = await axios.get(`/employee/${_id}`);

    dispatch({ type: EMPLOYEE_DETAILS_SUCCESS, payload: data });
    console.log(`Employee details `);
    console.log(data);
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DETAILS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const employeeUpdate = async (_id, data, dispatch) => {
  try {
    const res = await axios.patch(`/employee/edit/${_id}`, data);

    dispatch({ type: EMPLOYEE_UPDATE_SUCCESS, payload: res.data.data });
    console.log(`Employee updated `);
    console.log(res);
  } catch (error) {
    dispatch({
      type: EMPLOYEE_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const employeesTimeDetails = async (incomingData, dispatch) => {
  try {
    console.log(incomingData);
    const res = await axios.post(`/teamCommondata`, {
      userIds: incomingData,
    });
    if (res.status === 200) {
      console.log("commondata success", res.data);
      dispatch({
        type: GET_EMPLOYEEDATA_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_EMPLOYEEDATA_FAILED,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
