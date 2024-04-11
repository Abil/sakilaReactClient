import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

//MUI Components
import { Typography, Container, Button, Box, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
//import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";

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

const Country = () => {
  //MUI Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editedCountryName, setEditedCountryName] = useState("");

  const [countries, setCountries] = useState([]);
  const [newCountryName, setNewCountryName] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCountries();
  }, [currentPage]); // Refetch countries when currentPage changes

  const navigate = useNavigate();
  const newCountryNameRef = useRef(null);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`/country?page=${currentPage}`);
      setCountries(response.data.countries);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleCreateCountry = async () => {
    try {
      await axios.post("/country", { country: newCountryName });
      setNewCountryName("");
      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new country
    } catch (error) {
      console.error("Error creating country:", error);
    }
  };

  const handleDeleteCountry = async (countryId) => {
    try {
      await axios.delete(`/country/${countryId}`);
      //fetchCountries(); // Refresh country list
      setCurrentPage(1); // Reset to first page after deleting a  country
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  const handleUpdateCountry = async () => {
    try {
      // await axios.put(`/country/${selectedCountryId}`, {
      //   country: newCountryNameRef.current.value,
      // });
      await axios.put(`/country/${selectedCountryId}`, {
        country: editedCountryName,
      });
      setSelectedCountryId(null);
      fetchCountries(); // Refresh country list
    } catch (error) {
      console.error("Error updating country:", error);
    }
  };

  const handleNavigateCountry = (id) => {
    navigate(`./country/${id}`);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
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
            Edit Country
          </Typography>
          <TextField
            id="outlined-basic"
            label="New Country Name"
            variant="outlined"
            ref={newCountryNameRef}
            onChange={(e) => {
              setEditedCountryName(e.target.value);
            }}
          />

          <Button
            variant="contained"
            //color="primary"
            fullWidth
            onClick={() => {
              handleUpdateCountry();
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
              Countries
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Name </TableCell>
                    <TableCell align="right">Rentals</TableCell>
                    <TableCell align="right">Payments</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
                  {countries.map((country, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${country.country}`}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          //color="primary"
                          fullWidth
                          onClick={() => {
                            setSelectedCountryId(country.country_id);
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
                          onClick={() =>
                            handleDeleteCountry(country.country_id)
                          }
                          style={{ marginTop: "20px" }}
                        >
                          Delete
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
                onClick={() => setShowCreateForm(true)}
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

          {/* <h1>Country Page</h1>
          <h2>Countries</h2> */}

          {/* <ul>
            {countries.map((country) => (
              <li key={country.country_id}>
                {selectedCountryId === country.country_id ? (
                  <>
                    <input
                      type="text"
                      ref={newCountryNameRef}
                      placeholder={country.country}
                    />
                    <button
                      onClick={() => {
                        handleUpdateCountry();
                      }}
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <>
                    {country.country}{" "}
                    <button
                      onClick={() => handleNavigateCountry(country.country_id)}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteCountry(country.country_id)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setSelectedCountryId(country.country_id)}
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
            Create New Country
          </button> */}
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
              Create Country
            </Typography>
            <TextField
              fullWidth
              label="Country Name"
              variant="outlined"
              margin="normal"
              value={newCountryName}
              onChange={(e) => setNewCountryName(e.target.value)}
            />

            <Button
              variant="contained"
              //color="primary"
              fullWidth
              onClick={handleCreateCountry}
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
          </Container>

          {/* <h2>Create Country</h2>
          <input
            type="text"
            value={newCountryName}
            onChange={(e) => setNewCountryName(e.target.value)}
            placeholder="Enter country name"
          />
          <button onClick={handleCreateCountry}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button> */}
        </>
      )}
    </div>
  );
};

export default Country;
