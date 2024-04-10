import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

//MUI Imports
import { Box, Tabs, Tab } from "@mui/material";

const ActorNav = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Actor" component={Link} to="./" />
          <Tab label="Award" component={Link} to="./award" />
        </Tabs>
      </Box>

      <Outlet />
    </>
  );
};

export default ActorNav;
