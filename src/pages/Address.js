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
import Select from "@mui/material/Select";

const Address = () => {
  //MUI Selectbox
  const [selectedCity, setSelectedCity] = useState(0);
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [newAddressLine2, setNewAddressLine2] = useState("");
  const [newDistrict, setNewDistrict] = useState("");
  const [newPostalcode, setNewPostalcode] = useState("");
  const [newPhone, setNewPhone] = useState("");
  //const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchAddresses();
  }, [currentPage]); // Refetch addresses when currentPage changes

  const navigate = useNavigate();
  //const newAddressRef = useRef(null);
  const cityRef = useRef(null);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`/address?page=${currentPage}`);
      setAddresses(response.data.addresses);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleCreateAddress = async () => {
    try {
      await axios.post("/address", {
        address: newAddress,
        city_id: cityRef.current.value,
        address2: newAddressLine2,
        district: newDistrict,
        postal_code: newPostalcode,
        phone: newPhone,
      });
      setNewAddress("");
      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new address
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`/address/${addressId}`);
      //fetchAddresses(); // Refresh address list
      setCurrentPage(1); // Reset to first page after deleting a  address
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // const handleUpdateAddress = async () => {
  //   try {
  //     await axios.put(`/address/${selectedAddressId}`, {
  //       address: newAddressRef.current.value,
  //     });
  //     setSelectedAddressId(null);
  //     fetchAddresses(); // Refresh address list
  //   } catch (error) {
  //     console.error("Error updating address:", error);
  //   }
  // };

  const handleNavigateAddress = (id) => {
    navigate(`./${id}`);
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleFetchCities = async () => {
    try {
      const response = await axios.get("/city");
      setCities(response.data.cities);
      setSelectedCity(response.data.cities[0]["city_id"]);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCitySearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/city/search?query=${inputValue.target.value}`
      );
      //console.log("cities:", response.data);
      setCities(response.data);
      setSelectedCity(response.data[0]["city_id"]);
    } catch (error) {
      console.error("Error searching cities:", error);
      return [];
    }
  };

  const handleShowCreateForm = () => {
    handleFetchCities(); // Fetch cities when creating a new address
    setShowCreateForm(true);
  };

  return (
    <div>
      {!showCreateForm ? (
        <>
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Addresses
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Address </TableCell>
                    <TableCell>City</TableCell>
                    <TableCell align="right" colSpan={3}>
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addresses.map((address, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${address.address}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {`${address.city.city}`}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={() =>
                            handleDeleteAddress(address.address_id)
                          }
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
                          onClick={() =>
                            handleNavigateAddress(address.address_id)
                          }
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
              Create Address
            </Typography>
            <FormControl fullWidth>
              <DebounceInput
                type="text"
                placeholder="Search..."
                minLength={2} // Minimum number of characters before debounce triggers
                debounceTimeout={300} // Debounce timeout in milliseconds
                onChange={handleCitySearch} // Handle input change event
                element={TextField}
                label="Search Cities"
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
                value={selectedCity}
                onChange={handleCityChange}
                //onChange={handleChange}
              >
                {cities.map((city) => (
                  <MenuItem value={city.city_id}>{city.city}</MenuItem>
                ))}
              </Select>

              <TextField
                fullWidth
                label="Address Line 1"
                variant="outlined"
                margin="normal"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
              <TextField
                fullWidth
                label="Address Line 2"
                variant="outlined"
                margin="normal"
                value={newAddressLine2}
                onChange={(e) => setNewAddressLine2(e.target.value)}
              />
              <TextField
                fullWidth
                label="District"
                variant="outlined"
                margin="normal"
                value={newDistrict}
                onChange={(e) => setNewDistrict(e.target.value)}
              />
              <TextField
                fullWidth
                label="Postal Code"
                variant="outlined"
                margin="normal"
                value={newPostalcode}
                onChange={(e) => setNewPostalcode(e.target.value)}
              />
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                margin="normal"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />

              <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={handleCreateAddress}
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

          {/* <h2>Create Address</h2>

          <DebounceInput
            type="text"
            placeholder="Search..."
            minLength={2} // Minimum number of characters before debounce triggers
            debounceTimeout={300} // Debounce timeout in milliseconds
            onChange={handleCitySearch} // Handle input change event
          />

          <select ref={cityRef}>
            {cities.map((city) => (
              <option key={city.city_id} value={city.city_id}>
                {city.city}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter address "
          />

          <input
            type="text"
            value={newAddressLine2}
            onChange={(e) => setNewAddressLine2(e.target.value)}
            placeholder="Enter address line 2"
          />
          <input
            type="text"
            value={newDistrict}
            onChange={(e) => setNewDistrict(e.target.value)}
            placeholder="Enter district"
          />
          <input
            type="text"
            value={newPostalcode}
            onChange={(e) => setNewPostalcode(e.target.value)}
            placeholder="Enter postal code"
          />
          <input
            type="text"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="Enter phone"
          />
          <button onClick={handleCreateAddress}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button> */}
        </>
      )}
    </div>
  );
};

export default Address;
