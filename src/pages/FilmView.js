import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";

//MUI Components
import {
  Typography,
  Container,
  Button,
  TextField,
  MenuItem,
  FormControl,
} from "@mui/material";
import Select from "@mui/material/Select";

const FilmView = () => {
  const [film, setFilm] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newReleaseYear, setNewReleaseYear] = useState("");
  const [newRentalDuration, setNewRentalDuration] = useState("");
  const [newRentalRate, setNewRentalRate] = useState("");
  const [newFilmLength, setNewFilmLength] = useState("");
  const [newReplacementCost, setNewReplacementCost] = useState("");
  const [newFilmRating, setNewFilmRating] = useState("");
  const [newSpecialFeatures, setNewSpecialFeatures] = useState("");

  const [reload, setReload] = useState(false);
  const [languages, setLanguages] = useState([]);

  const { filmId } = useParams();
  const languageRef = useRef(null);

  useEffect(() => {
    fetchFilm();
  }, [reload]);

  const fetchFilm = async () => {
    try {
      const response = await axios.get(`/film/${filmId}`);
      setFilm(response.data);
      //setNewTitle(response.data.film);
    } catch (error) {
      console.error("Error fetching film:", error);
    }
  };

  const handleFilmUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log("language id : ", languageRef.current.value);
      await axios.put(`/film/${filmId}`, {
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
      setEditMode(false);
      setReload(!reload);
    } catch (error) {
      console.error("Error updating film:", error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await axios.get(
        `/language/search?query=${film.language.name}`
      );
      setLanguages(response.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const handleLanguageSearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/language/search?query=${inputValue.target.value}`
      );
      console.log("languages:", response.data);
      setLanguages(response.data);
    } catch (error) {
      console.error("Error searching languages:", error);
      return [];
    }
  };

  const handleEditButtonClick = () => {
    setEditMode(true);
    fetchLanguages();
  };

  return (
    <div>
      {film ? (
        <div>
          {editMode ? (
            <form onSubmit={handleFilmUpdate}>
              <DebounceInput
                type="text"
                placeholder="Search..."
                minLength={2} // Minimum number of characters before debounce triggers
                debounceTimeout={300} // Debounce timeout in milliseconds
                onChange={handleLanguageSearch} // Handle input change event
              />
              <select ref={languageRef}>
                {languages.map((language) => (
                  <option
                    key={language.language_id}
                    value={language.language_id}
                  >
                    {language.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={film.title}
              />

              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder={film.description}
              />

              <input
                type="text"
                value={newReleaseYear}
                onChange={(e) => setNewReleaseYear(e.target.value)}
                placeholder={film.release_year}
              />
              <input
                type="text"
                value={newRentalDuration}
                onChange={(e) => setNewRentalDuration(e.target.value)}
                placeholder={film.rental_duration}
              />
              <input
                type="text"
                value={newRentalRate}
                onChange={(e) => setNewRentalRate(e.target.value)}
                placeholder={film.rental_rate}
              />
              <input
                type="text"
                value={newFilmLength}
                onChange={(e) => setNewFilmLength(e.target.value)}
                placeholder={film.length}
              />
              <input
                type="text"
                value={newReplacementCost}
                onChange={(e) => setNewReplacementCost(e.target.value)}
                placeholder={film.replacement_cost}
              />
              <input
                type="text"
                value={newFilmRating}
                onChange={(e) => setNewFilmRating(e.target.value)}
                placeholder={film.rating}
              />
              <input
                type="text"
                value={newSpecialFeatures}
                onChange={(e) => setNewSpecialFeatures(e.target.value)}
                placeholder={film.special_features}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <Container
              maxWidth="sm"
              style={{
                marginTop: "100px",
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6" align="center" gutterBottom>
                {`Title: ${film.title} `}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {`Description: ${film.description} `}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {`Year/Language: ${film.release_year}, ${film.language.name}`}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {`Rental Duration: ${film.rental_duration}`}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {`Rental Rate: ${film.rental_rate}`}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {`Running Time: ${film.length}`}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {`Replacement Cost: ${film.replacement_cost}`}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {`Rating: ${film.rating}`}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {`Special Features: ${film.special_features}`}
              </Typography>
              <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={handleEditButtonClick}
                style={{ marginTop: "20px" }}
              >
                Edit
              </Button>
            </Container>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FilmView;
