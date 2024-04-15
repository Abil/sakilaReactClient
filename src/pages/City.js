import { useState, useEffect } from "react";
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
  Box,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";

//MUI Box Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const City = () => {
  //MUI Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editedCityName, setEditedCityName] = useState("");

  //MUI Selectbox
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
        city: editedCityName,
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

  const handlePageChange = (e, page) => {
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit City
          </Typography>
          <TextField
            id="outlined-basic"
            label="New City Name"
            variant="outlined"
            //ref={newCountryNameRef}
            onChange={(e) => {
              setEditedCityName(e.target.value);
            }}
          />

          <Button
            variant="contained"
            //color="primary"
            fullWidth
            onClick={() => {
              handleUpdateCity();
              handleClose();
            }}
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      {!showCreateForm ? (
        <>
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Cities
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>City </TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell align="right" colSpan={3}>
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cities.map((city, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${city.city}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {`${city.country.country}`}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          //color="primary"
                          fullWidth
                          onClick={() => {
                            setSelectedCityId(city.city_id);
                            handleOpen();
                          }}
                          style={{ marginTop: "20px" }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={() => handleDeleteCity(city.city_id)}
                          style={{ marginTop: "20px" }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          // color="secondary"
                          fullWidth
                          onClick={() => handleNavigateCity(city.city_id)}
                          style={{ marginTop: "20px" }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack
              spacing={2}
              style={{ marginTop: "50px", alignItems: "center" }}
            >
              <Pagination
                count={totalPages}
                color="primary"
                onChange={handlePageChange}
              />

              <Fab
                //onClick={() => setShowCreateForm(true)}
                onClick={handleShowCreateForm}
                color="primary"
                aria-label="add"
                style={{
                  marginTop: "50px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AddIcon />
              </Fab>
            </Stack>
          </Container>
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
                label="Search Countries"
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
        </>
      )}
    </div>
  );
};

export default City;
