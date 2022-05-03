// API for changing and getting screenshot deleteTime
import axios from "axios";

export const getDeleteTime = async () => {
  try {
    const res = await axios.get("/screenshotDeleteTime");
    return res;
  } catch (error) {
    return error;
  }
};

export const updateDeleteTime = async (body) => {
  try {
    const res = await axios.patch("/screenshotDeleteTime", body);
    return res;
  } catch (error) {
    return error;
  }
};
