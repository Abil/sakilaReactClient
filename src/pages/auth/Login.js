import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

//MUI Components
import { Container, TextField, Button, Typography, Link } from "@mui/material";
import { Google } from "@mui/icons-material";

//Context
import { useAuth } from "../../context/auth";

export default function Login() {
  //State
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [googleAuthUrl, setGoogleAuthUrl] = useState("");

  //Hooks
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log("location => ", location.state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/auth/login`, {
        email,
        password,
      });
      //console.log(data);
      if (data?.error) {
        console.log(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      //toast.error("Login failed. Try again.");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      console.log("calling google auth...");
      const { data } = await axios.get(`/auth/google`);
      setGoogleAuthUrl(data.google_redirection_url);
    } catch (err) {
      console.log(err);
      //toast.error("Login failed. Try again.");
    }
  };

  if (googleAuthUrl) {
    window.location.href = googleAuthUrl; // Redirect to Google authentication page
  }
  return (
    <>
      {!auth?.user ? (
        <>
          <Container
            maxWidth="sm"
            style={{
              marginTop: "100px",
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              //color="primary"
              fullWidth
              onClick={handleSubmit}
              style={{ marginTop: "20px" }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              //color="default"
              fullWidth
              startIcon={<Google />}
              onClick={handleGoogleAuth}
              style={{ marginTop: "10px" }}
            >
              Login with Google
            </Button>
            <Typography
              variant="body2"
              align="center"
              style={{ marginTop: "20px" }}
            >
              Don't have an account? <Link href="/register">Register</Link>
            </Typography>
          </Container>
        </>
      ) : (
        <>
          <Navigate to="/" />
        </>
      )}
    </>
  );
}
