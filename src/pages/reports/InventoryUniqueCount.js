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

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState("");

  useEffect(() => {
    fetchInventories();
  }, []);

  const fetchInventories = async () => {
    try {
      const response = await axios.get(`/report/inventory/unique-count`);
      setInventories(response.data.unique_films_per_store);
      setUniqueCategories(response.data.unique_category_count);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching inventories:", error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Typography variant="h2" align="center" gutterBottom>
        Unique Inventory
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        {`Unique Categories: ${uniqueCategories}`}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Adress </TableCell>
              <TableCell align="right">Store ID</TableCell>
              <TableCell align="right">Unique Films</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventories.map((inventory, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`${inventory.store.address.address}`}
                </TableCell>
                <TableCell align="right">{inventory.store_id}</TableCell>
                <TableCell align="right">{inventory.unique_films}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Inventory;
