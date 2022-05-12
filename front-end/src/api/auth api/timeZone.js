import axios from "axios";

export const updateTimeZone = async (data) => {
  await axios
    .patch("/timeZone", data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
