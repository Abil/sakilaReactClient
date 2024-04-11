import { useState, useEffect } from "react";

import axios from "axios";

//MUI Components
import { Container, Typography, Link } from "@mui/material";

const ReplacementCost = () => {
  const [replacementCost, setReplacementCost] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`/report/replacement-cost`);
      setReplacementCost(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "100px",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        Replacement Costs
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        {`Max: ${replacementCost.most_expensive}`}
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        {`Min: ${replacementCost.least_expensive}`}
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        {`Avg: ${replacementCost.average_replacement_cost}`}
      </Typography>
    </Container>
  );
};

export default ReplacementCost;
