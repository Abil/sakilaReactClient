import { useState, useEffect, useRef } from "react";
//import { useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from "react-date-picker";
//import "react-date-picker/dist/DatePicker.css";

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

const Payment = () => {
  //MUI Selectbox
  const [selectedRental, setSelectedRental] = useState(0);
  const handleRentalChange = (event) => {
    setSelectedRental(event.target.value);
  };
  const [selectedStaff, setSelectedStaff] = useState(0);
  const handleStaffChange = (event) => {
    setSelectedStaff(event.target.value);
  };
  const [selectedCustomer, setSelectedCustomer] = useState(0);
  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };
  const [payments, setPayments] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectedPaymentRentalId, setSelectedpaymentRentalId] = useState(null);
  const [paymentDate, setPaymentDate] = useState("");
  const [newPaymentDate, setNewPaymentDate] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [rental, setRental] = useState([]);
  const [staff, setStaff] = useState([]);
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, [currentPage]); // Refetch payments when currentPage changes

  //const navigate = useNavigate();
  //const newPaymentDateRef = useRef(null);
  const rentalRef = useRef(null);
  const staffRef = useRef(null);
  const customerRef = useRef(null);
  const amountRef = useRef("");

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`/payment?page=${currentPage}`);
      setPayments(response.data.payments);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  const handleCreatePayment = async () => {
    try {
      await axios.post("/payment", {
        //rental: newPaymentDate,
        rental_id: rentalRef.current.value,
        staff_id: staffRef.current.value,
        customer_id: customerRef.current.value,
        amount: newAmount,
        payment_date: newPaymentDate,
      });

      await axios.put(`/rental/${rentalRef.current.value}`, {
        //rental: newPaymentDate,
        rental_date: newPaymentDate,
      });
      //setNewPaymentDate("");
      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new rental
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  const handleDeletePayment = async (rentalId) => {
    try {
      await axios.delete(`/payment/${rentalId}`);
      //fetchPayments(); // Refresh rental list
      setCurrentPage(1); // Reset to first page after deleting a  rental
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const handleUpdatePayment = async () => {
    try {
      await axios.put(`/payment/${selectedPaymentId}`, {
        payment_date: paymentDate,
        amount: amountRef.current.value,
      });

      await axios.put(`/rental/${selectedPaymentRentalId}`, {
        //rental: newPaymentDate,
        rental_date: paymentDate,
      });

      setSelectedPaymentId(null);
      fetchPayments(); // Refresh rental list
    } catch (error) {
      console.error("Error updating rental:", error);
    }
  };

  // const handleNavigatePayment = (id) => {
  //   navigate(`./${id}`);
  // };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleFetchRental = async () => {
    try {
      const response = await axios.get("/rental/unreturned");
      console.log("Rentals: ", response.data);
      setRental(response.data);
      setSelectedRental(response.data[0]["rental_id"]);
    } catch (error) {
      console.error("Error fetching rental:", error);
    }
  };

  const handleFetchStaffs = async () => {
    try {
      const response = await axios.get("/staff");
      setStaff(response.data.staff);
      setSelectedStaff(response.data.staff[0]["staff_id"]);
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  };

  const handleFetchCustomer = async () => {
    try {
      const response = await axios.get("/customer");
      setCustomer(response.data.customers);
      setSelectedCustomer(response.data.customers[0]["customer_id"]);
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  };

  // const handleRentalSearch = async (inputValue) => {
  //   try {
  //     // const response = await axios.get(
  //     //   `/rental/unreturned?query=${inputValue.target.value}`
  //     // );
  //     const response = await axios.get(`/rental/unreturned`);
  //     console.log("rental:", response.data);
  //     setRental(response.data);
  //   } catch (error) {
  //     console.error("Error searching rental:", error);
  //     return [];
  //   }
  // };

  const handleStaffSearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/store/search?query=${inputValue.target.value}`
      );
      console.log("staff:", response.data);
      setStaff(response.data);
      setSelectedStaff(response.data[0]["staff_id"]);
    } catch (error) {
      console.error("Error searching rental:", error);
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
      setSelectedCustomer(response.data[0]["customer_id"]);
    } catch (error) {
      console.error("Error searching rental:", error);
      return [];
    }
  };

  const handleShowCreateForm = () => {
    console.log("handle shoe create form");
    handleFetchRental(); // Fetch rental when creating a new rental
    handleFetchStaffs(); // Fetch staff when creating a new rental
    handleFetchCustomer();
    setShowCreateForm(true);
  };

  return (
    <div>
      {!showCreateForm ? (
        <>
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Payments
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Customer </TableCell>
                    <TableCell>Film </TableCell>
                    <TableCell align="right" colSpan={2}>
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payments.map((payment, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {`${payment.customer.email}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {`${payment.rental.inventory.film.title}`}
                      </TableCell>

                      {/* <TableCell align="right">
                        <Button
                          variant="contained"
                          //color="primary"
                          fullWidth
                          onClick={() => {
                            setSelectedPaymentId(payment.payment_id);
                            //handleOpen();
                          }}
                          style={{ marginTop: "20px" }}
                        >
                          Edit
                        </Button>
                      </TableCell> */}
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={() =>
                            handleDeletePayment(payment.payment_id)
                          }
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

          {/* <h1>Payment Page</h1>
          <h2>Payments</h2>

          <ul>
            {payments.map((payment) => (
              <li key={payment.payment_id}>
                {selectedPaymentId === payment.payment_id ? (
                  <>
                    <input
                      type="text"
                      ref={amountRef}
                      placeholder={payment.amount}
                    />
                    <DatePicker
                      style={{ width: "100%" }}
                      selected={paymentDate}
                      onChange={setPaymentDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select a date"
                    />
                    <button
                      onClick={() => {
                        handleUpdatePayment();
                      }}
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <>
                    {`${payment.customer.email}, ${payment.rental.inventory.film.title}`}
                    {/* <button
                    onClick={() => handleNavigatePayment(payment.payment_id)}
                  >
                    View
                  </button> 
                    <button
                      onClick={() => handleDeletePayment(payment.payment_id)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPaymentId(payment.payment_id);
                        setSelectedpaymentRentalId(payment.rental_id);
                        setPaymentDate(payment.payment_date);
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul> */}

          {/* Pagination */}
          {/* <div>
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
          </div> */}

          {/* <button onClick={() => setShowCreateForm(true)}>
            Create New Payment
          </button> */}
          {/* <button onClick={handleShowCreateForm}>Create New Payment</button> */}
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
              Create Payment
            </Typography>
            <FormControl fullWidth>
              <Select
                fullWidth
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                //value={age}
                //placeholder="Select Country"
                //label="Country"
                value={selectedRental}
                onChange={handleRentalChange}
                //onChange={handleChange}
              >
                {rental.map((rental) => (
                  <MenuItem value={rental.rental_id}>
                    {`Inventory: ${rental.inventory.film.title}, Renter: ${rental.customer.email}`}
                  </MenuItem>
                ))}
              </Select>
              <DebounceInput
                type="text"
                placeholder="Search..."
                minLength={2} // Minimum number of characters before debounce triggers
                debounceTimeout={300} // Debounce timeout in milliseconds
                onChange={handleStaffSearch} // Handle input change event
                element={TextField}
                label="Search Staff"
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
                value={selectedStaff}
                onChange={handleStaffChange}
                //onChange={handleChange}
              >
                {staff.map((staff) => (
                  <MenuItem
                    value={staff.staff_id}
                  >{`${staff.first_name} ${staff.last_name}`}</MenuItem>
                ))}
              </Select>
              <DebounceInput
                type="text"
                placeholder="Search..."
                minLength={2} // Minimum number of characters before debounce triggers
                debounceTimeout={300} // Debounce timeout in milliseconds
                onChange={handleCustomerSearch} // Handle input change event
                element={TextField}
                label="Search Customer"
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
                value={selectedCustomer}
                onChange={handleCustomerChange}
                //onChange={handleChange}
              >
                {customer.map((customer) => (
                  <MenuItem value={customer.customer_id}>
                    {`${customer.email}`}
                  </MenuItem>
                ))}
              </Select>
              {/* <TextField
                fullWidth
                label="Film Rating"
                variant="outlined"
                margin="normal"
                //value={newFilmRating}
                //onChange={(e) => setNewFilmRating(e.target.value)}
                component={
                  <DatePicker
                    selected={newPaymentDate}
                    onChange={setNewPaymentDate}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                  />
                }
              /> */}

              <div
                style={{
                  marginTop: "10px",

                  padding: "0px",
                }}
              >
                <DatePicker
                  selected={newPaymentDate}
                  onChange={setNewPaymentDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select creation date"
                />
              </div>

              <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={handleCreatePayment}
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

export default Payment;
