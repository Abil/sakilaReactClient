import { useState, useEffect, useRef } from "react";
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

const Language = () => {
  const [languages, setLanguages] = useState([]);
  const [newLanguageName, setNewLanguageName] = useState("");
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLanguages();
  }, [currentPage]); // Refetch languages when currentPage changes

  const navigate = useNavigate();
  const newLanguageNameRef = useRef(null);

  const fetchLanguages = async () => {
    try {
      const response = await axios.get(`/language?page=${currentPage}`);
      setLanguages(response.data.languages);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const handleCreateLanguage = async () => {
    try {
      await axios.post("/language", { name: newLanguageName });
      setNewLanguageName("");
      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new language
    } catch (error) {
      console.error("Error creating language:", error);
    }
  };

  const handleDeleteLanguage = async (languageId) => {
    try {
      await axios.delete(`/language/${languageId}`);
      //fetchLanguages(); // Refresh language list
      setCurrentPage(1); // Reset to first page after deleting a  language
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  const handleUpdateLanguage = async () => {
    try {
      await axios.put(`/language/${selectedLanguageId}`, {
        language: newLanguageNameRef.current.value,
      });
      setSelectedLanguageId(null);
      fetchLanguages(); // Refresh language list
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

  const handleNavigateLanguage = (id) => {
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
              Languages
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Language </TableCell>
                    <TableCell align="right" colSpan={2}>
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {languages.map((language, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${language.name}`}
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          variant="contained"
                          //color="primary"
                          fullWidth
                          onClick={() => {
                            setSelectedLanguageId(language.language_id);
                            //handleOpen();
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
                            handleDeleteLanguage(language.language_id)
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

          <h1>Language Page</h1>
          <h2>Languages</h2>

          <ul>
            {languages.map((language) => (
              <li key={language.language_id}>
                {selectedLanguageId === language.language_id ? (
                  <>
                    <input
                      type="text"
                      ref={newLanguageNameRef}
                      placeholder={language.language}
                    />
                    <button
                      onClick={() => {
                        handleUpdateLanguage();
                      }}
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <>
                    {language.name}{" "}
                    <button
                      onClick={() =>
                        handleNavigateLanguage(language.language_id)
                      }
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteLanguage(language.language_id)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        setSelectedLanguageId(language.language_id)
                      }
                    >
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Pagination */}
          {/* <div>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div> */}

          <div>
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
          </div>

          <button onClick={() => setShowCreateForm(true)}>
            Create New Language
          </button>
        </>
      ) : (
        <>
          <h2>Create Language</h2>
          <input
            type="text"
            value={newLanguageName}
            onChange={(e) => setNewLanguageName(e.target.value)}
            placeholder="Enter language name"
          />
          <button onClick={handleCreateLanguage}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default Language;
