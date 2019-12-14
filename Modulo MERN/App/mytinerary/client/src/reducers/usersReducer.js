import {
  LOG_USER_IN,
  CLEAR_USER_DATA,
  SET_USER_LOADING
} from "../actions/types";

const initState = {
  logged: false,
  user: {},
  loading: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case LOG_USER_IN:
      return {
        ...state,
        logged: true,
        user: action.payload,
        loading: false
      };

    case CLEAR_USER_DATA:
      return {
        ...state,
        logged: false,
        user: {},
        loading: false
      };

    case SET_USER_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
