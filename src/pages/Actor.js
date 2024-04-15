import { useState, useEffect /*, useRef*/ } from "react";
import { useNavigate } from "react-router-dom";

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

const Actor = () => {
  const [actors, setActors] = useState([]);
  const [newActorFirstName, setNewActorFirstName] = useState("");
  const [newActorLastName, setNewActorLastName] = useState("");

  //const [selectedActorId, setSelectedActorId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchActors();
  }, [currentPage]); // Refetch actors when currentPage changes

  const navigate = useNavigate();
  //const newActorFirstNameRef = useRef(null);

  const fetchActors = async () => {
    try {
      const response = await axios.get(`/actor?page=${currentPage}`);
      setActors(response.data.actors);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  };

  const handleCreateActor = async () => {
    try {
      await axios.post("/actor", {
        first_name: newActorFirstName,
        last_name: newActorLastName,
      });
      setNewActorFirstName("");
      setNewActorLastName("");

      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new actor
    } catch (error) {
      console.error("Error creating actor:", error);
    }
  };

  const handleDeleteActor = async (actorId) => {
    try {
      await axios.delete(`/actor/${actorId}`);
      //fetchActors(); // Refresh actor list
      setCurrentPage(1); // Reset to first page after deleting a  actor
    } catch (error) {
      console.error("Error deleting actor:", error);
    }
  };

  // const handleUpdateActor = async () => {
  //   try {
  //     await axios.put(`/actor/${selectedActorId}`, {
  //       actor: newActorFirstNameRef.current.value,
  //     });
  //     setSelectedActorId(null);
  //     fetchActors(); // Refresh actor list
  //   } catch (error) {
  //     console.error("Error updating actor:", error);
  //   }
  // };

  const handleNavigateActor = (id) => {
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
              Actors
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
                  {actors.map((actor, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${actor.first_name}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {`${actor.last_name}`}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={() => handleDeleteActor(actor.actor_id)}
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
                          onClick={() => handleNavigateActor(actor.actor_id)}
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
              Create Actor
            </Typography>
            <FormControl fullWidth>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="normal"
                value={newActorFirstName}
                onChange={(e) => setNewActorFirstName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                margin="normal"
                value={newActorLastName}
                onChange={(e) => setNewActorLastName(e.target.value)}
              />

              <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={handleCreateActor}
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

          {/* <h2>Create Actor</h2>
          <input
            type="text"
            value={newActorFirstName}
            onChange={(e) => setNewActorFirstName(e.target.value)}
            placeholder="Enter actor first name"
          />
          <input
            type="text"
            value={newActorLastName}
            onChange={(e) => setNewActorLastName(e.target.value)}
            placeholder="Enter actor second name"
          />
          <button onClick={handleCreateActor}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button> */}
        </>
      )}
    </div>
  );
};

export default Actor;
