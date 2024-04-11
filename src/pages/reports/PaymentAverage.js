import { useState, useEffect } from "react";

import axios from "axios";

//MUI Components
import { Container, Typography, Link } from "@mui/material";

const PaymentAverage = () => {
  const [paymentAverage, setPaymentAverage] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`/report/payment-average`);
      setPaymentAverage(response.data);
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
        Payment Average
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        {`Max: ${paymentAverage.max_payment}`}
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        {`Avg: ${paymentAverage.average_payment}`}
      </Typography>

      <Typography variant="body2" align="center" style={{ marginTop: "20px" }}>
        <Link href="/payment">Payments</Link>
      </Typography>
    </Container>
  );
};

export default PaymentAverage;
