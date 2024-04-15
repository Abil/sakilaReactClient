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

const FilmCategory = () => {
  //MUI Selectbox
  const [selectedFilm, setSelectedFilm] = useState(0);
  const handleFilmChange = (event) => {
    setSelectedFilm(event.target.value);
  };
  const [selectedCategory, setSelectedCategory] = useState(0);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const [filmCategories, setFilmCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showFilmList, setShowFilmList] = useState(false);

  const [films, setFilms] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchFilms();
    //fetchFilmCategories();
  }, [currentPage]); // Refetch filmCategories when currentPage changes

  const filmRef = useRef(null);
  const categoryRef = useRef(null);

  const fetchFilms = async () => {
    try {
      const response = await axios.get(`/film`);
      setFilms(response.data.films);
      setSelectedFilm(response.data.films[0]["film_id"]);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  const fetchFilmCategories = async () => {
    try {
      const response = await axios.get(
        `/film-category/${filmRef.current.value}`
      );
      setFilmCategories(response.data.categories);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching filmCategories:", error);
    }
  };

  const handleCreateFilmCategory = async () => {
    console.log(filmRef.current.value, categoryRef.current.value);
    try {
      await axios.post("/film-category", {
        film_id: filmRef.current.value,
        category_id: categoryRef.current.value,
      });
      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new filmCategory
    } catch (error) {
      console.error("Error creating filmCategory:", error);
      toast.error(error.response.data.error);
    }
  };

  const handleDeleteFilmCategory = async (filmCategoryId) => {
    try {
      await axios.delete(
        `/film-category/${filmRef.current.value}/${filmCategoryId}`
      );
      //fetchFilmCategories(); // Refresh filmCategory list
      setCurrentPage(1); // Reset to first page after deleting a  filmCategory
    } catch (error) {
      console.error("Error deleting filmCategory:", error);
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

  const handleFetchCategories = async () => {
    try {
      const response = await axios.get("/category");
      setCategories(response.data.categories);
      setSelectedCategory(response.data.categories[0]["category_id"]);
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

  const handleCategorySearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/category/search?query=${inputValue.target.value}`
      );
      console.log("categories:", response.data);
      setCategories(response.data);
      setSelectedCategory(response.data[0]["category_id"]);
    } catch (error) {
      console.error("Error searching categories:", error);
      return [];
    }
  };

  const handleShowCreateForm = () => {
    handleFetchFilms(); // Fetch films when creating a new filmCategory
    handleFetchCategories(); // Fetch stores when creating a new filmCategory
    setShowCreateForm(true);
  };

  const handleFetchFilmCategories = () => {
    setShowFilmList(true);
    fetchFilmCategories();
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
                onClick={handleFetchFilmCategories}
                style={{ marginTop: "20px" }}
              >
                Fetch Categories
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
                  Categories
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
                      {filmCategories.map((filmCategory, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {`${filmCategory.name}`}{" "}
                          </TableCell>

                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="secondary"
                              fullWidth
                              onClick={() =>
                                handleDeleteFilmCategory(
                                  filmCategory.category_id
                                )
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
              Associate Category
            </Typography>
            <FormControl fullWidth>
              <DebounceInput
                type="text"
                placeholder="Search..."
                minLength={2} // Minimum number of characters before debounce triggers
                debounceTimeout={300} // Debounce timeout in milliseconds
                onChange={handleCategorySearch} // Handle input change event
                element={TextField}
                label="Search Category"
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
                value={selectedCategory}
                onChange={handleCategoryChange}
                //onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem
                    value={category.category_id}
                  >{`${category.name}`}</MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={handleCreateFilmCategory}
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

export default FilmCategory;
