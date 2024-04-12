import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";

//MUI Components
import {
  Typography,
  Container,
  Button,
  TextField,
  MenuItem,
  FormControl,
} from "@mui/material";
import Select from "@mui/material/Select";

const CityView = () => {
  const [selectedCountry, setSelectedCountry] = useState(0);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const [city, setCity] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [reload, setReload] = useState(false);
  const [countries, setCountries] = useState([]);

  const { cityId } = useParams();
  const countryRef = useRef(null);

  useEffect(() => {
    fetchCity();
  }, [reload]);

  const fetchCity = async () => {
    try {
      const response = await axios.get(`/city/${cityId}`);
      setCity(response.data);
      setNewName(response.data.city);
    } catch (error) {
      console.error("Error fetching city:", error);
    }
  };

  const handleCityUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log("country id : ", countryRef.current.value);
      await axios.put(`/city/${cityId}`, {
        city: newName,
        country_id: countryRef.current.value,
      });
      setEditMode(false);
      setReload(!reload);
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        `/country/search?query=${city.country.country}`
      );
      setCountries(response.data);
      setSelectedCountry(response.data[0]["country_id"]);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleCountrySearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/country/search?query=${inputValue.target.value}`
      );
      console.log("countries:", response.data);
      setCountries(response.data);
      setSelectedCountry(response.data[0]["country_id"]);
    } catch (error) {
      console.error("Error searching countries:", error);
      return [];
    }
  };

  const handleEditButtonClick = () => {
    setEditMode(true);
    fetchCountries();
  };

  return (
    <div>
      {city ? (
        <div>
          {editMode ? (
            <form /*onSubmit={handleCityUpdate}*/>
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
                  Edit City
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
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />

                  <Button
                    variant="contained"
                    //color="primary"
                    fullWidth
                    onClick={handleCityUpdate}
                    style={{ marginTop: "20px" }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    //color="default"
                    fullWidth
                    onClick={() => setEditMode(false)}
                    style={{ marginTop: "10px" }}
                  >
                    Cancel
                  </Button>
                </FormControl>
              </Container>
              {/* <DebounceInput
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
                placeholder={city.city}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditMode(false)}>
                Cancel
              </button> */}
            </form>
          ) : (
            <Container
              maxWidth="sm"
              style={{
                marginTop: "100px",
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6" align="center" gutterBottom>
                {`City: ${city.city} `}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {`Country: ${city.country.country}`}
              </Typography>
              <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={handleEditButtonClick}
                style={{ marginTop: "20px" }}
              >
                Edit
              </Button>
            </Container>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CityView;
