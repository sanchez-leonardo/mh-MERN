import { GET_CITIES, GET_CITY_BY_ID, CITIES_LOADING } from "./types";

export const getCities = () => dispatch => {
  dispatch(setCitiesLoading());
  fetch("/cities")
    .then(response => response.json())
    .then(data =>
      dispatch({
        type: GET_CITIES,
        payload: data
      })
    );
};

export const getCityById = cityId => dispatch => {
  dispatch(setCitiesLoading());
  fetch("/cities/" + cityId)
  .then(response => response.json())
  .then(data => dispatch({
    type: GET_CITY_BY_ID,
    payload: data
  }))
}

export const setCitiesLoading = () => {
  return {
    type: CITIES_LOADING
  };
};
