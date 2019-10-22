import * as type from "../constants/ActionTypes";
import axios from "axios";
import toastr from "toastr";

export const auth = {

  authenticateUser(data) {
    return {
      type: type.IS_AUTHENTICATED,
      data
    };
  },

  login (email, password) {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    console.log(serverUrl)
    return dispatch => {
      axios
        .post(
          `${serverUrl}/users/login`,
          {
            email: email,
            password: password
          }
        )
        .then(response => {
          dispatch({
            type: type.IS_AUTHENTICATED,
            data: response.data.user
          });
          toastr.success("Logged In");
        })
        .catch(error => {
          dispatch({ type: type.FAILED_AUTH });
          console.log(error, "error");
          toastr.error("Invalid Credentials");
        });
    };
  },

  logoOut() {
    return {
      type: type.IS_LOGGED_OUT
    };
  },

  isAuthenticated: function () {
    if (localStorage.getItem("miniBlog")) {
      let auth = JSON.parse(localStorage.getItem("miniBlog")).auth;
      if (auth.isAuthenticated && auth.role === 'Admin')
        return true
    } else {
      return false;
    }
  },
};
