import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

//MUI Imports
import { Box, Tabs, Tab } from "@mui/material";

const FilmNav = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Film" component={Link} to="./" />
          <Tab label="Film Actor" component={Link} to="./actor" />
          <Tab label="Film Category" component={Link} to="./category" />
        </Tabs>
      </Box>

      <Outlet />
    </>
  );
};

export default FilmNav;
