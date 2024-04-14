import { useState, useEffect } from "react";
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

const Advisor = () => {
  const [advisors, setAdvisors] = useState([]);
  const [newAdvisorFirstName, setNewAdvisorFirstName] = useState("");
  const [newAdvisorLastName, setNewAdvisorLastName] = useState("");
  const [isChairman, setIsChairman] = useState(false);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAdvisors();
  }, [currentPage]); // Refetch advisors when currentPage changes

  const navigate = useNavigate();

  const fetchAdvisors = async () => {
    try {
      const response = await axios.get(`/advisor?page=${currentPage}`);
      setAdvisors(response.data.advisors);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching sors:", error);
    }
  };

  const handleCreateAdvisor = async () => {
    try {
      await axios.post("/advisor", {
        first_name: newAdvisorFirstName,
        last_name: newAdvisorLastName,
        is_chairmain: isChairman,
      });
      setNewAdvisorFirstName("");
      setNewAdvisorLastName("");

      setShowCreateForm(false);
      fetchAdvisors();
      setCurrentPage(1); // Reset to first page after creating a new advisor
    } catch (error) {
      console.error("Error creating advisor:", error);
    }
  };

  const handleDeleteAdvisor = async (advisorId) => {
    try {
      await axios.delete(`/advisor/${advisorId}`);
      //fetchAdvisors(); // Refresh advisor list
      setCurrentPage(1); // Reset to first page after deleting a  advisor
    } catch (error) {
      console.error("Error deleting advisor:", error);
    }
  };

  const handleNavigateAdvisor = (id) => {
    navigate(`./${id}`);
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {!showCreateForm ? (
        <>
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Advisors
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
                  {advisors.map((advisor, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${advisor.first_name}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {`${advisor.last_name}`}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={() =>
                            handleDeleteAdvisor(advisor.advisor_id)
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
                            handleNavigateAdvisor(advisor.advisor_id)
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
          <h2>Create Advisor</h2>
          <input
            type="text"
            value={newAdvisorFirstName}
            onChange={(e) => setNewAdvisorFirstName(e.target.value)}
            placeholder="Enter advisor first name"
          />
          <input
            type="text"
            value={newAdvisorLastName}
            onChange={(e) => setNewAdvisorLastName(e.target.value)}
            placeholder="Enter advisor second name"
          />

          <input
            type="checkbox"
            //value={newAdvisorLastName}
            onChange={(e) => setIsChairman(e.target.checked)}
            placeholder="Enter advisor chairman status"
          />
          <button onClick={handleCreateAdvisor}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default Advisor;
