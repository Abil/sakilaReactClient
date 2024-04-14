import { useState, useEffect, useRef } from "react";
//import { useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const Rental = () => {
  const [rentals, setRentals] = useState([]);
  const [selectedRentalId, setSelectedRentalId] = useState(null);

  const [rentalDate, setRentalDate] = useState("");
  //const [newRentalDate, setNewRentalDate] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [inventory, setInventory] = useState([]);
  const [staff, setStaff] = useState([]);
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchRentals();
  }, [currentPage]); // Refetch rentals when currentPage changes

  //const navigate = useNavigate();
  const inventoryRef = useRef(null);
  const staffRef = useRef(null);
  const customerRef = useRef(null);
  //const returnRef = useRef(null);

  const fetchRentals = async () => {
    try {
      const response = await axios.get(`/rental?page=${currentPage}`);
      setRentals(response.data.rentals);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  const handleCreateRental = async () => {
    try {
      await axios.post("/rental", {
        inventory_id: inventoryRef.current.value,
        staff_id: staffRef.current.value,
        customer_id: customerRef.current.value,
        //return_date: newRentalDate,
        rental_date: new Date(),
      });
      //setNewRentalDate("");
      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new inventory
    } catch (error) {
      console.error("Error creating rental:", error);
    }
  };

  const handleDeleteRental = async (inventoryId) => {
    try {
      await axios.delete(`/rental/${inventoryId}`);
      //fetchRentals(); // Refresh inventory list
      setCurrentPage(1); // Reset to first page after deleting a  inventory
    } catch (error) {
      console.error("Error deleting rental:", error);
    }
  };

  const handleUpdateRental = async () => {
    try {
      await axios.put(`/rental/${selectedRentalId}`, {
        return_date: rentalDate,
      });
      setSelectedRentalId(null);
      fetchRentals(); // Refresh inventory list
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  // const handleNavigateRental = (id) => {
  //   navigate(`./${id}`);
  // };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleFetchInventory = async () => {
    try {
      const response = await axios.get("/inventory/instock");
      setInventory(response.data.inventories);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleFetchStaffs = async () => {
    try {
      const response = await axios.get("/staff");
      setStaff(response.data.staff);
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  };

  const handleFetchCustomer = async () => {
    try {
      const response = await axios.get("/customer");
      setCustomer(response.data.customers);
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  };

  const handleInventorySearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/inventory/instock?query=${inputValue.target.value}`
      );
      console.log("inventory:", response.data);
      setInventory(response.data);
    } catch (error) {
      console.error("Error searching inventory:", error);
      return [];
    }
  };

  const handleStaffSearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/store/search?query=${inputValue.target.value}`
      );
      console.log("staff:", response.data);
      setStaff(response.data);
    } catch (error) {
      console.error("Error searching inventory:", error);
      return [];
    }
  };

  const handleCustomerSearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/customer/search?query=${inputValue.target.value}`
      );
      console.log("customer:", response.data);
      setCustomer(response.data);
    } catch (error) {
      console.error("Error searching inventory:", error);
      return [];
    }
  };

  const handleShowCreateForm = () => {
    handleFetchInventory(); // Fetch inventory when creating a new inventory
    handleFetchStaffs(); // Fetch staff when creating a new inventory
    handleFetchCustomer();
    setShowCreateForm(true);
  };

  return (
    <div>
      {!showCreateForm ? (
        <>
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Rentals
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Film </TableCell>
                    <TableCell>Customer </TableCell>
                    <TableCell align="right" colSpan={2}>
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rentals.map((rental, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${rental.inventory.film.title}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {`${rental.customer.email}`}
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          variant="contained"
                          //color="primary"
                          fullWidth
                          onClick={() => {
                            setSelectedRentalId(rental.rental_id);
                            //handleOpen();
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
                          onClick={() => handleDeleteRental(rental.rental_id)}
                          style={{ marginTop: "20px" }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      {/* <TableCell align="right">
                        <Button
                          variant="contained"
                          //color="primary"
                          fullWidth
                          onClick={() => {
                            handleNavigateLanguage(language.language_id);
                          }}
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
                onClick={() => setShowCreateForm(true)}
                //onClick={handleShowCreateForm}
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

          <h1>Rental Page</h1>
          <h2>Rentals</h2>

          <ul>
            {rentals.map((rental) => (
              <li key={rental.rental_id}>
                {selectedRentalId === rental.rental_id ? (
                  <>
                    <DatePicker
                      selected={rentalDate}
                      onChange={setRentalDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select a date"
                    />
                    <button
                      onClick={() => {
                        handleUpdateRental();
                      }}
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <>
                    {`${rental.inventory.film.title}, ${rental.customer.email}`}
                    {/* <button
                    onClick={() => handleNavigateRental(rental.rental_id)}
                  >
                    View
                  </button> */}
                    <button
                      onClick={() => handleDeleteRental(rental.rental_id)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRentalId(rental.rental_id);
                        setRentalDate(rental.return_date);
                      }}
                    >
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
            Create New Rental
          </button> */}
          <button onClick={handleShowCreateForm}>Create New Rental</button>
        </>
      ) : (
        <>
          <h2>Create Rental</h2>

          <DebounceInput
            type="text"
            placeholder="Search..."
            minLength={2} // Minimum number of characters before debounce triggers
            debounceTimeout={300} // Debounce timeout in milliseconds
            onChange={handleInventorySearch} // Handle input change event
          />

          <select ref={inventoryRef}>
            {inventory.map((inventory) => (
              <option
                key={inventory.inventory_id}
                value={inventory.inventory_id}
              >
                {inventory.film.title}
              </option>
            ))}
          </select>

          <DebounceInput
            type="text"
            placeholder="Search..."
            minLength={2} // Minimum number of characters before debounce triggers
            debounceTimeout={300} // Debounce timeout in milliseconds
            onChange={handleStaffSearch} // Handle input change event
          />

          <select ref={staffRef}>
            {staff.map((staff) => (
              <option key={staff.staff_id} value={staff.staff_id}>
                {staff.first_name}
              </option>
            ))}
          </select>

          <DebounceInput
            type="text"
            placeholder="Search..."
            minLength={2} // Minimum number of characters before debounce triggers
            debounceTimeout={300} // Debounce timeout in milliseconds
            onChange={handleCustomerSearch} // Handle input change event
          />

          <select ref={customerRef}>
            {customer.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {`${customer.email}, ${customer.address.address}`}
              </option>
            ))}
          </select>

          {/* <DatePicker
            //selected={newRentalDate}
            //onChange={setNewRentalDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
          /> */}
          <button onClick={handleCreateRental}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default Rental;
