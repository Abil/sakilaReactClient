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
      const response = await axios.get(
        `/report/customer/rentals?page=${currentPage}`
      );
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const onPageChange = (e, page) => {
    console.log("onpage change: ", page);
    setCurrentPage(page);
  };

  return (
    <div>
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Typography variant="h2" align="center" gutterBottom>
          Customer Rentals
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name </TableCell>
                <TableCell align="right">Rentals</TableCell>
                <TableCell align="right">Payments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers[0]?.map((customer, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {`${customer.first_name} ${customer.last_name}`}
                  </TableCell>
                  <TableCell align="right">{customer.total_rentals}</TableCell>
                  <TableCell align="right">
                    {customer.total_payment_amount}
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
            onChange={onPageChange}
          />
        </Stack>
      </Container>
      <>
        {/* <h1>Customer Rental Report</h1>
        <h2>Customers Rentals</h2>

        <ul>
          {customers[0]?.map((customer, index) => (
            <li key={index}>
              <>
                {`Customer: ${customer.first_name} ${customer.last_name} Total Rentals: ${customer.total_rentals} Total Payment Amount: ${customer.total_payment_amount}`}{" "}
              </>
            </li>
          ))}
        </ul> */}

        {/* Pagination */}

        {/* <div>
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
        </div> */}
      </>
    </div>
  );
};

export default Customer;
