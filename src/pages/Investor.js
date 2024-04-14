import { useState, useEffect /*, useRef*/ } from "react";
import { useNavigate } from "react-router-dom";

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

const Investor = () => {
  const [investors, setInvestors] = useState([]);
  const [newInvestorFirstName, setNewInvestorFirstName] = useState("");
  const [newInvestorLastName, setNewInvestorLastName] = useState("");
  const [newCompanyName, setCompanyName] = useState("");

  //const [selectedInvestorId, setSelectedInvestorId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchInvestors();
  }, [currentPage]); // Refetch investors when currentPage changes

  const navigate = useNavigate();
  //const newInvestorFirstNameRef = useRef(null);

  const fetchInvestors = async () => {
    try {
      const response = await axios.get(`/investor?page=${currentPage}`);
      setInvestors(response.data.investors);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching investors:", error);
    }
  };

  const handleCreateInvestor = async () => {
    try {
      await axios.post("/investor", {
        first_name: newInvestorFirstName,
        last_name: newInvestorLastName,
        company_name: newCompanyName,
      });
      setNewInvestorFirstName("");
      setNewInvestorLastName("");
      setCompanyName("");

      setShowCreateForm(false);
      fetchInvestors();
      setCurrentPage(1); // Reset to first page after creating a new investor
    } catch (error) {
      console.error("Error creating investor:", error);
    }
  };

  const handleDeleteInvestor = async (investorId) => {
    try {
      await axios.delete(`/investor/${investorId}`);
      //fetchInvestors(); // Refresh investor list
      setCurrentPage(1); // Reset to first page after deleting a  investor
    } catch (error) {
      console.error("Error deleting investor:", error);
    }
  };

  // const handleUpdateInvestor = async () => {
  //   try {
  //     await axios.put(`/investor/${selectedInvestorId}`, {
  //       investor: newInvestorFirstNameRef.current.value,
  //     });
  //     setSelectedInvestorId(null);
  //     fetchInvestors(); // Refresh investor list
  //   } catch (error) {
  //     console.error("Error updating investor:", error);
  //   }
  // };

  const handleNavigateInvestor = (id) => {
    navigate(`./${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {!showCreateForm ? (
        <>
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Investors
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name </TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell align="right" colSpan={3}>
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {investors.map((investor, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${investor.first_name}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {`${investor.last_name}`}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={() =>
                            handleDeleteInvestor(investor.investor_id)
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
                            handleNavigateInvestor(investor.investor_id)
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
        </>
      ) : (
        <>
          <h2>Create Investor</h2>
          <input
            type="text"
            value={newInvestorFirstName}
            onChange={(e) => setNewInvestorFirstName(e.target.value)}
            placeholder="Enter investor first name"
          />
          <input
            type="text"
            value={newInvestorLastName}
            onChange={(e) => setNewInvestorLastName(e.target.value)}
            placeholder="Enter investor second name"
          />

          <input
            type="text"
            value={newCompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter investor company name"
          />
          <button onClick={handleCreateInvestor}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default Investor;
