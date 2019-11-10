import { GET_CITIES, CITIES_LOADING } from "../actions/types";

const initState = { cities: [], loading: false };

export default function(state = initState, action) {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
        loading: false
      };

    case CITIES_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return { ...state };
  }
}
