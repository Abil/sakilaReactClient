import axios from "axios";
import {
  fetchCountriesSuccess,
  createCountrySuccess,
  deleteCountrySuccess,
  updateCountrySuccess,
  setCurrentPage,
  setTotalPages,
} from "../actions/countryActions.js";

export const fetchCountries = (currentPage) => async (dispatch) => {
  try {
    const response = await axios.get(`/country?page=${currentPage}`);
    dispatch(fetchCountriesSuccess(response.data.countries));
    dispatch(setCurrentPage(response.data.currentPage));
    dispatch(setTotalPages(response.data.totalPages));
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

export const createCountry =
  (newCountryName, setCurrentPage) => async (dispatch) => {
    try {
      await axios.post("/country", { country: newCountryName });
      dispatch(createCountrySuccess(newCountryName));
      setCurrentPage(1);
    } catch (error) {
      console.error("Error creating country:", error);
    }
  };

export const deleteCountry =
  (countryId, setCurrentPage) => async (dispatch) => {
    try {
      await axios.delete(`/country/${countryId}`);
      dispatch(deleteCountrySuccess(countryId));
      setCurrentPage(1);
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

export const updateCountry =
  (countryId, newCountryName, fetchCountries) => async (dispatch) => {
    try {
      await axios.put(`/country/${countryId}`, { country: newCountryName });
      dispatch(
        updateCountrySuccess({ id: countryId, country: newCountryName })
      );
      fetchCountries();
    } catch (error) {
      console.error("Error updating country:", error);
    }
  };
