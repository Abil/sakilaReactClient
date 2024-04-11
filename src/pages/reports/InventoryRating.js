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

  useEffect(() => {
    fetchInventories();
  }, []);

  const fetchInventories = async () => {
    try {
      const response = await axios.get(`/report/inventory-rating`);
      setInventories(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.error("Error fetching inventories:", error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Typography variant="h2" align="center" gutterBottom>
        Inventory Ratings
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rating </TableCell>
              <TableCell align="right">Store ID</TableCell>
              <TableCell align="right">Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventories.map((inventory, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`${inventory.rating}`}
                </TableCell>
                <TableCell align="right">{inventory.store_id}</TableCell>
                <TableCell align="right">{inventory.inventory_items}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Inventory;
