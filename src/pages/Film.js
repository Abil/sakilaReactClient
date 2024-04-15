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

const Film = () => {
  //MUI Selectbox
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const [films, setFilms] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newReleaseYear, setNewReleaseYear] = useState("");
  const [newRentalDuration, setNewRentalDuration] = useState("");
  const [newRentalRate, setNewRentalRate] = useState("");
  const [newFilmLength, setNewFilmLength] = useState("");
  const [newReplacementCost, setNewReplacementCost] = useState("");
  const [newFilmRating, setNewFilmRating] = useState("");
  const [newSpecialFeatures, setNewSpecialFeatures] = useState("");
  //const [selectedFilmId, setSelectedFilmId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetchFilmes();
  }, [currentPage]); // Refetch films when currentPage changes

  const navigate = useNavigate();
  //const newTitleRef = useRef(null);
  const languageRef = useRef(null);

  const fetchFilmes = async () => {
    try {
      const response = await axios.get(`/film?page=${currentPage}`);
      setFilms(response.data.films);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  const handleCreateFilm = async () => {
    try {
      await axios.post("/film", {
        title: newTitle,
        language_id: languageRef.current.value,
        description: newDescription,
        release_year: newReleaseYear,
        rental_duration: newRentalDuration,
        retal_rate: newRentalRate,
        length: newFilmLength,
        replacement_cost: newReplacementCost,
        rating: newFilmRating,
        special_features: newSpecialFeatures,
      });
      setNewTitle("");
      setNewDescription("");
      setNewReleaseYear("");
      setNewRentalDuration("");
      setNewRentalRate("");
      setNewFilmLength("");
      setNewReplacementCost("");
      setNewFilmRating("");
      setNewSpecialFeatures("");

      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new film
    } catch (error) {
      console.error("Error creating film:", error);
    }
  };

  const handleDeleteFilm = async (filmId) => {
    try {
      await axios.delete(`/film/${filmId}`);
      //fetchFilmes(); // Refresh film list
      setCurrentPage(1); // Reset to first page after deleting a  film
    } catch (error) {
      console.error("Error deleting film:", error);
    }
  };

  // const handleUpdateFilm = async () => {
  //   try {
  //     await axios.put(`/film/${selectedFilmId}`, {
  //       film: newTitleRef.current.value,
  //     });
  //     setSelectedFilmId(null);
  //     fetchFilmes(); // Refresh film list
  //   } catch (error) {
  //     console.error("Error updating film:", error);
  //   }
  // };

  const handleNavigateFilm = (id) => {
    navigate(`./${id}`);
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleFetchLanguages = async () => {
    try {
      const response = await axios.get("/language");
      setLanguages(response.data.languages);
      setSelectedLanguage(response.data.languages[0]["language_id"]);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const handleLanguageSearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/language/search?query=${inputValue.target.value}`
      );
      //console.log("languages:", response.data);
      setLanguages(response.data);
      setSelectedLanguage(response.data[0]["language_id"]);
    } catch (error) {
      console.error("Error searching languages:", error);
      return [];
    }
  };

  const handleShowCreateForm = () => {
    handleFetchLanguages(); // Fetch languages when creating a new film
    setShowCreateForm(true);
  };

  return (
    <div>
      {!showCreateForm ? (
        <>
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Films
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title </TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell align="right" colSpan={3}>
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {films.map((film, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${film.title}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {`${film.release_year}`}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={() => handleDeleteFilm(film.film_id)}
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
                          onClick={() => handleNavigateFilm(film.film_id)}
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
              Create Film
            </Typography>
            <FormControl fullWidth>
              <DebounceInput
                type="text"
                placeholder="Search..."
                minLength={2} // Minimum number of characters before debounce triggers
                debounceTimeout={300} // Debounce timeout in milliseconds
                onChange={handleLanguageSearch} // Handle input change event
                element={TextField}
                label="Search Languages"
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
                value={selectedLanguage}
                onChange={handleLanguageChange}
                //onChange={handleChange}
              >
                {languages.map((language) => (
                  <MenuItem value={language.language_id}>
                    {language.name}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                margin="normal"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                margin="normal"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <TextField
                fullWidth
                label="Year"
                variant="outlined"
                margin="normal"
                value={newReleaseYear}
                onChange={(e) => setNewReleaseYear(e.target.value)}
              />
              <TextField
                fullWidth
                label="Rental Duration"
                variant="outlined"
                margin="normal"
                value={newRentalDuration}
                onChange={(e) => setNewRentalDuration(e.target.value)}
              />
              <TextField
                fullWidth
                label="Rental Rate"
                variant="outlined"
                margin="normal"
                value={newRentalRate}
                onChange={(e) => setNewRentalRate(e.target.value)}
              />
              <TextField
                fullWidth
                label="Film Length"
                variant="outlined"
                margin="normal"
                value={newFilmLength}
                onChange={(e) => setNewFilmLength(e.target.value)}
              />
              <TextField
                fullWidth
                label="Replacement Cost"
                variant="outlined"
                margin="normal"
                value={newReplacementCost}
                onChange={(e) => setNewReplacementCost(e.target.value)}
              />
              <TextField
                fullWidth
                label="Film Rating"
                variant="outlined"
                margin="normal"
                value={newFilmRating}
                onChange={(e) => setNewFilmRating(e.target.value)}
              />
              <TextField
                fullWidth
                label="Special Features"
                variant="outlined"
                margin="normal"
                value={newSpecialFeatures}
                onChange={(e) => setNewSpecialFeatures(e.target.value)}
              />

              <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={handleCreateFilm}
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

          {/* <h2>Create Film</h2>

          <DebounceInput
            type="text"
            placeholder="Search..."
            minLength={2} // Minimum number of characters before debounce triggers
            debounceTimeout={300} // Debounce timeout in milliseconds
            onChange={handleLanguageSearch} // Handle input change event
          />

          <select ref={languageRef}>
            {languages.map((language) => (
              <option key={language.language_id} value={language.language_id}>
                {language.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter film title"
          />

          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Enter film description"
          />

          <input
            type="text"
            value={newReleaseYear}
            onChange={(e) => setNewReleaseYear(e.target.value)}
            placeholder="Enter film release year"
          />
          <input
            type="text"
            value={newRentalDuration}
            onChange={(e) => setNewRentalDuration(e.target.value)}
            placeholder="Enter film rental duration"
          />
          <input
            type="text"
            value={newRentalRate}
            onChange={(e) => setNewRentalRate(e.target.value)}
            placeholder="Enter film  rental rate"
          />
          <input
            type="text"
            value={newFilmLength}
            onChange={(e) => setNewFilmLength(e.target.value)}
            placeholder="Enter film length"
          />
          <input
            type="text"
            value={newReplacementCost}
            onChange={(e) => setNewReplacementCost(e.target.value)}
            placeholder="Enter film replacement cost"
          />
          <input
            type="text"
            value={newFilmRating}
            onChange={(e) => setNewFilmRating(e.target.value)}
            placeholder="Enter film rating"
          />
          <input
            type="text"
            value={newSpecialFeatures}
            onChange={(e) => setNewSpecialFeatures(e.target.value)}
            placeholder="Enter film special features"
          />
          <button onClick={handleCreateFilm}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button> */}
        </>
      )}
    </div>
  );
};

export default Film;
