import {
  STORE_USER_FROM_TOKEN,
  CLEAR_USER_DATA,
  SET_USER_LOADING
} from "../actions/types";

import JwtDecode from "jwt-decode";

export const signUpUser = formData => dispatch => {
  let body = new URLSearchParams(formData);

  let init = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  };

  fetch("/api/users", init)
    .then(response => {
      if (response.ok) {
        dispatch(
          logInUser({
            userEmail: formData.userEmail,
            userPassword: formData.userPassword
          })
        );
      } else {
        response.json().then(data => console.log(data));
      }
    })
    .catch(error => console.log(error));
};

export const logInUser = formData => dispatch => {
  dispatch(setUserLoading());

  let body = new URLSearchParams(formData);

  let init = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  };

  fetch("/api/users/login", init)
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          window.localStorage.setItem("mytinerarytoken", data.token);

          dispatch(
            storeUserFromToken(data.token)
          );
        });
      }
    })
    .catch(error => console.log(error));
};

export const storeUserFromToken = token => dispatch => {
  dispatch(setUserLoading());

  const decodedToken = JwtDecode(token);
  console.log(decodedToken.userId)

  fetch(`/api/users/${decodedToken.userId}`, { headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' } })
    .then(response => response.json())
    .then(data => {
      const userData = {
        token,
        user: data
      };

      dispatch({
        type: STORE_USER_FROM_TOKEN,
        payload: userData
      });
    }).catch(error => console.log(error))

};

export const logUserOut = () => dispatch => {
  dispatch({
    type: CLEAR_USER_DATA
  });

  window.localStorage.removeItem("mytinerarytoken");
};

export const setUserLoading = () => dispatch => {
  dispatch({
    type: SET_USER_LOADING
  });
};
