// API for changing and getting screenshot deleteTime
import axios from "axios";

export const getDeleteTime = () => {
  try {
    const res = axios.get("/screenshotDeleteTime");
    return res;
  } catch (error) {
    return error;
  }
};

export const updateDeleteTime = (body) => {
  try {
    const res = axios.patch("/screenshotDeleteTime", body);
    return res;
  } catch (error) {
    return error;
  }
};
