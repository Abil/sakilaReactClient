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

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, [currentPage]); // Refetch categories when currentPage changes

  const navigate = useNavigate();
  const newCategoryNameRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/category?page=${currentPage}`);
      setCategories(response.data.categories);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      await axios.post("/category", { name: newCategoryName });
      setNewCategoryName("");
      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new category
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/category/${categoryId}`);
      //fetchCategories(); // Refresh category list
      setCurrentPage(1); // Reset to first page after deleting a  category
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(`/category/${selectedCategoryId}`, {
        category: newCategoryNameRef.current.value,
      });
      setSelectedCategoryId(null);
      fetchCategories(); // Refresh category list
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleNavigateCategory = (id) => {
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
              Categories
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Category </TableCell>
                    <TableCell align="right" colSpan={2}>
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${category.name}`}
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          variant="contained"
                          //color="primary"
                          fullWidth
                          onClick={() => {
                            setSelectedCategoryId(category.category_id);
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
                            handleDeleteCategory(category.category_id)
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
                            handleNavigateCategory(category.category_id);
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

          <h1>Category Page</h1>
          <h2>Categories</h2>

          <ul>
            {categories.map((category) => (
              <li key={category.category_id}>
                {selectedCategoryId === category.category_id ? (
                  <>
                    <input
                      type="text"
                      ref={newCategoryNameRef}
                      placeholder={category.category}
                    />
                    <button
                      onClick={() => {
                        handleUpdateCategory();
                      }}
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <>
                    {category.name}{" "}
                    <button
                      onClick={() =>
                        handleNavigateCategory(category.category_id)
                      }
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.category_id)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        setSelectedCategoryId(category.category_id)
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
            Create New Category
          </button>
        </>
      ) : (
        <>
          <h2>Create Category</h2>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
          <button onClick={handleCreateCategory}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default Category;
