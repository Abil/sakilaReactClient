import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

//MUI Imports
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import AnimationTwoToneIcon from "@mui/icons-material/AnimationTwoTone";

//MUI Variables for logic:
const pages = [
  { name: "Home", link: "/" },
  { name: "Reports", link: "/report" },
  { name: "Geo", link: "/geo" },

  { name: "Films", link: "/film" },
  { name: "Actors", link: "/actor" },
  { name: "Category", link: "/category" },
  { name: "Language", link: "/language" },

  { name: "Store", link: "/store" },
  { name: "Rental", link: "/rental" },
  { name: "Payment", link: "/payment" },
  { name: "Inventory", link: "/inventory" },

  { name: "Staff", link: "/staff" },
  { name: "Advisor", link: "/advisor" },
  { name: "Investor", link: "/investor" },
  { name: "Customer", link: "/customer" },
];

const Menu = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AnimationTwoToneIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Sakila
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {auth?.user &&
              pages.map((page) => (
                <Button
                  key={page.name}
                  // onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textAlign: "center",
                  }}
                  component={Link} //Instead of href to prevent page referesh
                  to={`${page.link}`}
                >
                  {page.name}
                </Button>
              ))}
          </Box>

          {!auth?.user ? (
            <>
              <Button
                color="inherit"
                href="/login"
                sx={{ textAlign: "center" }}
              >
                Login
              </Button>
              <Button color="inherit" href="/register">
                Register
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Menu;
