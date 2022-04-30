//this api will be called on every window load to check if the role is changed
import axios from "axios";

export const roleCheckApi = async () => {
  await axios
    .post("/roleCheck")
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem(
          "loginC",
          JSON.stringify({
            isLogin: true,
            error: false,
            loader: false,
            userData: res.data,
          })
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
