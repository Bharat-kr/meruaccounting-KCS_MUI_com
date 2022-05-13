import axios from "axios";

export const updateTimeZone = async (data) => {
  try {
    const res = await axios.patch("/timeZone", data);
    return res;
  } catch (error) {
    return error;
  }
};
