import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

//MUI Imports
import { Box, Tabs, Tab } from "@mui/material";

const ReportNav = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Inventory" component={Link} to="./" />
          <Tab
            label="Inventory Rating"
            component={Link}
            to="./inventory-rating"
          />
          <Tab
            label="Inventory Count"
            component={Link}
            to="./inventory-count"
          />
          <Tab
            label="Unique Inventories"
            component={Link}
            to="./inventory-unique-count"
          />

          <Tab label="Store" component={Link} to="./store" />

          <Tab label="Customer" component={Link} to="./customer" />
          <Tab
            label="Customer Rentals"
            component={Link}
            to="./customer-rentals"
          />
          <Tab
            label="Active Customers"
            component={Link}
            to="./customer-active-count"
          />
          <Tab
            label="Email Count"
            component={Link}
            to="./customer-email-count"
          />
          <Tab
            label="Investors and Advisors"
            component={Link}
            to="./investor-advisor"
          />
          <Tab label="Actor and Award" component={Link} to="./actor-award" />
          <Tab
            label="Payment Average"
            component={Link}
            to="./payment-average"
          />
          <Tab
            label="Replacement Cost"
            component={Link}
            to="./replacement-cost"
          />
          <Tab
            label="Category Replacement Cost"
            component={Link}
            to="./replacement-cost-category"
          />
        </Tabs>
      </Box>

      {/* <ul>
        <li>
          <NavLink to="./">Inventory</NavLink>
        </li>
        <li>
          <NavLink to="./inventory-rating">Inventory Rating</NavLink>
        </li>
        <li>
          <NavLink to="./inventory-count">Inventory Count</NavLink>
        </li>
        <li>
          <NavLink to="./inventory-unique-count">
            Inventory Unique Count
          </NavLink>
        </li>
        <li>
          <NavLink to="./store">Store</NavLink>
        </li>
        <li>
          <NavLink to="./customer">Customer</NavLink>
        </li>
        <li>
          <NavLink to="./customer-rentals">Customer Rentals</NavLink>
        </li>
        <li>
          <NavLink to="./customer-active-count">Active Customer</NavLink>
        </li>
        <li>
          <NavLink to="./customer-email-count">Email Count</NavLink>
        </li>
        <li>
          <NavLink to="./investor-advisor">Investor & Advisor</NavLink>
        </li>
        <li>
          <NavLink to="./actor-award">Actors & Awards</NavLink>
        </li>
        <li>
          <NavLink to="./payment-average">Payment Average</NavLink>
        </li>
        <li>
          <NavLink to="./replacement-cost">Replacement Cost</NavLink>
        </li>
        <li>
          <NavLink to="./replacement-cost-category">
            Category Replacement Cost
          </NavLink>
        </li>
      </ul> */}

      <Outlet />
    </>
  );
};

export default ReportNav;
