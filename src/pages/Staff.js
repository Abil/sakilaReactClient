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

const Staff = () => {
  const [staffs, setStaffs] = useState([]);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");

  //const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStaffs();
  }, [currentPage]); // Refetch staffs when currentPage changes

  const navigate = useNavigate();
  //const newStaffNameRef = useRef(null);
  const addressRef = useRef(null);
  const storeRef = useRef(null);

  const fetchStaffs = async () => {
    try {
      const response = await axios.get(`/staff?page=${currentPage}`);
      setStaffs(response.data.staff);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching staffs:", error);
    }
  };

  const handleCreateStaff = async () => {
    try {
      await axios.post("/staff", {
        //staff: newStaffName,
        address_id: addressRef.current.value,
        store_id: storeRef.current.value,
        first_name: newFirstName,
        last_name: newLastName,
        email: newEmail,
        username: newUserName,
      });
      //setNewStaffName("");
      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new staff
    } catch (error) {
      console.error("Error creating staff:", error);
    }
  };

  const handleDeleteStaff = async (staffId) => {
    try {
      await axios.delete(`/staff/${staffId}`);
      //fetchStaffs(); // Refresh staff list
      setCurrentPage(1); // Reset to first page after deleting a  staff
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  // const handleUpdateStaff = async () => {
  //   try {
  //     await axios.put(`/staff/${selectedStaffId}`, {
  //       //staff: newStaffNameRef.current.value,
  //       film_id: addressRef.current.value,
  //       store_id: storeRef.current.value,
  //     });
  //     setSelectedStaffId(null);
  //     fetchStaffs(); // Refresh staff list
  //   } catch (error) {
  //     console.error("Error updating staff:", error);
  //   }
  // };

  const handleNavigateStaff = (id) => {
    navigate(`./${id}`);
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleFetchAddresses = async () => {
    try {
      const response = await axios.get("/address");
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleFetchStores = async () => {
    try {
      const response = await axios.get("/store");
      setStores(response.data.stores);
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
    } catch (error) {
      console.error("Error searching addresses:", error);
      return [];
    }
  };

  const handleShowCreateForm = () => {
    handleFetchAddresses(); // Fetch addresses when creating a new staff
    handleFetchStores(); // Fetch stores when creating a new staff

    setShowCreateForm(true);
  };

  return (
    <div>
      {!showCreateForm ? (
        <>
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Staff
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Username</TableCell>

                    <TableCell align="right" colSpan={3}>
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffs.map((staff, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${staff.first_name}, ${staff.last_name}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {`${staff.email}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {`${staff.username}`}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={() => handleDeleteStaff(staff.staff_id)}
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
                          onClick={() => handleNavigateStaff(staff.staff_id)}
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
          <h2>Create Staff</h2>

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
            placeholder="Enter staff name"
          />
          <input
            type="text"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            placeholder="Enter staff name"
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter staff email"
          />
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter staff username"
          />
          <button onClick={handleCreateStaff}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default Staff;
