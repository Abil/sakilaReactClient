import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate /*, useLocation*/ } from "react-router-dom";

//MUI Components
import { Container, TextField, Button, Typography, Link } from "@mui/material";
import { Google } from "@mui/icons-material";

//Context
import { useAuth } from "../../context/auth";

export default function Login() {
  //State
  const [name, setName] = useState();
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
      const { data } = await axios.post(`/auth/register`, {
        name,
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        console.log(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        navigate("/");

        //This is when you get routed back to a login or register from a protected route
        //   navigate(
        //     location.state
        //   );
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
              Register
            </Typography>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Register
            </Button>
            <Button
              variant="contained"
              //color="default"
              fullWidth
              startIcon={<Google />}
              onClick={handleGoogleAuth}
              style={{ marginTop: "10px" }}
            >
              Signup with Google
            </Button>
            <Typography
              variant="body2"
              align="center"
              style={{ marginTop: "20px" }}
            >
              Already have an account? <Link href="/login">Login</Link>
            </Typography>
          </Container>

          {/* <h1>Register Page</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your name"
                value={email}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">Submit</button>
            </form>
          </div> */}
        </>
      ) : (
        <>
          <Navigate to="/" />
        </>
      )}
    </>
  );
}
