import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";

//MUI
import { Typography, Container, Button } from "@mui/material";
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

const Address = () => {
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
          <h2>Create Address</h2>

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
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default Address;
