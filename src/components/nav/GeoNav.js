import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

//MUI Imports
import { Box, Tabs, Tab } from "@mui/material";

const GeoNav = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Country" component={Link} to="./" />
          <Tab label="City" component={Link} to="./city" />
          <Tab label="Address" component={Link} to="./address" />
        </Tabs>
      </Box>

      <Outlet />
    </>
  );
};

export default GeoNav;
