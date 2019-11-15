import { GET_ITINERARIES_BY_CITY, ITINERARIES_LOADING } from './types';

export const getItinerariesByCity = cityId => dispatch => {
  dispatch(setItinerariesLoading());
  fetch('/itineraries/' + cityId)
    .then(response => response.json())
    .then(data =>
      dispatch({
        type: GET_ITINERARIES_BY_CITY,
        payload: data
      })
    );
};

export const setItinerariesLoading = () => {
  return {
    type: ITINERARIES_LOADING
  };
};
