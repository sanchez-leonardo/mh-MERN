import {
  // LOG_IN_USER,
  USER_LOADING
} from "../actions/types";

export const signUpUser = (formData) => dispatch => {

  let body = new URLSearchParams(formData);

  let init = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  };

  fetch("/api/users", init)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

// export const logInUser = async (formData) => dispatch => {

//   let body = new URLSearchParams(formData);

//   let init = {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body
//   };

//   try {

//     fetch("/api/login", init);

//   }
//   catch (e) {
//     console.log(e)
//   }

// }

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};