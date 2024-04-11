import { useState, useEffect } from "react";

import axios from "axios";

//MUI Components
import { Container, Typography, Link } from "@mui/material";

const Email = () => {
  const [emailCount, setEmailCount] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`/report/customer/email-count`);
      setEmailCount(response.data);
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
        Email Count
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        {emailCount.emails}
      </Typography>

      <Typography variant="body2" align="center" style={{ marginTop: "20px" }}>
        <Link href="/customer">Customer</Link> Emails
      </Typography>
    </Container>
  );
};

export default Email;
