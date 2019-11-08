import { GET_CITIES } from '../actions/types'

const initState = { cities: [], loading: false }

export default function (state = initState, action) {

  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
        loading: false
      }
      break;

    case CITIES_LOADING:
      return {
        ...state,
        loading
      }

    default:
      state
      break;
  }

}