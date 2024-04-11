import { useState, useEffect } from "react";

import axios from "axios";

//MUI Components
import { Typography, Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchInventories();
  }, [currentPage]); // Refetch inventories when currentPage changes

  const fetchInventories = async () => {
    try {
      const response = await axios.get(`/report/inventory?page=${currentPage}`);
      setInventories(response.data.inventories);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching inventories:", error);
    }
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Typography variant="h2" align="center" gutterBottom>
        Inventory
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title </TableCell>
              <TableCell align="right">Store</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventories.map((inventory, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {inventory.film.title}
                </TableCell>

                <TableCell align="right">
                  {inventory.store.address.address}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} style={{ marginTop: "50px", alignItems: "center" }}>
        <Pagination
          count={totalPages}
          color="primary"
          onChange={handlePageChange}
        />
      </Stack>
    </Container>
  );
};

export default Inventory;
