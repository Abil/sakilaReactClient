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

const InvestorAdvisor = () => {
  const [investorAdvisor, setInvestorAdvisor] = useState([]);

  useEffect(() => {
    fetchInvestorAdvisor();
  }, []);

  const fetchInvestorAdvisor = async () => {
    try {
      const response = await axios.get(`/report/investor-advisor`);
      setInvestorAdvisor(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching investorAdvisor:", error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Typography variant="h2" align="center" gutterBottom>
        Investor Advisor
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name </TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investorAdvisor.map((person, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`${person.first_name} ${person.last_name}`}
                </TableCell>
                <TableCell align="right">${person.type}</TableCell>
                <TableCell align="right">
                  {person.company_name ? `${person.company_name}` : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default InvestorAdvisor;
