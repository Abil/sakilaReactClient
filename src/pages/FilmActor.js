import { useState, useEffect, useRef } from "react";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import toast from "react-hot-toast";

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

const FilmActor = () => {
  //MUI Selectbox
  const [selectedFilm, setSelectedFilm] = useState(0);
  const handleFilmChange = (event) => {
    setSelectedFilm(event.target.value);
  };
  const [selectedActor, setSelectedActor] = useState(0);
  const handleActorChange = (event) => {
    setSelectedActor(event.target.value);
  };

  const [filmActors, setFilmActors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilmList, setShowFilmList] = useState(false);

  const [films, setFilms] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetchFilms();
    //fetchFilmActors();
  }, [currentPage]); // Refetch filmActors when currentPage changes

  const filmRef = useRef(null);
  const actorRef = useRef(null);

  const fetchFilms = async () => {
    try {
      const response = await axios.get(`/film`);
      setFilms(response.data.films);
      setSelectedFilm(response.data.films[0]["film_id"]);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  const fetchFilmActors = async () => {
    try {
      //const response = await axios.get(`/film-actor/${filmRef.current.value}`);
      const response = await axios.get(`/film-actor/${selectedFilm}`);

      setFilmActors(response.data.actors);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching filmActors:", error);
    }
  };

  const handleCreateFilmActor = async () => {
    console.log(filmRef.current.value, actorRef.current.value);
    try {
      await axios.post("/film-actor", {
        film_id: filmRef.current.value,
        actor_id: actorRef.current.value,
      });
      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new filmActor
    } catch (error) {
      console.error("Error creating filmActor:", error);
      toast.error(error.response.data.error);
    }
  };

  const handleDeleteFilmActor = async (filmActorId) => {
    try {
      await axios.delete(`/film-actor/${filmRef.current.value}/${filmActorId}`);
      //fetchFilmActors(); // Refresh filmActor list
      setCurrentPage(1); // Reset to first page after deleting a  filmActor
    } catch (error) {
      console.error("Error deleting filmActor:", error);
    }
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleFetchFilms = async () => {
    try {
      const response = await axios.get("/film");
      setFilms(response.data.films);
      setSelectedFilm(response.data.films[0]["film_id"]);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  const handleFetchActors = async () => {
    try {
      const response = await axios.get("/actor");
      setActors(response.data.actors);
      setSelectedActor(response.data.actors[0]["actor_id"]);
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  };

  const handleFilmSearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/film/search?query=${inputValue.target.value}`
      );
      console.log("films:", response.data);
      setFilms(response.data);
      setSelectedFilm(response.data[0]["film_id"]);
    } catch (error) {
      console.error("Error searching films:", error);
      return [];
    }
  };

  const handleActorSearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/actor/search?query=${inputValue.target.value}`
      );
      console.log("actors:", response.data);
      setActors(response.data);
      setSelectedActor(response.data[0]["actor_id"]);
    } catch (error) {
      console.error("Error searching actors:", error);
      return [];
    }
  };

  const handleShowCreateForm = () => {
    handleFetchFilms(); // Fetch films when creating a new filmActor
    handleFetchActors(); // Fetch stores when creating a new filmActor
    setShowCreateForm(true);
  };

  const handleFetchFilmActors = () => {
    setShowFilmList(true);
    fetchFilmActors();
  };

  return (
    <div>
      {!showCreateForm ? (
        <>
          <Container
            maxWidth="sm"
            style={{
              marginTop: "100px",
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Search Film
            </Typography>
            <FormControl fullWidth>
              <DebounceInput
                type="text"
                placeholder="Search..."
                minLength={2} // Minimum number of characters before debounce triggers
                debounceTimeout={300} // Debounce timeout in milliseconds
                onChange={handleFilmSearch} // Handle input change event
                element={TextField}
                label="Search Films"
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
                value={selectedFilm}
                onChange={handleFilmChange}
                //onChange={handleChange}
              >
                {films.map((film) => (
                  <MenuItem value={film.film_id}>{film.title}</MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={handleFetchFilmActors}
                style={{ marginTop: "20px" }}
              >
                Fetch Actors
              </Button>
            </FormControl>
            <Fab
              alignItems="center"
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
          </Container>
          {showFilmList && (
            <>
              <Container maxWidth="lg" style={{ marginTop: "50px" }}>
                <Typography variant="h2" align="center" gutterBottom>
                  Actors
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Actors </TableCell>

                        <TableCell align="right" colSpan={1}>
                          Option
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filmActors.map((filmActor, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {`${filmActor.first_name}, ${filmActor.last_name}`}{" "}
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="secondary"
                              fullWidth
                              onClick={() =>
                                handleDeleteFilmActor(filmActor.actor_id)
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
                              onClick={() => handleNavigateFilm(film.film_id)}
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

                  {/* <Fab
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
                  </Fab> */}
                </Stack>
              </Container>
            </>
          )}
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
              Associate Actor
            </Typography>
            <FormControl fullWidth>
              <DebounceInput
                type="text"
                placeholder="Search..."
                minLength={2} // Minimum number of characters before debounce triggers
                debounceTimeout={300} // Debounce timeout in milliseconds
                onChange={handleActorSearch} // Handle input change event
                element={TextField}
                label="Search Actor"
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
                value={selectedActor}
                onChange={handleActorChange}
                //onChange={handleChange}
              >
                {actors.map((actor) => (
                  <MenuItem
                    value={actor.actor_id}
                  >{`${actor.first_name}, ${actor.last_name}`}</MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={handleCreateFilmActor}
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

export default FilmActor;
