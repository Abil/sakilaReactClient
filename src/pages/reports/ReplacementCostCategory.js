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

const ReplacementCostCategory = () => {
  const [replacementCost, setReplacementCost] = useState([]);

  useEffect(() => {
    fetchInventories();
  }, []);

  const fetchInventories = async () => {
    try {
      const response = await axios.get(
        `/report/replacement-cost/store-category`
      );
      setReplacementCost(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.error("Error fetching replacementCost:", error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Typography variant="h2" align="center" gutterBottom>
        Categoryvise Replacement Cost
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category </TableCell>
              <TableCell align="right">Store ID</TableCell>
              <TableCell align="right">Films</TableCell>
              <TableCell align="right">Average R.C</TableCell>
              <TableCell align="right">Total R.C</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {replacementCost.map((rc, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`${rc.category}`}
                </TableCell>
                <TableCell align="right">{rc.store_id}</TableCell>
                <TableCell align="right">{rc.films}</TableCell>
                <TableCell align="right">{rc.avg_replacement_cost}</TableCell>
                <TableCell align="right">{rc.total_replacement_cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ReplacementCostCategory;
