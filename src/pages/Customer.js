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
  Checkbox,
  FormControlLabel,
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

const Customer = () => {
  //MUI Selectbox
  const [selectedAddress, setSelectedAddress] = useState(0);
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };
  const [selectedStore, setSelectedStore] = useState(0);
  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  const [customers, setCustomers] = useState([]);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newActiveStatus, setNewActiveStatus] = useState("");

  //const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, [currentPage]); // Refetch customers when currentPage changes

  const navigate = useNavigate();
  //const newCustomerNameRef = useRef(null);
  const addressRef = useRef(null);
  const storeRef = useRef(null);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`/customer?page=${currentPage}`);
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleCreateCustomer = async () => {
    try {
      await axios.post("/customer", {
        //customer: newCustomerName,
        address_id: addressRef.current.value,
        store_id: storeRef.current.value,
        first_name: newFirstName,
        last_name: newLastName,
        email: newEmail,
        active: newActiveStatus,
      });
      //setNewCustomerName("");
      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new customer
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(`/customer/${customerId}`);
      //fetchCustomers(); // Refresh customer list
      setCurrentPage(1); // Reset to first page after deleting a  customer
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // const handleUpdateCustomer = async () => {
  //   try {
  //     await axios.put(`/customer/${selectedCustomerId}`, {
  //       //customer: newCustomerNameRef.current.value,
  //       film_id: addressRef.current.value,
  //       store_id: storeRef.current.value,
  //     });
  //     setSelectedCustomerId(null);
  //     fetchCustomers(); // Refresh customer list
  //   } catch (error) {
  //     console.error("Error updating customer:", error);
  //   }
  // };

  const handleNavigateCustomer = (id) => {
    navigate(`./${id}`);
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleFetchAddresses = async () => {
    try {
      const response = await axios.get("/address");
      setAddresses(response.data.addresses);
      setSelectedAddress(response.data.addresses[0]["address_id"]);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleFetchStores = async () => {
    try {
      const response = await axios.get("/store");
      setStores(response.data.stores);
      setSelectedStore(response.data.stores[0]["store_id"]);
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  };

  const handleAddressSearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/address/search?query=${inputValue.target.value}`
      );
      console.log("addresses:", response.data);
      setAddresses(response.data);
      setSelectedAddress(response.data[0]["address_id"]);
    } catch (error) {
      console.error("Error searching addresses:", error);
      return [];
    }
  };

  const handleStoreSearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/store/search?query=${inputValue.target.value}`
      );
      console.log("stores:", response.data);
      setStores(response.data);
      setSelectedStore(response.data[0]["store_id"]);
    } catch (error) {
      console.error("Error searching addresses:", error);
      return [];
    }
  };

  const handleShowCreateForm = () => {
    handleFetchAddresses(); // Fetch addresses when creating a new customer
    handleFetchStores(); // Fetch stores when creating a new customer

    setShowCreateForm(true);
  };

  return (
    <div>
      {!showCreateForm ? (
        <>
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Customers
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right" colSpan={3}>
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${customer.first_name}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {`${customer.last_name}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {customer.active ? `Active` : `Inactive`}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={() =>
                            handleDeleteCustomer(customer.customer_id)
                          }
                          style={{ marginTop: "20px" }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      {/* <TableCell align="right">
                        <Button
                          variant="contained"
                          // color="secondary"
                          fullWidth
                          onClick={() =>
                            handleNavigateCustomer(customer.customer_id)
                          }
                          style={{ marginTop: "20px" }}
                        >
                          View
                        </Button>
                      </TableCell> */}
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
              Create Customer
            </Typography>
            <FormControl fullWidth>
              <DebounceInput
                type="text"
                placeholder="Search..."
                minLength={2} // Minimum number of characters before debounce triggers
                debounceTimeout={300} // Debounce timeout in milliseconds
                onChange={handleStoreSearch} // Handle input change event
                element={TextField}
                label="Search Store"
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
                value={selectedStore}
                onChange={handleStoreChange}
                //onChange={handleChange}
              >
                {stores.map((store) => (
                  <MenuItem value={store.store_id}>
                    {store.address.address}
                  </MenuItem>
                ))}
              </Select>

              <DebounceInput
                type="text"
                placeholder="Search..."
                minLength={2} // Minimum number of characters before debounce triggers
                debounceTimeout={300} // Debounce timeout in milliseconds
                onChange={handleAddressSearch} // Handle input change event
                element={TextField}
                label="Search Address"
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
                value={selectedAddress}
                onChange={handleAddressChange}
                //onChange={handleChange}
              >
                {addresses.map((address) => (
                  <MenuItem value={address.address_id}>
                    {address.address}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="normal"
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
              />
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="normal"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    //value={newCompanyName}
                    onChange={(e) => setNewActiveStatus(e.target.checked)}
                  />
                }
                label="Active"
              />

              <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={handleCreateCustomer}
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

          {/* <h2>Create Customer</h2>

          <DebounceInput
            type="text"
            placeholder="Search Address..."
            minLength={2} // Minimum number of characters before debounce triggers
            debounceTimeout={300} // Debounce timeout in milliseconds
            onChange={handleAddressSearch} // Handle input change event
          />

          <select ref={addressRef}>
            {addresses.map((address) => (
              <option key={address.address_id} value={address.address_id}>
                {address.address}
              </option>
            ))}
          </select>

          <DebounceInput
            type="text"
            placeholder="Search Store..."
            minLength={2} // Minimum number of characters before debounce triggers
            debounceTimeout={300} // Debounce timeout in milliseconds
            onChange={handleStoreSearch} // Handle input change event
          />

          <select ref={storeRef}>
            {stores.map((store) => (
              <option key={store.store_id} value={store.store_id}>
                {store.address.address}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            placeholder="Enter customer name"
          />
          <input
            type="text"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            placeholder="Enter customer name"
          />
          <input
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter customer email"
          />
          <input
            type="checkbox"
            value={newActiveStatus}
            onChange={(e) => setNewActiveStatus(e.target.checked)}
            placeholder="Enter customer status"
          />
          <button onClick={handleCreateCustomer}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button> */}
        </>
      )}
    </div>
  );
};

export default Customer;
