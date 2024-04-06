// Action Types
export const FETCH_COUNTRIES_SUCCESS = "FETCH_COUNTRIES_SUCCESS";
export const CREATE_COUNTRY_SUCCESS = "CREATE_COUNTRY_SUCCESS";
export const DELETE_COUNTRY_SUCCESS = "DELETE_COUNTRY_SUCCESS";
export const UPDATE_COUNTRY_SUCCESS = "UPDATE_COUNTRY_SUCCESS";

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";

// Action Creators
export const fetchCountriesSuccess = (countries) => ({
  type: FETCH_COUNTRIES_SUCCESS,
  payload: countries,
});

export const createCountrySuccess = (country) => ({
  type: CREATE_COUNTRY_SUCCESS,
  payload: country,
});

export const deleteCountrySuccess = (countryId) => ({
  type: DELETE_COUNTRY_SUCCESS,
  payload: countryId,
});

export const updateCountrySuccess = (country) => ({
  type: UPDATE_COUNTRY_SUCCESS,
  payload: country,
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setTotalPages = (totalPages) => ({
  type: SET_TOTAL_PAGES,
  payload: totalPages,
});
