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

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCustomers();
  }, [currentPage]); // Refetch customers when currentPage changes

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`/report/customer?page=${currentPage}`);
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Typography variant="h2" align="center" gutterBottom>
        Customers
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Store ID </TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {customer.store_id}
                </TableCell>

                <TableCell align="right">
                  {`${customer.first_name} ${customer.last_name}`}
                </TableCell>
                <TableCell align="right">
                  {`${customer.address.address}, ${customer.address.city.city}, ${customer.address.city.country.country}`}
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

export default Customer;
