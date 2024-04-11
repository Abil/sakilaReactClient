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

const ActorAward = () => {
  const [actorAward, setActorAward] = useState([]);

  useEffect(() => {
    fetchInvestorAdvisor();
  }, []);

  const fetchInvestorAdvisor = async () => {
    try {
      const response = await axios.get(`/report/actor-award-stats`);
      setActorAward(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching actorAward:", error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Typography variant="h2" align="center" gutterBottom>
        Actor Award
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Awards </TableCell>
              <TableCell align="right">
                Percentage of Actors with 1 Film
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actorAward.map((award, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`${award.number_of_awards}`}
                </TableCell>
                <TableCell align="right">{`${award.pct_w_one_film}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ActorAward;
