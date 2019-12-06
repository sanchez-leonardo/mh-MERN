import { LOG_IN_USER, SET_USER_LOADING } from "../actions/types";

const initState = {
  user: {
    logged: false,
    userId: "",
    userName: "",
    userEmail: ""
  }, loading: false
};

export default function (state = initState, action) {

  switch (action) {

    case LOG_IN_USER:
      return {
        ...state,
        [logged]: true,
        user: action.payload,
        loading: false
      }

    case SET_USER_LOADING:
      return {
        ...state,
        loading: true
      }

    default: return state
  }



}