import { GET_CITIES, CITIES_LOADING } from './types'

export const getCities = () => dispatch => {

  dispatch(setCitiesLoading());
  fetch('/cities')
    .then(response => response.json()).then(data => dispatch({
      type: GET_CITIES,
      payload: data
    })

    )
}

export const setCitiesLoading = () => {
  return {
    type: CITIES_LOADING
  }
}