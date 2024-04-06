import {
  FETCH_COUNTRIES_SUCCESS,
  CREATE_COUNTRY_SUCCESS,
  DELETE_COUNTRY_SUCCESS,
  UPDATE_COUNTRY_SUCCESS,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGES,
} from "../actions/countryActions.js";

const initialState = {
  countries: [],

  currentPage: 1,
  totalPages: 1,
};

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload,
      };
    case CREATE_COUNTRY_SUCCESS:
      return {
        ...state,
        countries: [...state.countries, action.payload],
      };
    case DELETE_COUNTRY_SUCCESS:
      return {
        ...state,
        countries: state.countries.filter(
          (country) => country.id !== action.payload
        ),
      };
    case UPDATE_COUNTRY_SUCCESS:
      return {
        ...state,
        countries: state.countries.map((country) =>
          country.id === action.payload.id ? action.payload : country
        ),
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    default:
      return state;
  }
};

export default countryReducer;
