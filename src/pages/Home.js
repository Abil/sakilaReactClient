import { useState } from "react";
import { Link } from "react-router-dom";

//MUI
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

//Context
import { useAuth } from "../context/auth";

const Home = () => {
  //Hooks
  const [auth, setAuth] = useAuth();
  return (
    <>
      {auth?.user ? (
        <>
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <div style={{ marginTop: "200px" }}></div>{" "}
            {/* Add space below the heading */}
            <Typography variant="h2" align="center" gutterBottom>
              Movie Rental Company Backend Reporting System
            </Typography>
            <div style={{ marginTop: "200px" }}></div>{" "}
            {/* Add space below the heading */}
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                      Payment Report
                    </Typography>
                    <Typography variant="body1" align="center">
                      View sales data and revenue insights.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ marginTop: "10px" }}
                      component={Link}
                      to="/report/payment-average"
                    >
                      View Report
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                      Inventory Report
                    </Typography>
                    <Typography variant="body1" align="center">
                      Check your inventory at a glance.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ marginTop: "10px" }}
                      component={Link}
                      to="/report/inventory-count"
                    >
                      View Report
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                      Rental Report
                    </Typography>
                    <Typography variant="body1" align="center">
                      Identify target customers with rental data.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ marginTop: "10px" }}
                      component={Link}
                      to="/report/customer-rentals"
                    >
                      View Report
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </>
      ) : (
        <>
          <Container maxWidth="lg" style={{ marginTop: "50px" }}>
            <div style={{ marginTop: "200px" }}></div>{" "}
            {/* Add space below the heading */}
            <Typography variant="h2" align="center" gutterBottom gutterTop>
              Welcome to Sakila Reporting System
            </Typography>
            <div style={{ marginTop: "200px" }}></div>{" "}
            {/* Add space below the heading */}
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Typography variant="h5" align="center" gutterBottom>
                        Reports
                      </Typography>
                      <Typography variant="body1" align="center">
                        View customised multi modal reports
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Typography variant="h5" align="center" gutterBottom>
                        Inventory
                      </Typography>
                      <Typography variant="body1" align="center">
                        Manage and peruse through inventory
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Typography variant="h5" align="center" gutterBottom>
                        Customers
                      </Typography>
                      <Typography variant="body1" align="center">
                        View insights and manage customers
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              {/* Repeat the same structure for other cards */}
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
