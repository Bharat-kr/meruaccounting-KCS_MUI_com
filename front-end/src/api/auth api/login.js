import axios from "axios";

export const loginApi = (data, dispatch) => {
  dispatch({ type: "LOGIN_LOADER" });
  axios
    .post("/login", data)
    .then((res) => {
      console.log("login data", res);
      if (res.data.status === "success") {
        localStorage.setItem("Bearer Token", res.data.token);
        localStorage.setItem("ud", JSON.stringify(res.data.user));
        console.log(res.data);
        dispatch({ type: "SET_USER_DATA", data: res.data.user });
        // window.history.pushState('', 'Dashboard', '/dashboard/userpage');
        window.location.href = "/dashboard/userpage";
        // window.location.replace('/dashboard/userpage');
      } else {
        dispatch({ type: "LOGIN_ERR" });
      }
    })
    .catch((err) => {

      console.log(err);
      dispatch({ type: "LOGIN_ERR" });

    });
};
