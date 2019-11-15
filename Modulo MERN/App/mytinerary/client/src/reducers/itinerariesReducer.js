import { GET_ITINERARIES_BY_CITY, ITINERARIES_LOADING } from '../actions/types';

const initState = { itineraries: [], loading: false };

export default function(state = initState, action) {
  switch (action.type) {
    case GET_ITINERARIES_BY_CITY:
      return {
        ...state,
        itineraries: action.payload,
        loading: false
      };

    case ITINERARIES_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return { ...state };
  }
}
