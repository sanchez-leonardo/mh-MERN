import {
  SET_USER_LOADING,
  STORE_USER_FROM_TOKEN,
  CLEAR_USER_DATA,
  LIKE_OR_DISLIKE
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

          dispatch(storeUserFromToken(data.token));
        });
      }
    })
    .catch(error => console.log(error));
};

export const storeUserFromToken = token => dispatch => {
  dispatch(setUserLoading());

  const decodedToken = JwtDecode(token);

  fetch(`/api/users/${decodedToken.userId}`, {
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
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
    })
    .catch(error => console.log(error));
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

export const likeItinerary = (userId, itineraryId, token) => async dispatch => {
  dispatch({ type: SET_USER_LOADING });

  try {
    let like = await fetch(`/api/users/${userId}/addfav/${itineraryId}`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    console.log("like", like);

    if (like.ok) {
      let newFavs = await like.json();

      dispatch({ type: LIKE_OR_DISLIKE, payload: newFavs });

      console.log("newfavs", newFavs);
    }
  } catch (error) {
    console.log(error);
  }
};

export const dislikeItinerary = (
  userId,
  itineraryId,
  token
) => async dispatch => {
  dispatch({ type: SET_USER_LOADING });

  try {
    let dislike = await fetch(`/api/users/${userId}/remfav/${itineraryId}`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    console.log("dislike", dislike);

    if (dislike.ok) {
      let newFavs = await dislike.json();

      dispatch({ type: LIKE_OR_DISLIKE, payload: newFavs });

      console.log("newfavs", newFavs);
    }
  } catch (error) {
    console.log(error);
  }
};
