import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";

//MUI
import {
  Typography,
  Container,
  Button,
  TextField,
  MenuItem,
  FormControl,
} from "@mui/material";

import Select from "@mui/material/Select";

const City = () => {
  const [selectedCountry, setSelectedCountry] = useState(0);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const [cities, setCities] = useState([]);
  const [newCityName, setNewCityName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCities();
  }, [currentPage]); // Refetch cities when currentPage changes

  const navigate = useNavigate();
  const newCityNameRef = useRef(null);
  const countryRef = useRef(null);

  const fetchCities = async () => {
    try {
      const response = await axios.get(`/city?page=${currentPage}`);
      setCities(response.data.cities);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCreateCity = async () => {
    try {
      // await axios.post("/city", {
      //   city: newCityName,
      //   country_id: countryRef.current.value,
      // });
      await axios.post("/city", {
        city: newCityName,
        country_id: selectedCountry,
      });
      setNewCityName("");
      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new city
    } catch (error) {
      console.error("Error creating city:", error);
    }
  };

  const handleDeleteCity = async (cityId) => {
    try {
      await axios.delete(`/city/${cityId}`);
      //fetchCities(); // Refresh city list
      setCurrentPage(1); // Reset to first page after deleting a  city
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  const handleUpdateCity = async () => {
    try {
      await axios.put(`/city/${selectedCityId}`, {
        city: newCityNameRef.current.value,
      });
      setSelectedCityId(null);
      fetchCities(); // Refresh city list
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };

  const handleNavigateCity = (id) => {
    navigate(`./${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFetchCountries = async () => {
    try {
      const response = await axios.get("/country");
      setCountries(response.data.countries);
      setSelectedCountry(response.data.countries[0]["country_id"]);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleCountrySearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/country/search?query=${inputValue.target.value}`
      );
      setCountries(response.data);
      setSelectedCountry(response.data[0]["country_id"]);
    } catch (error) {
      console.error("Error searching countries:", error);
      return [];
    }
  };

  const handleShowCreateForm = () => {
    handleFetchCountries(); // Fetch countries when creating a new city
    setShowCreateForm(true);
  };

  return (
    <div>
      {!showCreateForm ? (
        <>
          <h1>City Page</h1>
          <h2>Cities</h2>

          <ul>
            {cities.map((city) => (
              <li key={city.city_id}>
                {selectedCityId === city.city_id ? (
                  <>
                    <input
                      type="text"
                      ref={newCityNameRef}
                      placeholder={city.city}
                    />
                    <button
                      onClick={() => {
                        handleUpdateCity();
                      }}
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <>
                    {`${city.city}, ${city.country.country}`}
                    {/* {city.city} {city.country.country} */}
                    <button onClick={() => handleNavigateCity(city.city_id)}>
                      View
                    </button>
                    <button onClick={() => handleDeleteCity(city.city_id)}>
                      Delete
                    </button>
                    <button onClick={() => setSelectedCityId(city.city_id)}>
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              // Display only a subset of page numbers around the current page
              if (
                page === 1 ||
                page === currentPage ||
                page === totalPages ||
                Math.abs(currentPage - page) <= 2
              ) {
                return (
                  <button
                    key={i}
                    onClick={() => handlePageChange(page)}
                    disabled={currentPage === page}
                  >
                    {page}
                  </button>
                );
              }
              return null;
            })}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>

          {/* <button onClick={() => setShowCreateForm(true)}>
            Create New City
          </button> */}
          <button onClick={handleShowCreateForm}>Create New City</button>
        </>
      ) : (
        <>
          <Container
            maxWidth="sm"
            style={{
              marginTop: "100px",
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Create City
            </Typography>
            <FormControl fullWidth>
              <DebounceInput
                type="text"
                placeholder="Search..."
                minLength={2} // Minimum number of characters before debounce triggers
                debounceTimeout={300} // Debounce timeout in milliseconds
                onChange={handleCountrySearch} // Handle input change event
                element={TextField}
                label="Search"
                variant="outlined"
                margin="normal"
              />

              <Select
                fullWidth
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                //value={age}
                //placeholder="Select Country"
                //label="Country"
                value={selectedCountry}
                onChange={handleCountryChange}
                //onChange={handleChange}
              >
                {countries.map((country) => (
                  <MenuItem value={country.country_id}>
                    {country.country}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                fullWidth
                label="City Name"
                variant="outlined"
                margin="normal"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
              />

              <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={handleCreateCity}
                style={{ marginTop: "20px" }}
              >
                Create
              </Button>
              <Button
                variant="contained"
                //color="default"
                fullWidth
                onClick={() => setShowCreateForm(false)}
                style={{ marginTop: "10px" }}
              >
                Cancel
              </Button>
            </FormControl>
          </Container>

          {/* <h2>Create City</h2>

          <DebounceInput
            type="text"
            placeholder="Search..."
            minLength={2} // Minimum number of characters before debounce triggers
            debounceTimeout={300} // Debounce timeout in milliseconds
            onChange={handleCountrySearch} // Handle input change event
          />

          <select ref={countryRef}>
            {countries.map((country) => (
              <option key={country.country_id} value={country.country_id}>
                {country.country}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={handleCreateCity}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button> */}
        </>
      )}
    </div>
  );
};

export default City;
