import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
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

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  //const [newInventoryName, setNewInventoryName] = useState("");
  //const [selectedInventoryId, setSelectedInventoryId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [films, setFilms] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchInventories();
  }, [currentPage]); // Refetch inventories when currentPage changes

  const navigate = useNavigate();
  //const newInventoryNameRef = useRef(null);
  const filmRef = useRef(null);
  const storeRef = useRef(null);

  const fetchInventories = async () => {
    try {
      const response = await axios.get(`/inventory?page=${currentPage}`);
      setInventories(response.data.inventories);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching inventories:", error);
    }
  };

  const handleCreateInventory = async () => {
    try {
      await axios.post("/inventory", {
        //inventory: newInventoryName,
        film_id: filmRef.current.value,
        store_id: storeRef.current.value,
      });
      //setNewInventoryName("");
      setShowCreateForm(false);
      setCurrentPage(1); // Reset to first page after creating a new inventory
    } catch (error) {
      console.error("Error creating inventory:", error);
    }
  };

  const handleDeleteInventory = async (inventoryId) => {
    try {
      await axios.delete(`/inventory/${inventoryId}`);
      //fetchInventories(); // Refresh inventory list
      setCurrentPage(1); // Reset to first page after deleting a  inventory
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  // const handleUpdateInventory = async () => {
  //   try {
  //     await axios.put(`/inventory/${selectedInventoryId}`, {
  //       //inventory: newInventoryNameRef.current.value,
  //       film_id: filmRef.current.value,
  //       store_id: storeRef.current.value,
  //     });
  //     setSelectedInventoryId(null);
  //     fetchInventories(); // Refresh inventory list
  //   } catch (error) {
  //     console.error("Error updating inventory:", error);
  //   }
  // };

  const handleNavigateInventory = (id) => {
    navigate(`./${id}`);
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleFetchFilms = async () => {
    try {
      const response = await axios.get("/film");
      setFilms(response.data.films);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  const handleFetchStores = async () => {
    try {
      const response = await axios.get("/store");
      setStores(response.data.stores);
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
    } catch (error) {
      console.error("Error searching films:", error);
      return [];
    }
  };

  const handleStoreSearch = async (inputValue) => {
    try {
      const response = await axios.get(
        `/store/search?query=${inputValue.target.value}`
      );
      console.log("stores:", response.data);
      setStores(response.data);
    } catch (error) {
      console.error("Error searching films:", error);
      return [];
    }
  };

  const handleShowCreateForm = () => {
    handleFetchFilms(); // Fetch films when creating a new inventory
    handleFetchStores(); // Fetch stores when creating a new inventory

    setShowCreateForm(true);
  };

  return (
    <div>
      {!showCreateForm ? (
        <>
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <Typography variant="h2" align="center" gutterBottom>
              Inventories
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Film </TableCell>
                    <TableCell>Store</TableCell>
                    <TableCell align="right" colSpan={3}>
                      Options
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventories.map((inventory, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${inventory.film.title}`}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {`${inventory.store.address.address}`}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={() =>
                            handleDeleteInventory(inventory.inventory_id)
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
                            handleNavigateInventory(inventory.inventory_id)
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
          <h2>Create Inventory</h2>

          <DebounceInput
            type="text"
            placeholder="Search..."
            minLength={2} // Minimum number of characters before debounce triggers
            debounceTimeout={300} // Debounce timeout in milliseconds
            onChange={handleFilmSearch} // Handle input change event
          />

          <select ref={filmRef}>
            {films.map((film) => (
              <option key={film.film_id} value={film.film_id}>
                {film.title}
              </option>
            ))}
          </select>

          <DebounceInput
            type="text"
            placeholder="Search..."
            minLength={2} // Minimum number of characters before debounce triggers
            debounceTimeout={300} // Debounce timeout in milliseconds
            onChange={handleStoreSearch} // Handle input change event
          />

          <select ref={storeRef}>
            {stores.map((store) => (
              <option key={store.store_id} value={store.store_id}>
                {store.address.address}
              </option>
            ))}
          </select>

          {/* <input
            type="text"
            value={newInventoryName}
            onChange={(e) => setNewInventoryName(e.target.value)}
            placeholder="Enter inventory name"
          /> */}
          <button onClick={handleCreateInventory}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default Inventory;
